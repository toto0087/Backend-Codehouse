import supertest from "supertest";
import { expect} from "chai";

const request = supertest("http://localhost:3000");

describe("Products endpoint /", () => {

    describe("GET /api/products", () => {
        it("should get products", async () => {
            const response = await request.get("/api/products");
            console.log(response.body);
            expect(response.status).to.eql(200);
            expect(response.body).to.be.an("object");
        });
    });

    describe("POST /api/products", () => {
        it("should not create a product because of permissions", async () => {
            const response = await request.post("/api/products").send({
                title: "test",
                description: "test",
                stock: 100,
                price: 100,
                code: "test",
            });
            console.log(response.body);
            expect(response.status).to.eql(403);
            expect(response.body).to.be.an("object");
        });
    });

    describe("GET /api/products/:id", () => {
        it("should get a product by id", async () => {
            const response = await request.get("/api/products/652c325e787893ddf648edf4");
            console.log(response.body);
            expect(response.status).to.eql(200);
            expect(response.body).to.be.an("object");
        });
    });


});