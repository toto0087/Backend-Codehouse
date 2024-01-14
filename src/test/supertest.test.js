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
    })
});