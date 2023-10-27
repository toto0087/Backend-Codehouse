import {productsModel} from '../models/products.model.js';
import BaseManager from './baseManager.js';

class ProductManager extends BaseManager{
    constructor() {
        super(productsModel);
    }

    async findAll(params) {
        const {
            limit,
            page,
            sort,
            stock,
        } = params;

        const query = stock ? {stock: {$gt: stock}} : null;

        const options = {
            limit: limit ? limit : 1, // resultados por pagina
            page: page ? page : 1, // pagina  actual
            sort: (sort === 'asc' || sort === 'desc') ? {price: sort == 'asc' ? 1 : -1 }: null,
        }

        console.log(options);
        try {            
            // Verificamos si existe query y options
            const result = await this.model.paginate( query ? query : {} , options ? options : {});

            console.log(result);

            const info = {
                status: 'success',
                payload: result.docs.map(doc => doc.toObject()), 
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevPage ? 
                `http://localhost:3000/api/products?page=${result.prevPage}&limit=${options.limit}` : null,
                nextLink: result.nextPage ? 
                `http://localhost:3000/api/products?page=${result.nextPage}&limit=${options.limit}` : null,
            }
            
            
            return info;

        } catch (error) {
            return {
                error: 'Prod no encontrado'
            };
        }
    }

}

export const productsManager = new ProductManager();
