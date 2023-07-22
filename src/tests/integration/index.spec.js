const request = require("supertest");
const app = require("../../server");

describe('test to the app server', () => {
    it('Should get main route and get status 200', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
    });
});
