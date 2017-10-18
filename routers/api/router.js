var router = require('express').Router();

router.route('/').get(function(req, res, next) {
    res.json({message: 'Hello from API'});
});

module.exports = router;
