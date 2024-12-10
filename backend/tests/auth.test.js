const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // Path to your Express server
const User = require("../src/models/User");
const authUtils = require("../src/utils/authUtils");

jest.mock("../src/utils/authUtils", () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
  generateToken: jest.fn(),
}));

describe("User Controller", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Disconnect any existing connection first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/users/login", () => {
    it("should login a user with valid credentials", async () => {
      const hashedPassword = "hashedPassword123";
      const mockToken = "mockedToken";

      // Mock database user
      const user = new User({
        email: "testuser@example.com",
        password: hashedPassword,
        firstName: "Test",
        lastName: "User",
        role: "client",
      });
      await user.save();

      // Mock authUtils
      authUtils.comparePassword.mockResolvedValueOnce(true);
      authUtils.generateToken.mockReturnValueOnce(mockToken);

      // Send login request
      const res = await request(app)
        .post("/api/v1/users/login")
        .send({ email: user.email, password: "Password123" });

      // Assertions
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token", mockToken);
      expect(authUtils.comparePassword).toHaveBeenCalledWith(
        "Password123",
        hashedPassword
      );
    });

    it("should return error for invalid credentials", async () => {
      const user = new User({
        email: "testuser@example.com",
        password: "hashedPassword123",
        firstName: "Test",
        lastName: "User",
        role: "client",
      });
      await user.save();

      authUtils.comparePassword.mockResolvedValueOnce(false);

      const res = await request(app)
        .post("/api/v1/users/login")
        .send({ email: user.email, password: "WrongPassword" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should return error if user does not exist", async () => {
      const res = await request(app)
        .post("/api/v1/users/login")
        .send({ email: "nonexistent@example.com", password: "Password123" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe("POST /api/v1/users/signup", () => {
    it("should signup a new user", async () => {
      const hashedPassword = "hashedPassword123";
      const mockToken = "mockedToken";

      authUtils.hashPassword.mockResolvedValueOnce(hashedPassword);
      authUtils.generateToken.mockReturnValueOnce(mockToken);

      const newUser = {
        email: "newuser@example.com",
        password: "Password123",
        firstName: "New",
        lastName: "User",
        role: "client",
      };

      const res = await request(app).post("/api/v1/users/signup").send(newUser);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token", mockToken);
      expect(res.body.user).toHaveProperty("email", newUser.email);
      expect(authUtils.hashPassword).toHaveBeenCalledWith(newUser.password);
    });

    it("should not signup a user with an existing email", async () => {
      const existingUser = new User({
        email: "existinguser@example.com",
        password: "hashedPassword123",
        firstName: "Existing",
        lastName: "User",
        role: "client",
      });
      await existingUser.save();

      const newUser = {
        email: "existinguser@example.com",
        password: "Password123",
        firstName: "New",
        lastName: "User",
        role: "client",
      };

      const res = await request(app).post("/api/v1/users/signup").send(newUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "User already exists");
    });
  });
});
