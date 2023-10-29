import {Router} from "express"

const router = Router();

router.get('/', async (req, res) => {
    res.render("login",{style:"login.css"})
});

router.post('/', async (req, res) => { 
    const {email,password} = req.body;
    res.cookie(email,password, {maxAge: 1000 * 60 * 60 * 24 * 365}).send("cookie added"); // 1 year
});

export default router; 