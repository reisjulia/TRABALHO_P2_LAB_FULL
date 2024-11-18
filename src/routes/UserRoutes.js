const express = require('express'); 
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth')

const router = express.Router();

router.post('/register', UserController.store); // p registro
router.post('login', UserController.login); // p login
router.delete('users/:id', auth, UserController.delete); // p deletar

module.exports = router;
