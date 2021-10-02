const authService = require('../../service/auth/authService');

module.exports.googleAuth = async (req, res) => {
    try {
        const serviceResponse = await authService.googleAuth(req.user);
        return res.redirect(`http://localhost:3000?token=${serviceResponse.data.token}`);
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.getUserDetails = async (req, res) => {
    try {
        const serviceResponse = await authService.getUserDetails(req.user);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};