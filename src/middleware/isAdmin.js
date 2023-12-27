export const isAdmin = (req, res, next) => {
    // Verificar si el usuario tiene el rol de administrador
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
      return next(); // Si es administrador, permite el acceso
    } else {
      res.status(403).json({ message: 'Acceso no autorizado' }); // Si no es administrador, devuelve un error 403
    }
  };