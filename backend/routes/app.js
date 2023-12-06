import express from 'express';
// import handleSubmitLogin from '../controllers/user.controller.js';
import {handleSubmitRegister, handleSubmitLogin} from '../controllers/user.controller.js';

const router = express.Router();


router.post('/signup', handleSubmitRegister);
router.post('/login', handleSubmitLogin);





export default router;