const express = require('express');
const router = express.Router();

router.use('/movies', require('./movie.routes'));

module.exports = router;
