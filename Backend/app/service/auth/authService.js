let User = require('../../schema/user');
let jwt = require('jsonwebtoken');

const BadRequestException = require('./../../util/exceptions/badRequestException');
const UnauthorizedException = require('../../util/exceptions/unautherizedException');

module.exports.googleAuth = async (requestUser) => {

    try{
        let signinUserTokenData = {
            _id: requestUser._id,
        };

        let token = jwt.sign(signinUserTokenData, process.env.JWT_SECRET, {
            expiresIn: 100000
        });

        return {
            data:{
                token: 'JWT ' + token,
            },
            msg:'Token generated successfully'
        };

    }catch(err){
        throw err;
    }
};

module.exports.getUserDetails = async (requestUser) => {

    try {
        let userObj = await User.findById(requestUser._id);
        
        if (!userObj){
            throw BadRequestException('Invalid Request Token');
        }

        let return_data_set = {
            user_name: userObj.full_name,
            is_google_drive_connected: userObj.google_connection_settings.is_google_drive_connected,
            user_image_url: userObj.image_url,
            drive_connected_email: userObj.google_connection_settings.is_google_drive_connected ? userObj.google_connection_settings.connected_account_email:null
        };

        return {
            data: return_data_set,
            msg: 'User data generated successfully'
        };

    } catch (err) {
        throw err;
    }
};