function isPremium(req, res, next) {
    // Verificar si el usuario tiene el rol de administrador
    if (req.isAuthenticated() && req.user && req.user.role === 'premium') {
      console.log("User is premium");
      return next(); // Si es administrador, permite el acceso
    } else {
      console.log("User is not premium");
      res.status(403).json({ message: 'Acceso no autorizado' }); // Si no es administrador, devuelve un error 403
    }
  };
  
  export default isPremium;