import {Router} from "express"
import { getProducts, 
        getProductById, 
        createProduct, 
        updateProduct, 
        deleteProduct
} from "../controllers/products.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

// Ruta para obtener todos los carritos
router.get('/', getProducts);

// Ruta para obtener un carrito por ID
router.get('/:id', getProductById);

// Ruta para crear un nuevo carrito
router.post('/', isAdmin, createProduct);

// Ruta para actualizar un carrito
router.put('/:id',isAdmin, updateProduct);

// Ruta para eliminar un carrito
router.delete('/:id',isAdmin, deleteProduct);


export default router;