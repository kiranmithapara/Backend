import request from "supertest";

import app from "../app";

describe("Customer API", () => {
  it("should get all customers", async () => {
    const response = await request(app).get("/customers");

    expect(response.status).toBe(200);
  });

  it("should create customer", async () => {
    const response = await request(app)
      .post("/customers")

      .send({
        name: "Test User",

        email: "test@gmail.com",

        phone: "9999999999",

        address: "Ahmedabad",
      });

    expect(response.status).toBe(201);
  });
});
