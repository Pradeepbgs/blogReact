import express from 'express';
import {handleSubmitRegister, handleSubmitLogin, handleSubmitLogout} from '../controllers/user.controller.js';
import allpost from '../controllers/allpost.controller.js';
import { addPost } from '../controllers/addPost.js';
const router = express.Router();

router.get('/', (req, res) => {
    if (req.user) {
        res.status(200).json({ valid: true,user: req.user});
    } else {
        res.status(401).json({ valid: false, user: null });
    }
});

router.get('/signin', (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
})

router.get('/allpost', allpost)

router.post('/register', handleSubmitRegister);
router.post('/login', handleSubmitLogin);
router.post('/logout', handleSubmitLogout)
router.post('/add-post', addPost)




export default router;