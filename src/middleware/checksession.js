function checkSession(req, res, next) {
    if (req.session) {
        // sesión válida
        console.log("SESION VÁLIDA: ", req.session);
        console.log("ESTÁ AUTENTICADO: ", req.isAuthenticated());
        next();
    } else {
        // sesión inválida, redirección a login
        console.log("SESIÓN INVÁLIDA, REDIRECCIÓN A LOGIN");
        res.redirect('/login');
    }
}

export default checkSession;