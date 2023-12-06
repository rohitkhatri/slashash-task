const express = require('express');
const router = express.Router();

router.use('/movies', require('./movie.views'));

module.exports = router;
