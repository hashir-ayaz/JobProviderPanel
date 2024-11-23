const { extractToken, verifyTokenAndGetUser } = require("../utils/authUtils");

exports.protect = async (req, res, next) => {
  try {
    console.log("Protect middleware triggered");

    // Extract token from request
    const token = extractToken(req);
    console.log("Extracted token:", token);

    if (!token) {
      // If no token, treat the user as a guest
      console.log("No token provided. Setting user role to 'guest'.");
      req.user = { role: "guest" };
      return next(); // Allow the request to proceed as a guest
    }

    // Verify token and get user
    const user = await verifyTokenAndGetUser(token);
    console.log("Verified user:", user);

    // If no user found, return an error
    if (!user) {
      console.error("User not found for provided token");
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object and continue
    req.user = user;
    console.log("User attached to request:", req.user);
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports.adminProtect = async (req, res, next) => {
  try {
    console.log("AdminProtect middleware triggered");

    // Extract token from request
    const token = extractToken(req);
    console.log("Extracted token:", token);

    // If no token, return an error
    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ message: "Not authorized" });
    }

    // Verify token and get user
    const user = await verifyTokenAndGetUser(token);
    console.log("Verified user:", user);

    // If no user found, return an error
    if (!user) {
      console.error("User not found for provided token");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      console.warn("Access denied: User is not an admin");
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Attach user to request object and continue
    req.user = user;
    console.log("Admin user attached to request:", req.user);
    next();
  } catch (error) {
    console.error("Error in adminProtect middleware:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
