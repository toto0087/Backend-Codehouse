function isAdmin(req, res, next) {
    console.log("isAdmin middleware executed");
    // Verificar si el usuario tiene el rol de administrador
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
      console.log("User is admin");
      return next(); // Si es administrador, permite el acceso
    } else {
      console.log("User is not admin");
      res.status(403).json({ message: 'Acceso no autorizado' }); // Si no es administrador, devuelve un error 403
    }
  };
  
  export default isAdmin;