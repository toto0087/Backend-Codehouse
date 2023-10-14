import {productsModel} from '../models/products.model.js';
import BaseManager from './baseManager.js';

class ProductManager extends BaseManager{
    constructor() {
        super(productsModel);
    }
}

export const productsManager = new ProductManager();
