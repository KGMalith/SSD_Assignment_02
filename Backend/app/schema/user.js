let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    full_name:{
        type: String
    },
    google_auth_id:{
        type: String
    },
    image_url:{
        type:String,
        default:null
    },
    google_connection_settings:{
        access_token: {
            type: String
        },
        refresh_token: {
            type: String
        },
        token_type: {
            type: String
        },
        scope: {
            type: String
        },
        id_token: {
            type: String
        },
        expiry_date:{
            type: Number
        },
        connected_account_email:{
            type: String
        },
        is_google_drive_connected:{
            type:Boolean,
            default:false
        }
    }
});

module.exports = mongoose.model('User', UserSchema);