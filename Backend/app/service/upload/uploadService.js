let User = require('../../schema/user');

const { google } = require('googleapis');
let oAuth2Client = new google.auth.OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET_ID, process.env.CALL_BACK_URL_DRIVE);
const formidable = require('formidable');
let fs = require('fs');

const BadRequestException = require('./../../util/exceptions/badRequestException');

module.exports.getGoogleAccountConnection = async () => {

    try {

        const authURL = await oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.email']
        })

        let return_data_set = {
            redirect_url: authURL
        };

        return {
            data: return_data_set,
            msg: 'auth url generated successfully'
        };

    } catch (err) {
        throw err;
    }
};

module.exports.connectGoogleAccount = async (requestUser, requestBody) => {
    try {

        let code = requestBody.auth_code;

        const token = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(token.tokens);
        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });

        let respond = await oauth2.userinfo.get();

        let user_email = respond.data.email;

        await User.findByIdAndUpdate(requestUser._id, {
            'google_connection_settings.access_token': token.tokens.access_token,
            'google_connection_settings.refresh_token': token.tokens.refresh_token,
            'google_connection_settings.token_type': token.tokens.token_type,
            'google_connection_settings.scope': token.tokens.scope,
            'google_connection_settings.id_token': token.tokens.id_token,
            'google_connection_settings.expiry_date': token.tokens.expiry_date,
            'google_connection_settings.connected_account_email': user_email,
            'google_connection_settings.is_google_drive_connected': true
        });

        oAuth2Client.setCredentials(null);

        return {
            msg: 'Account connected successfully'
        }

    } catch (err) {
        throw err;
    }
};

module.exports.disconnectGoogleAccount = async (requestUser) => {
    try {

        let userObj = await User.findById(requestUser._id);

        if (!userObj) {
            throw new BadRequestException('Invalid request');
        }

        let token = {
            access_token: userObj.google_connection_settings.access_token,
            refresh_token: userObj.google_connection_settings.refresh_token,
            token_type: userObj.google_connection_settings.token_type,
            scope: userObj.google_connection_settings.scope,
            id_token: userObj.google_connection_settings.id_token,
            expiry_date: userObj.google_connection_settings.expiry_date
        };

        oAuth2Client.setCredentials(token);

        await oAuth2Client.revokeCredentials();

        await User.findByIdAndUpdate(requestUser._id, {
            'google_connection_settings.access_token': null,
            'google_connection_settings.refresh_token': null,
            'google_connection_settings.token_type': null,
            'google_connection_settings.scope': null,
            'google_connection_settings.id_token': null,
            'google_connection_settings.expiry_date': 0,
            'google_connection_settings.connected_account_email': null,
            'google_connection_settings.is_google_drive_connected': false
        });

        return {
            msg: 'Account disconnected successfully'
        }

    } catch (err) {
        throw err;
    }
};

module.exports.uploadImage = async (req,res) => {
    try {

        let userObj = await User.findById(req.user._id);

        if (!userObj) {
            throw new BadRequestException('Invalid request');
        }

        let token = {
            access_token: userObj.google_connection_settings.access_token,
            refresh_token: userObj.google_connection_settings.refresh_token,
            token_type: userObj.google_connection_settings.token_type,
            scope: userObj.google_connection_settings.scope,
            id_token: userObj.google_connection_settings.id_token,
            expiry_date: userObj.google_connection_settings.expiry_date
        };

        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ success: false, msg: 'Formidable error', showMessage: true });
            }
            oAuth2Client.setCredentials(token);

            const drive = google.drive({ version: 'v3', auth: oAuth2Client });

            const fileMetaData = {
                name: files.file.name
            };
            const media = {
                mimeType: files.file.type,
                body: fs.createReadStream(files.file.path)
            };
            drive.files.create({
                resource: fileMetaData,
                media: media,
                fields: 'id'
            },(err,file)=>{
                oAuth2Client.setCredentials(null);
                if(err){
                    return res.status(500).json({ success: false, msg: 'Image upload error', showMessage: true });
                }else{
                    return res.status(200).json({ success: true, msg: 'Image upload successful', showMessage: true });
                }
            });

        })
    } catch (err) {
        throw err
    }
};