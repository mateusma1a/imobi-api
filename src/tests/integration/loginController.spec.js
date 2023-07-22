const request = require("supertest");
const app = require("../../server");

const {
  SUCCESS_LOGGED,
  INCORRECT_CREDENTIALS,
} = require("../../includes/Constants");

describe("tests to Login controller", () => {
  const company = {
    id: 3,
    company_type_id: 1,
    company_name: "test company to user login",
    telephone: "123456",
    email: "companyUserLogin@example.com",
  };

  const user = {
    id: 3,
    full_name: "jest test",
    user_login: "test_login",
    user_password: "test_login",
    email: "testLogin@example.com",
    company_id: company.id,
  };

  beforeAll(async () => {
    // Create a new company.
    await request(app).post("/company/create/").send(company);
    // Create a new user
    await request(app).post("/user/create/").send(user);
  });

  afterAll(async () => {
    // delete user and company
    await request(app).delete("/user/delete/").send({ id: user.id });
    await request(app).delete("/company/delete/").send({ id: company.id });
  });
  it("Should return status 200 with success message", async () => {
    // test user login
    const res = await request(app)
      .post("/login/auth/")
      .send({ userLogin: "test_login", userPassword: "test_login" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(SUCCESS_LOGGED);
  });

  it("Should return status 401 with error message", async () => {
    const res = await request(app)
      .post("/login/auth/")
      .send({ userLogin: "test", userPassword: "worongPassword" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(INCORRECT_CREDENTIALS);
  });

  it("Should return status 500 with error message", async () => {
    const res = await request(app).post("/login/auth/");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });
});
