import {Router} from "express"
import passport from "passport";

const router = Router();



/////////////////////////// PASSPORT ///////////////////////////


router.post('/login',
 passport.authenticate('login', { 
    successRedirect: '/products', 
    failureRedirect: '/login' }))

router.post('/signup', 
passport.authenticate('signup', { 
    successRedirect: '/products', 
    failureRedirect: '/signup' }))


router.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('token')
            res.redirect('/login');
        });
    });


export default router;