export default class BasicManager {

    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return this.model.find();
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async create(product) {
        return this.model.create(product);
    }

    async update(id, product) {
        return this.model.updateOne({_id: id}, product);
    }

    async delete(id) {
        return this.model.deleteOne({_id: id});
    }

}