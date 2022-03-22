const router = require('express').Router();

const apiRoutes = require('./apiRoutes/index');
const htmlRoutes = require('./htmlRoutes/index');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.sendStatus(404).send('<h1> 404 Error!</h1>');
});

module.exports = router;