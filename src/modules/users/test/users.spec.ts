import app from "../../..";
import request from "supertest";
import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import { validateToken } from "../../../utilities/tokenVerify";
import jwt from "jsonwebtoken";
chai.use(chaiHttp);

const expect = chai.expect;

describe("User Registration API", () => {
  it("should create a new user account", async () => {
    const userData = {
      email: "test@example.com",
      password: "Password@123",
      confirm: "Password@123",
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).to.equal(200);
    expect(response.body).to.equal("Account Is Created");
  });
  it("should return conflict  if user email  already exists", async () => {
    const userData = {
      email: "test@example.com",
      password: "Password@123",
      confirm: "Password@123",
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).to.equal(409);
    expect(response.body).to.equal("Email in use");
  });
  it("should return  Bad Request if email is missing", async () => {
    const userData = {
      password: "Password@123",
      confirm: "Password@123",
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Email is required");
  });
  it("should return  Bad Request if password is missing", async () => {
    const userData = {
      email: "test@example.com",
      confirm: "Password@123",
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Password is required");
  });
  it("should return  Bad Request if confirm password is missing", async () => {
    const userData = {
      email: "test@example.com",
      password: "Password@123",
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("confirm Password");
  });
  it("should return  Bad Request if password is not strong", async () => {
    const userData = {
      email: "test@example.com",
      password: "short",
      confirm: "short",
    };
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Create Strong Password");
  });
});

describe("User Authentication API", () => {
  it("should return  Bad Request if email is incorrect", async () => {
    const userData = {
      email: "unknown@gmail.com",
      password: "Password@123",
    };
    const response = await request(app).post("/api/users/login").send(userData);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Email or Password is incorrect");
  });
  it("should return  Bad Request if password is incorrect", async () => {
    const userData = {
      email: "test@example.com",
      password: "incorrectPassword@123",
    };
    const response = await request(app).post("/api/users/login").send(userData);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Email or Password is incorrect");
  });
  it("should return string token if email or password is correct", async () => {
    const userData = {
      email: "test@example.com",
      password: "Password@123",
    };
    const response = await request(app).post("/api/users/login").send(userData);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.a("string");
  });
});

describe("validateToken Middleware", () => {
  it("should return 500 error with invalid token", async () => {
    const req: any = {
      headers: {
        authorization: "Bearer invalid_token",
      },
    };

    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    await validateToken(req, res, next);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: "jwt malformed" })).to.be.true;
    expect(next.called).to.be.false; // next() should not be called
  });
});
