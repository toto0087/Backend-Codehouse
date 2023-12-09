import passport from "passport";
import { userManager } from "./dao/db/userManager.js";
import {Strategy as LocalStrategy} from "passport-local";
import { hashData } from "./utils.js";
import { compareData } from "./utils.js";
import { cartsManager } from "./dao/db/cartsManager.js";
import {Strategy as GithubStrategy} from "passport-github2";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";


// LOCAL

passport.use('signup' , new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, 
async (req,email,password,done) => {
    try {
        const { first_name, last_name, birth_date} = req.body;
        
        const userExist = await userManager.findByEmail(email);
        if (userExist) return done(null, false, { message: "El email ya existe" });

        const encriptedPass = await hashData(password);

        const newCart = await cartsManager.create();

        const cartObjectId = newCart._id;

        const user = {
            first_name,
            last_name,
            birth_date,
            email,
            password: encriptedPass,
            cart: cartObjectId 
        }
        
        const newUser = await userManager.create(user);  
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
}))


passport.use('login' , new LocalStrategy({
    usernameField: 'email',

},
async (email,password,done) => {
    try {

        if (email == "adminCoder@coder.com") {

            if (password == "adminCod3r123") {
                const userAdm = {
                    email: "adminCoder@coder.com" , 
                    first_name: "Administrador coder", 
                    role: "admin",
                    cart: "653bb65e8619f8ed2c4864aa"
                }
                return done(null, userAdm)
            }
            
            return done(null, false, { message: "Contraseña incorrecta" });

        } else {
            
            const user = await userManager.findByEmail(email);

            if (!user) return done(null, false, { message: "El email no existe" });

            const validPassword = await compareData(password, user.password);
            if (!validPassword) return done(null, false, { message: "Contraseña incorrecta" });
    
            return done(null, user);
        }

    } catch (error) {
        return done(error);
    }
}))


// GITHUB

passport.use('github',new GithubStrategy({
    clientID: 'Iv1.475526a610ca29d2',
    clientSecret: '484e7ec8546c17dd41a9b8b9e5d5dc6369d598b5',
    callbackURL: "http://localhost:3000/api/sessions/github"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
        const userExist = await userManager.findByEmail(profile._json.email);

        if(userExist){
            if (userExist.from_github) {
                return done(null, userExist);
            } else {
                return done(null, false);
            }
        }

        const newCart = await cartsManager.create();

        const cartObjectId = newCart._id;

        const user = {
            first_name: profile._json.name,
            last_name: '',
            email: profile._json.email,
            password: profile._json.node_id,
            cart: cartObjectId,
            from_github: true,
        }
        
        const newUser = await userManager.create(user);  
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
  }
));


// GOOGLE

passport.use('google',new GoogleStrategy({
    clientID: '1034671111148-18q35h4mq5h9mvihls3dur35bcp2ract.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/api/sessions/google"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
        const userExist = await userManager.findByEmail(profile._json.email);

        if(userExist){
            if (userExist.from_google) {
                return done(null, userExist);
            } else {
                return done(null, false);
            }
        }

        const newCart = await cartsManager.create();

        const cartObjectId = newCart._id;

        const user = {
            first_name: profile._json.name,
            last_name: '',
            email: profile._json.email,
            password: profile._json.node_id,
            cart: cartObjectId,
            from_google: true,
        }
        
        const newUser = await userManager.create(user);  
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
  }
));


passport.serializeUser(function(user, done) {
    done(null, user._id); // Si tenemos la info del user nos quedamos con el id
  });
  
  passport.deserializeUser(async (info, done) => {
    try {
      if (info && info._id) {
        const user = await userManager.findById(info._id);
        if (user) {
          done(null, user);
        } else {
          done(null, false, { message: 'Usuario no encontrado' });
        }
      } else {
        done(null, false, { message: 'ID de usuario no proporcionado' });
      }
    } catch (error) {
      done(error);
    }
  });