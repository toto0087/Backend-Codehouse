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
    renderLogin
}
from "../controllers/views.controller.js";

const router = Router();

//PRODUCTS
router.get('/products',checkSession, renderProducts);

//REALTIME PRODUCTS
router.get('/realtimeproducts',checkSession, renderRealtimeProducts);
router.post('/realtimeproducts',checkSession, createRealtimeProduct);
router.get('/realtimeproducts/:id',checkSession, renderRealtimeProduct);
router.put('/realtimeproducts/:id',checkSession, updateRealtimeProduct);
router.delete('/realtimeproducts/:id',checkSession, deleteRealtimeProduct);

//SIGNUP
router.get('/signup', renderSignup);

//LOGIN
router.get('/login', renderLogin);

export default router;
