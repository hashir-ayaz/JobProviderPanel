import { Star } from "lucide-react"; // Icon library
import guyPic from "../assets/why-skillconnect-man.png";

const WhySkillConnect = () => {
  return (
    <section className="relative flex flex-col items-center justify-between h-full max-w-screen-xl px-5 py-10 mx-auto space-y-10 bg-white md:flex-row md:space-y-0">
      {/* Left Section */}
      <div className="relative z-10 flex-1 p-6 space-y-6 rounded-lg bg-blue-50">
        <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
          WHY TURN TO SKILLCONNECT?
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start space-x-4">
            <span className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-secondary">
              ✦
            </span>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Proof of quality
              </h3>
              <p className="text-md text-muted-foreground">
                Check any pro’s work samples, client reviews, and identity
                verification.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <span className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-secondary">
              ✦
            </span>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                No cost until you hire
              </h3>
              <p className="text-md text-muted-foreground">
                Interview potential fits for your job, negotiate rates, and only
                pay for work you approve.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <span className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-secondary">
              ✦
            </span>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Safe and secure
              </h3>
              <p className="text-md text-muted-foreground">
                Focus on your work knowing we help protect your data and
                privacy. We’re here with 24/7 support if you need it.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Background Image */}
      <img
        src={guyPic}
        alt="Illustration"
        className="absolute top-0 right-96 w-[200px] md:w-[300px] opacity-10 md:opacity-100 md:-translate-y-10 z-10"
      />

      {/* Right Section */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4 text-white rounded-lg shadow-lg bg-primary md:w-1/3">
        <h3 className="text-4xl font-bold">
          We’re the world’s work marketplace
        </h3>
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-yellow-400" />
          <span className="text-lg font-semibold">4.9/5</span>
        </div>
        <p className="text-sm text-blue-200">
          Clients rate professionals on SkillConnect
        </p>
        <div className="mt-4">
          <p className="text-lg font-bold">Award winner</p>
          <p className="text-sm text-blue-200">
            G2’s 2021 Best Software Awards
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhySkillConnect;
