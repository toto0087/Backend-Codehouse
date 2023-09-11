class Product {
    
    #stock;
    #description;
    #title;

    constructor(title, description, stock, price, code, thumbnail) { 
        this.#title = title;
        this.#description = description
        this.#stock = stock;
    }
}

module.exports = Product;