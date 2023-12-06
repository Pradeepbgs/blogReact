import express from 'express';
// import handleSubmitLogin from '../controllers/user.controller.js';
import handleSubmitRegister from '../controllers/user.controller.js';

const router = express.Router();


router.post('/login', handleSubmitRegister);





export default router;