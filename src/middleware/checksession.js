function checkSession(req, res, next) {
    if (req.session) {
        // session valida
        console.log(req.session)
        next();
    } else {
        // session invalida, redireccion a login
        res.redirect('/login');
    }
}

export default checkSession;