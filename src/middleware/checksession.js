const checkSession = (req, res, next) => { 
    if (req.session["email"]) {
        next();
    } else {
        res.redirect('/login');
    }
};

export default checkSession;