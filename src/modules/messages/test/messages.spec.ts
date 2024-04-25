import app from "../../..";
import request from "supertest";
import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import { recordMessage } from "../controllers/messageController";
import {
  existingEmail,
  pushingMessage,
  recordingMessage,
} from "../repository/messageRepository";
import { messageValidation } from "../../../utilities/input";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Recording Message", () => {
  it("should save amessage from user", async () => {
    const message = {
      firstName: "Example",
      lastName: "sureName",
      email: "test@example.com",
      phoneNumber: "0783333333",
      message: "My Message",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(200);
    expect(response.body).to.equal("Your message is sent");
  });
  it("should add a message if the email alrady exists", async () => {
    const message = {
      firstName: "Example",
      lastName: "sureName",
      email: "another@example.com",
      phoneNumber: "0783333333",
      message: "New Message",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(200);
    expect(response.body).to.equal("Your message is sent");
  });
  it("should return bad request when the firstName is missing", async () => {
    const message = {
      lastName: "sureName",
      email: "another@example.com",
      phoneNumber: "0783333333",
      message: "My Message",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("First Name is required");
  });
  it("should return bad request when the lastName is missing", async () => {
    const message = {
      firstName: "Example",
      email: "another@example.com",
      phoneNumber: "0783333333",
      message: "My Message",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Last Name is required");
  });
  it("should return  Bad Request if email is missing", async () => {
    const message = {
      firstName: "Example",
      lastName: "sureName",
      phoneNumber: "0783333333",
      message: "My Message",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Email is required");
  });
  it("should return  Bad Request phoneNumber is missing", async () => {
    const message = {
      firstName: "Example",
      lastName: "sureName",
      email: "test@example.com",
      message: "My Message",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Phone number is required.");
  });
  it("should return  Bad Request if message is missing", async () => {
    const message = {
      firstName: "Example",
      lastName: "sureName",
      email: "test@example.com",
      phoneNumber: "0783333333",
    };
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send(message);
    expect(response.status).to.equal(400);
    expect(response.body).to.equal("Message is required");
  });
  it("should return server error (400) when sendind empty body", async () => {
    const response = await request(app)
      .post("/api/messages/recordingMessage")
      .send();

    // Expecting a 501 Server Error response
    expect(response.status).to.equal(400);
  });
});
