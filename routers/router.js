var router = require('express').Router();

router.use('/api', require('./api/router'));

module.exports = router;
