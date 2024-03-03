import {Router} from "express"
import passport from "passport";
import {userPremium,getUsers,deleteInactiveUsers,deleteUser,editRole,getUser} from "../controllers/users.controller.js"

const router = Router();

router.put('/premium/:id', userPremium);
router.get('/', getUsers)
router.get('/:id', getUser);
router.delete('/', deleteInactiveUsers);
router.delete('/:id', deleteUser);
router.put('/edit/:id', editRole);

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