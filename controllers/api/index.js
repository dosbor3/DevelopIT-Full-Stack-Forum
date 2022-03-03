const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const homeRoutes = require('../home-routes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);

module.exports = router;