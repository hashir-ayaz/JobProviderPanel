import CategorySection from "../components/CategorySection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import WhySkillConnect from "../components/WhySkillConnect";
// import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="font-custom">
      <HeroSection />
      <CategorySection />
      <WhySkillConnect />
    </div>
  );
};

export default LandingPage;
