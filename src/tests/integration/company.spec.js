const request = require("supertest");
const app = require("../../server");
const {
    SUCCESS_ADD_COMPANY,
    SUCCESS_DELETE_COMPANY,
  } = require("../../includes/Constants");

describe("Tests to Company Conrtroller", () => {
  it("Should register a new company", async () => {
    const company = {
      id: 1,
      company_type_id: 1,
      company_name: "test company",
      telephone: "123456",
      email: "company@example.com",
    };

    const response = await request(app)
      .post("/company/create/")
      .send(company)
      .expect(201);

    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty(
      "message",
      SUCCESS_ADD_COMPANY
    );
    expect(response.body).toHaveProperty("companyId");
  });

  it("Should delete a company", async () => {
    const response = await request(app)
      .delete("/company/delete/")
      .send({ id: 1 })
      .expect(201);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty(
        "message",
        SUCCESS_DELETE_COMPANY
      );
      expect(response.body).toHaveProperty("result");
  });
});
