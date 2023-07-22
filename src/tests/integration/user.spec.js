const request = require("supertest");
const app = require("../../server");
const {
	SUCCESS_ADD_USER,
	SUCCESS_DELETE_USER
} = require("../../includes/Constants");

describe("Tests to User Conrtroller", () => {
	const company = {
		id: 2,
		company_type_id: 1,
		company_name: "test company to user",
		telephone: "12345678",
		email: "companyUser@example.com",
	};

	const user = {
		id: 2,
		full_name: "jest test user",
		user_login: "test_user",
		user_password: "test_user",
		email: "testUser@example.com",
		company_id: company.id,
	};

	beforeAll(async () => {
		// Create a new company.
		await request(app)
			.post("/company/create/")
			.send(company);
	});

	afterAll(async () => {
		// Delete company.
		await request(app)
			.delete("/company/delete/")
			.send({ id: company.id });
	});

	it("Should create a new user", async () => {
		// Create a new user
		const response = await request(app)
			.post("/user/create/")
			.send(user)
			.expect(201);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body).toHaveProperty(
			"message",
			SUCCESS_ADD_USER
		);
		expect(response.body).toHaveProperty("userId");
	});

	it("Should delete a user", async () => {
		const response = await request(app)
			.delete("/user/delete/")
			.send({ id: user.id })
			.expect(201);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body).toHaveProperty(
			"message",
			SUCCESS_DELETE_USER
		);
		expect(response.body).toHaveProperty("result");
	});
});
