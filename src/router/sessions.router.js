import { Router } from "express";
import passport from "passport";

const router = Router();


router.get('/auth/github',
  passport.authenticate('github', {
     scope: [ 'user:email' ] 
    }));

router.get('/github', 
  passport.authenticate('github', {
     session: false,
     failureRedirect: '/login' , 
     successRedirect: '/products'
    }));

router.get('/auth/google',
    passport.authenticate('google', {
       scope: ['profile', 'email'] 
    }));
  
router.get('/google', 
    passport.authenticate('google', { 
        successRedirect: '/products',
        failureRedirect: '/login' }),
    );

export default router;