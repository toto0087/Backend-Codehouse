import {Router} from "express"
import passport from "passport";

const router = Router();

/////////////////////////// LO HACE PASSPORT YA ///////////////////////////

// router.post('/signup', async (req, res) => {
//     try {
//         const { first_name, last_name, email, password, birth_date } = req.body;


//         // Birth date validation
//         const birthDate = new Date(birth_date);
//         const today = new Date();
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const month = today.getMonth() - birthDate.getMonth();
//         if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         if (age < 18) return res.status(400).json({ error: "Debe ser mayor de 18 años para registrarse" });
//         if (age > 99) return res.status(400).json({ error: "La fecha de nacimiento es inválida" });

//         // Email validation
//         const userExist = await userManager.findByEmail(email);
//         if (userExist) return res.status(400).json({ error: "El email ya existe" });

//         // Password validation
//         if (password.length < 8) return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });

//         // Encriptamos la contraseña
//         const hashedPassword = await hashData(password); 


//         const cart = await cartsManager.create();

//         const user = {
//             first_name,
//             last_name,
//             email,
//             cart: cart._id,
//             birth_date,
//             password: hashedPassword
//         }

//         const newUser = await userManager.create(user)
        
//         return res.redirect('/login')
//     } catch (error) {
//         return res.status(400).json({error: error.message});
//     }
// });


/*
router.post('/login', async (req, res) => { 
    const {email,password} = req.body;
    try {
        if(email !== "adminCoder@coder.com") {

            const userDatabase = await userManager.findByEmail(email);
            if (!userDatabase) return res.status(404).json({ error: "Usuario no encontrado" })
            const passwordMatch = await compareData(password, userDatabase.password);
            if (!passwordMatch) return res.status(400).json({ error: "El email o la contraseña son incorrectos" });

            req.session["email"] = userDatabase.email;
            req.session["first_name"] = userDatabase.first_name;
            req.session["cart"] = userDatabase.cart._id;
            req.session["isAdmin"] = userDatabase.role === 'admin' ? true : false;

            return res.redirect('/products');
        } else {
            if (req.body.password !== "adminCod3r123") return res.status(400).json({ error: "El email o la contraseña son incorrectos" });
            req.session["email"] = req.body.email;
            req.session["first_name"] = 'Coder Admin';
            req.session["cart"] = '653bb65e8619f8ed2c4864aa' // Predefinido ya que el usuariop admin no esta creado en la base de datos
            req.session["isAdmin"] = true

            return res.redirect('/realtimeproducts');
        }


    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error });
    }

});
*/

/////////////////////////// PASSPORT ///////////////////////////


router.post('/login',
 passport.authenticate('login', { 
    successRedirect: '/products', 
    failureRedirect: '/login' }))

router.post('/signup', 
passport.authenticate('signup', { 
    successRedirect: '/products', 
    failureRedirect: '/signup' }))

router.get('/logout',() => destroySession);
const destroySession = async (req, res) => {
    try {
        req.session.destroy(()=> {
            res.redirect('/login')
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

router.get('/auth/github',
  passport.authenticate('github', {
     scope: [ 'user:email' ] 
    }));

router.get('/github', 
  passport.authenticate('github', {
     failureRedirect: '/login' , 
     successRedirect: '/products'
    }));


export default router;