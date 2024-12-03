const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // Import the User model
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // From Google Cloud Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback", // Redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user data from the profile
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const firstName =
          profile.name.givenName || profile.displayName.split(" ")[0];
        const lastName =
          profile.name.familyName ||
          profile.displayName.split(" ").slice(1).join(" ");
        const profilePicture = profile.photos[0]?.value || null;

        // Check if the user already exists in the database
        let user = await User.findOne({ email });

        if (user) {
          // Update existing user with Google profile data (optional)
          user.profilePicture = profilePicture || user.profilePicture;
          user.updatedAt = Date.now();
          await user.save();
        } else {
          // Create a new user if none exists
          user = new User({
            firstName,
            lastName,
            email,
            password: "google-auth", // Set a placeholder password for now
            role: "client", // Default role; modify if necessary
            profilePicture,
          });

          await user.save();
        }

        // Pass user data to the next middleware
        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
