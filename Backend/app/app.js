let express = require('express');
let router = express.Router();

//Import Schemas
require('./schema/index');

//Import Routing files
const authRoutes = require('./routes/auth/authRoutes');
let uploadRoutes = require('./routes/upload/uploadRoutes');


//Define Routing paths
router.use('/', authRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;