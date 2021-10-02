const uploadService = require('../../service/upload/uploadService');

module.exports.getGoogleAccountConnection = async (req, res) => {
    try {
        const serviceResponse = await uploadService.getGoogleAccountConnection();
        return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.connectGoogleAccount = async (req, res) => {
    try {
        const serviceResponse = await uploadService.connectGoogleAccount(req.user,req.body);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.disconnectGoogleAccount = async (req, res) => {
    try {
        const serviceResponse = await uploadService.disconnectGoogleAccount(req.user);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.uploadImage = async (req, res) => {
    try {
        const serviceResponse = await uploadService.uploadImage(req, res);
        return serviceResponse;
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};