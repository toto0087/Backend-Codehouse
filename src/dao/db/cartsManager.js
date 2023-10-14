import {cartsManager} from '../models/carts.model.js';
import BaseManager from './baseManager.js';

class CartsManager extends BaseManager{
    constructor() {
        super(cartsManager);
    }
}

export const cartsManager = new CartsManager();
