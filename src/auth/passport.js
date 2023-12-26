import passport from "passport";
import {findByEmail,findById,create as createUser} from "../services/user.service.js";
import {create as createCart} from "../services/carts.service.js";
import {Strategy as LocalStrategy} from "passport-local";
import { hashData } from "../utils.js";
import { compareData } from "../utils.js";
import {Strategy as GithubStrategy} from "passport-github2";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from 'dotenv';
dotenv.config({ path: `.env`, override: true });
dotenv.config();

// LOCAL

passport.use('signup' , new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, 
async (req,email,password,done) => {
    try {
        const { first_name, last_name, birth_date} = req.body;
        
        const userExist = await findByEmail(email);
        if (userExist) return done(null, false, { message: "El email ya existe" });

        const encriptedPass = await hashData(password);

        const newCart = await createCart();

        const cartObjectId = newCart._id;

        const user = {
            first_name,
            last_name,
            birth_date,
            email,
            password: encriptedPass,
            cart: cartObjectId 
        }
        
        const newUser = await createUser(user);  
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

        if (email == process.env.ADMIN_EMAIL ) {

            if (password == process.env.ADMIN_PASSWORD) {
                const userAdm = {
                    email: process.env.ADMIN_EMAIL , 
                    first_name: process.env.ADMIN_FIRST_NAME , 
                    role: "admin",
                    cart: process.env.ADMIN_CART
                }
                return done(null, userAdm)
            }
            
            return done(null, false, { message: "Contraseña incorrecta" });

        } else {
            
            const user = await findByEmail(email);

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
    clientID: process.env.GITHUB_CLIENT_ID ,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
        const userExist = await findByEmail(profile._json.email);

        if(userExist){
            if (userExist.from_github) {
                return done(null, userExist);
            } else {
                return done(null, false);
            }
        }

        const newCart = await createCart();

        const cartObjectId = newCart._id;

        const user = {
            first_name: profile._json.name,
            last_name: '',
            email: profile._json.email,
            password: profile._json.node_id,
            cart: cartObjectId,
            from_github: true,
        }
        
        const newUser = await createUser(user);  
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
  }
));


// GOOGLE

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
        const userExist = await findByEmail(profile._json.email);

        console.log(userExist);

        if (userExist) {
            try {
                console.log('User exists:', userExist);
                if (!userExist.from_google) {
                    console.log('Updating user from_google to true');
                    // Actualizar el usuario existente
                    userExist.from_google = true;
                    await userExist.save();
                    console.log('User updated:', userExist);
                }
                console.log("entro aca");
                return done(null, userExist);
            } catch (error) {
                console.error('Error updating user:', error);
                return done(error);
            }
        } else {
            console.log("perfil 2", profile);
            try {
                const newCart = await createUser();

                const cartObjectId = newCart._id;

                const user = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: profile._json.node_id,
                    cart: cartObjectId,
                    from_google: true,
                }

                const newUser = await createUser(user);
                console.log("User created:", newUser);
                return done(null, newUser);
            } catch (error) {
                console.error('Error creating user:', error);
                return done(error);
            }
        }
    } catch (error) {
        console.error('Error en la estrategia de Google:', error);
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
        const user = await findById(info._id);
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