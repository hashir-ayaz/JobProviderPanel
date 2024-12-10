const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../src/models/User");
const {
  generateToken,
  hashPassword,
  comparePassword,
  extractToken,
  verifyTokenAndGetUser,
} = require("../src/utils/authUtils");

// Mock dependencies
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../src/models/User");

describe("authUtils", () => {
  const mockJwtSecret = "mockSecret";
  const mockJwtExpiresIn = "1h";

  beforeAll(() => {
    process.env.JWT_SECRET = mockJwtSecret;
    process.env.JWT_EXPIRES_IN = mockJwtExpiresIn;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate a token with the correct payload", () => {
      const payload = { userId: "12345" };
      jwt.sign.mockReturnValue("mockToken");

      const token = generateToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith(payload, mockJwtSecret, {
        expiresIn: mockJwtExpiresIn,
      });
      expect(token).toBe("mockToken");
    });
  });

  describe("hashPassword", () => {
    it("should hash a password correctly", async () => {
      const password = "password123";
      bcrypt.hash.mockResolvedValue("mockHashedPassword");

      const hashedPassword = await hashPassword(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
      expect(hashedPassword).toBe("mockHashedPassword");
    });
  });

  describe("comparePassword", () => {
    it("should compare passwords correctly and return true for a match", async () => {
      const password = "password123";
      const hashedPassword = "mockHashedPassword";
      bcrypt.compare.mockResolvedValue(true);

      const isMatch = await comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it("should return false for a password mismatch", async () => {
      const password = "password123";
      const hashedPassword = "mockHashedPassword";
      bcrypt.compare.mockResolvedValue(false);

      const isMatch = await comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(isMatch).toBe(false);
    });
  });

  describe("extractToken", () => {
    it("should extract a token from the authorization header", () => {
      const req = {
        headers: {
          authorization: "Bearer mockToken",
        },
      };

      const token = extractToken(req);

      expect(token).toBe("mockToken");
    });

    it("should extract a token from cookies if no authorization header", () => {
      const req = {
        headers: {},
        cookies: {
          token: "mockToken",
        },
      };

      const token = extractToken(req);

      expect(token).toBe("mockToken");
    });

    it("should return undefined if no token is found", () => {
      const req = {
        headers: {},
        cookies: {},
      };

      const token = extractToken(req);

      expect(token).toBeUndefined();
    });
  });

  describe("verifyTokenAndGetUser", () => {
    it("should verify the token and fetch the user", async () => {
      const mockToken = "mockToken";
      const mockDecoded = { userId: "12345" };
      const mockUser = { id: "12345", name: "Test User" };

      jwt.verify.mockReturnValue(mockDecoded);
      User.findById.mockResolvedValue(mockUser);

      const user = await verifyTokenAndGetUser(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockJwtSecret);
      expect(User.findById).toHaveBeenCalledWith(mockDecoded.userId);
      expect(user).toBe(mockUser);
    });

    it("should throw an error for an invalid token", async () => {
      const mockToken = "invalidToken";
      jwt.verify.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await expect(verifyTokenAndGetUser(mockToken)).rejects.toThrow(
        "Invalid token"
      );
    });

    it("should return null if no user is found", async () => {
      const mockToken = "mockToken";
      const mockDecoded = { userId: "12345" };

      jwt.verify.mockReturnValue(mockDecoded);
      User.findById.mockResolvedValue(null);

      const user = await verifyTokenAndGetUser(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockJwtSecret);
      expect(User.findById).toHaveBeenCalledWith(mockDecoded.userId);
      expect(user).toBeNull();
    });
  });
});
