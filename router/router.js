const express = require('express');
const { register, login, getUser, updateUser, logout, deleteUser } = require('../controllers/controller');
const { registerFieldValidator, loginFieldValidator, updateFieldValidator } = require('../middleware/fieldValidator');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router.post('/register', registerFieldValidator, register);
router.post('/login', loginFieldValidator, login);
router.get('/getuser', jwtAuth, getUser);
router.post('/updateuser', jwtAuth, updateFieldValidator, updateUser);
router.get('/logout', jwtAuth, logout);
router.delete('/delete', jwtAuth, deleteUser);


module.exports = router;