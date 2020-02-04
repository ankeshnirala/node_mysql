const { promisify }   = require('util');
const passwordHash  = require('bcryptjs');
const jwt           = require('jsonwebtoken');
const User          = require('./../models/usersModel');
const catchAsync    = require('./../utils/catchAsync');
const AppError      = require('./../utils/appError');
const sendEmail     = require('./../utils/email');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = catchAsync(async (req, res, next) => {

    let user = await new User({
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: await passwordHash.hash(req.body.password, passwordHash.genSaltSync(10)),
        status: req.body.status
    });

    let userCreated = await User.save(user);

    const token = signToken(userCreated.insertId);
    
    res.status(200).json({
        status: "Success!!",
        token: token,
        users: userCreated[0]
    });
});

exports.login = catchAsync(async (req, res, next) => {
    let {email, password} = req.body;

    // 1) if email && password exist
    if(!email || !password){
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) if user exist && password correct
    let user = await User.findOne(email);
    
    if(user[0].length===0 || !(await User.correctPassword(password, user[0][0].password))){
        return next(new AppError('Incorrect email or password', 401));
    }
    
    // 3) if everything is ok, send token to client
    const token = signToken(user[0][0].id);

    res.status(200).json({
        status: 'success',
        token: token
    });
});

exports.protect = catchAsync(async (req, res, next) => {

    let token;
    // 1) getting token and check if its there
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token){
            return next(new AppError('Your are not logged in! Please log in to get access.', 401));
        }

    // 2) verification token
       let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
       
    // 3) if user still exists
        let freshUser = await User.findById(decoded.id);
        
        if(freshUser[0].length === 0){
            return next(new AppError('The user belonging to this token does no longer exist', 401));
        }
        
    // 4) if user changed password after jwt was issued
        if(await User.changedPasswordAfter(freshUser[0][0].modified, decoded.iat)){
            return next(new AppError('User recently changed password. Please login again!', 401));
        }
    
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = freshUser[0][0];
    next();
});

exports.restrictTo = (...roles) => {
    
    return (req, res, next) => {
        // roles ['admin', 'user', 'guide', 'lead-guide']

        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action.', 403));
        }

        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) get user based on posted email
        if(!req.body.email){
            return next(new AppError('Please enter your email!', 401));
        }
        let user = await User.findOne(req.body.email);

        if(user[0].length === 0){
            return next(new AppError('There is no user with this email', 404));
        }

    // 2) generate the random token
        let _resetToken = await User.createPasswordResetToken();
        let resetToken = _resetToken.resetToken; 
        let password_reset_token = _resetToken.passwordResetToken;
        let password_reset_expires = _resetToken.passwordResetExpires;   
        
    // 3) send it to users email
    let resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

    let message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, Please ignore this email.`;

    try{
        await sendEmail({
            email: user[0][0].email,
            subject: 'Your password reset token valid for 10 min',
            message: message
        });
    
        await User.saveInPasswordReset({
            password_reset_token: password_reset_token,
            password_reset_expires: password_reset_expires,
            user_id: user[0][0].id
        });

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    }catch(err){
        password_reset_token = "";
        password_reset_expires = "";

        await User.saveInPasswordReset({
            password_reset_token: password_reset_token,
            password_reset_expires: password_reset_expires,
            user_id: user[0][0].id
        });

        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});

exports.resetPassword = (req, res, next) => {

};