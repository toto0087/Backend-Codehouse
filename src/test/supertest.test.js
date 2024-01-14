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

describe("Carts endpoint /", () => {

    describe("GET /api/carts", () => {
        it("should get carts", async () => {
            const response = await request.get("/api/carts");
            console.log(response.body);
            expect(response.status).to.eql(200);
            expect(response.body).to.be.an("object");
        });
    });

    describe("POST /api/carts", () => {
        it("should create a cart", async () => {
          // Supongamos que tienes algunos productos en la base de datos con identificadores válidos
          const productos = [
            {
              id: "652c325e787893ddf648edf4", // Reemplaza con un identificador válido
              quantity: 2,
            }
          ];
    
          const response = await request.post("/api/carts").send({ products: productos });
          console.log(response.body);
    
          // Verifica que la respuesta sea exitosa (código 200)
          expect(response.status).to.eql(200);
    
          // Verifica que la respuesta sea un objeto
          expect(response.body).to.be.an("object");
        });
      });

    describe("GET /api/carts/:id", () => {
        it("should get a cart by id", async () => {
            const response = await request.get("/api/carts/65a443a61b944631c995fe1b");
            console.log(response.body);
            expect(response.status).to.eql(200);
            expect(response.body).to.be.an("object");
        });
    });


    describe("Session endpoint  /", () => {

        describe("POST api/users/login", () => {
            it("should authenticate with local strategy", async () => {
                const response = await request
                    .post("/api/users/login")
                    .send({
                    email: "tobisape5@gmail.com",
                    password: "popo123",
                    });
                expect(response.status).to.eql(302);
                expect(response.body).to.be.an("object");
            });
        });
      
        describe("GET /api/sessions/auth/github", () => {
                it("should authenticate with Github strategy", async () => {
                // Simular la autenticación de Github
                const response = await request.get("/api/sessions/auth/github");
                expect(response.status).to.eql(302); // Redirección después de la autenticación
            });
        });
      
        describe("GET /api/sessions/auth/google", () => {
            it("should authenticate with Google strategy", async () => {
                // Simular la autenticación de Google
                const response = await request.get("/api/sessions/auth/google");
                expect(response.status).to.eql(302); // Redirección después de la autenticación
            });
        });

    });

});