import {Router} from "express"
import {createCart,
        getCartById,
        addProductCart,
        updateCart,
        updateProdCart,
        deleteCart
} from "../controllers/carts.controller.js"

const router = Router();

// Ruta para crear un nuevo carrito
router.post('/', createCart);

//Obtenemos por ID
router.get('/:id', getCartById);

//Agregamos un producto al carrito
router.post('/:cid/product/:pid', addProductCart);

//Actualizamos el carrito
router.put('/:cid', updateCart);

//Actualizamos un producto del carrito
router.put('/:cid/product/:pid', updateProdCart);

//Eliminamos el carrito
router.delete('/:cid', deleteCart);



export default router;