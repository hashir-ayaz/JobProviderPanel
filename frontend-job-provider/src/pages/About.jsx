import { motion } from "framer-motion";
import { FaCode, FaUsers, FaLightbulb } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-custom">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 bg-white"
      >
        <div className="container mx-auto text-center">
          <h1 className="mt-16 text-6xl font-bold text-secondary">
            ABOUT <span className="text-primary">US</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Turning an Idea into a Functional Reality
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container px-4 mx-auto my-12 leading-relaxed lg:px-8 text-dark"
      >
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-3xl font-bold text-secondary">
            Meet the Team Behind{" "}
            <span className="text-primary">SkillConnect</span>
          </h2>
          <p className="mb-4 text-lg">
            SkillConnect is not just another freelancing panel; it’s a result of
            collaboration, creativity, and a lot of debugging. This platform was
            developed as part of our final project for the Web Engineering
            course, bringing together the talents of three classmates from SE-F.
          </p>
          <div className="flex flex-wrap gap-6 mt-6 justify-evenly">
            {/* Developer 1 */}
            <div className="flex items-center gap-4">
              <FaCode className="text-3xl text-primary" />
              <div>
                <h3 className="text-lg font-bold text-secondary">
                  Maham Imran
                </h3>
                <p className="text-sm text-gray-600">
                  Developer of the Freelancer Panel
                </p>
              </div>
            </div>

            {/* Developer 3 */}
            <div className="flex items-center gap-4">
              <FaLightbulb className="text-3xl text-primary" />
              <div>
                <h3 className="text-lg font-bold text-secondary">
                  Hashir Ayaz
                </h3>
                <p className="text-sm text-gray-600">
                  Developer of the Job Provider Panel
                </p>
              </div>
            </div>

            {/* Developer 2 */}
            <div className="flex items-center gap-4">
              <FaUsers className="text-3xl text-primary" />
              <div>
                <h3 className="text-lg font-bold text-secondary">
                  Fatima Wajahat
                </h3>
                <p className="text-sm text-gray-600">
                  Developer of the Admin Panel
                </p>
              </div>
            </div>
          </div>

          <h2 className="mt-12 mb-6 text-3xl font-bold text-secondary">
            Our Story 🌟
          </h2>
          <p className="mb-4 text-lg">
            SkillConnect was born out of necessity. With a tight deadline
            looming over us, we didn’t have the luxury to overthink. It was a
            classic case of "do or die (your grades)." From brainstorming in
            class to debugging late at night, we managed to bring this platform
            to life. Yes, there were bugs. Yes, we lost sleep. But somehow, it
            all came together.
          </p>

          <h2 className="mt-12 mb-6 text-3xl font-bold text-secondary">
            Why SkillConnect? 🤔
          </h2>
          <ul className="pl-6 text-lg list-disc">
            <li className="mb-2">
              Built by students who know the hustle, for professionals who live
              it.
            </li>
            <li className="mb-2">
              A user-friendly interface that doesn’t require a Ph.D. in
              freelancing.
            </li>
            <li className="mb-2">
              Three dedicated developers who have personally tested its
              reliability (trust us, we clicked a lot of buttons).
            </li>
          </ul>

          <h2 className="mt-12 mb-6 text-3xl font-bold text-secondary">
            Our Mission 🚀
          </h2>
          <p className="mb-4 text-lg">
            To create a platform that bridges the gap between opportunity and
            talent, empowering freelancers and job providers alike. And if we
            can make you smile while you navigate through our panels, well,
            that’s just a bonus.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
