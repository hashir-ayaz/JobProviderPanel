import { Button } from "@/components/ui/button"; // Custom button component
import HeroSectionImage from "../assets/hero-section.png";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="flex items-center justify-between max-w-screen-xl px-5 py-10 mx-auto font-custom bg-background md:py-20">
      {/* Left Content */}
      <div className="flex flex-col items-start max-w-lg space-y-6">
        <h1 className="text-4xl leading-tight font-custom font-extra-extrabold text-secondary sm:text-8xl">
          <strong>Bridging Talent with Opportunity</strong>
        </h1>
        <p className="text-2xl text-muted-foreground">
          Forget the old rules. You can have the best people. Right here. Right
          now.
        </p>
        <Button
          variant="primary"
          className="py-6 text-lg text-white rounded-full px-9 bg-primary hover:bg-primary-dark"
        >
          <Link to="/signup">Get Started</Link>{" "}
        </Button>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex">
        <img
          src={HeroSectionImage}
          alt="Hero"
          className="w-full max-w-xl rounded-lg h-1/2"
        />
      </div>
    </section>
  );
};

export default HeroSection;
