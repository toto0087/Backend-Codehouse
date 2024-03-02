import {Router} from "express"
import checkSession from "../middleware/checksession.js";
import {
    renderProducts,
    renderRealtimeProducts,
    renderRealtimeProduct,
    createRealtimeProduct,
    updateRealtimeProduct,
    deleteRealtimeProduct,
    renderSignup,
    renderLogin,
    renderChat,
    renderResetPass,
    renderUsers
}
from "../controllers/views.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

//PRODUCTS
router.get('/products',checkSession, renderProducts);

//REALTIME PRODUCTS
router.get('/realtimeproducts',checkSession, renderRealtimeProducts);
router.post('/realtimeproducts', checkSession,isAdmin, createRealtimeProduct);
router.get('/realtimeproducts/:id',checkSession, renderRealtimeProduct);
router.put('/realtimeproducts/:id',checkSession,isAdmin, updateRealtimeProduct);
router.delete('/realtimeproducts/:id',checkSession,isAdmin, deleteRealtimeProduct);

//SIGNUP
router.get('/signup', renderSignup);

//LOGIN
router.get('/login', renderLogin);

//CHAT
router.get('/chat',checkSession, renderChat);

//PASS RESET
router.get('/passreset', renderResetPass);

//USERS
router.get('/users', renderUsers);

export default router;
