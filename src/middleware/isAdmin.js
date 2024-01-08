function isAdmin(req, res, next) {
    // Verificar si el usuario tiene el rol de administrador
    if (req.isAuthenticated() && req.user && req.user.role === 'admin' || req.user.role === 'premium') {
      console.log("User is admin or premium");
      return next(); // Si es administrador o premium, permite el acceso
    } else {
      console.log("User is not admin or premium");
      res.status(403).json({ message: 'Acceso no autorizado' }); // Si no es administrador o premium, devuelve un error 403
    }
  };
  
  export default isAdmin;