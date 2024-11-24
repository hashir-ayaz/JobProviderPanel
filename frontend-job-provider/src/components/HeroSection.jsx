import { Button } from "@/components/ui/button"; // Custom button component
import HeroSectionImage from "../assets/hero-section.png";
const HeroSection = () => {
  return (
    <section className="flex items-center justify-between max-w-screen-xl px-5 py-10 mx-auto font-custom bg-background md:py-20">
      {/* Left Content */}
      <div className="flex flex-col items-start max-w-lg space-y-6">
        <h1 className="text-4xl leading-tight font-custom font-extra-extrabold text-accent sm:text-5xl">
          <strong>Bridging Talent with Opportunity</strong>
        </h1>
        <p className="text-lg text-muted-foreground">
          Forget the old rules. You can have the best people. Right here. Right
          now.
        </p>
        <Button
          variant="primary"
          className="px-6 py-3 text-lg text-white rounded-full bg-primary"
        >
          Get Started
        </Button>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex">
        <img
          src={HeroSectionImage}
          alt="Hero"
          className="w-full max-w-md rounded-lg h-1/2"
        />
      </div>
    </section>
  );
};

export default HeroSection;