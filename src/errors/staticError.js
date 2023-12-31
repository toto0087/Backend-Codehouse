export default class ErrorClass {
    static createError(entity) {
        throw new Error( `${entity}` )
    }
}
