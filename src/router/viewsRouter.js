import {Router} from "express"
const router = Router();

router.get('/', async (req, res) => {
    res.render("home",{style:"home.css"})
});

export default router;