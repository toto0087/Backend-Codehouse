function isUserNotAdm(req, res, next) {
    // Verificar si el usuario tiene el rol de administrador
    if (req.isAuthenticated() && req.user && req.user.role === 'user') {
      console.log("User has a default role");
      return next(); // Si es administrador, permite el acceso
    } else {
      console.log("Not user");
      res.status(403).json({ message: 'Acceso no autorizado' }); // Si no es administrador, devuelve un error 403
    }
  };
  
  export default isUserNotAdm;