export default class UserDTO {
    
    constructor (obj) {
        this.full_name = `${obj.first_name} ${obj.last_name}`;
        this.email = obj.email;
        this.birth_date = obj.birth_date;
        this.password = obj.password;
        this.cart = obj.cart;
        this.status = obj.status;
        this.role = obj.role;
        this.from_github = obj.from_github;
    } 

}