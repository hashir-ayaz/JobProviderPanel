import { Button } from "@/components/ui/button"; // Custom button component
import HeroSectionImage from "../assets/hero-section.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-wrap items-center justify-between max-w-screen-xl px-5 py-10 mx-auto font-custom bg-background md:py-20"
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col items-start max-w-lg space-y-6"
      >
        <h1 className="text-4xl leading-tight font-custom font-extra-extrabold text-secondary sm:text-8xl">
          <strong>Bridging Talent with Opportunity</strong>
        </h1>
        <p className="text-2xl text-muted-foreground">
          Forget the old rules. You can have the best people. Right here. Right
          now.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button
            variant="primary"
            className="py-6 text-lg text-white rounded-full px-9 bg-primary hover:bg-primary-dark"
          >
            <Link to="/signup">Get Started</Link>{" "}
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="hidden md:flex"
      >
        <img
          src={HeroSectionImage}
          alt="Hero"
          className="w-full max-w-xl rounded-lg h-1/2"
        />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
