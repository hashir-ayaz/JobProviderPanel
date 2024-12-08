const Footer = () => {
  return (
    <footer className="text-white rounded-t-xl bg-secondary font-custom">
      <div className="container px-5 py-10 mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: For Clients */}
          <div>
            <h3 className="mb-4 text-lg font-bold">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  How to Hire
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Talent Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Project Catalog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Talent Scout
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hire an Agency
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Payroll Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Direct Contracts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hire Worldwide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hire in the USA
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: For Talents */}
          <div>
            <h3 className="mb-4 text-lg font-bold">For Talents</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  How to Find Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Direct Contracts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find Freelance Jobs Worldwide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find Freelance Jobs in the USA
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Upwork Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Free Business Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trust, Safety, and Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Modern Slavery Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Social Links */}
          <div className="flex mb-4 space-x-4 md:mb-0">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-400">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          {/* Legal Links */}
          <div className="space-y-1 text-sm text-gray-400 md:space-y-0 md:space-x-4">
            <span>© 2015 - 2023 Upwork® Global Inc.</span>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              CA Notice at Collection
            </a>
            <a href="#" className="hover:underline">
              Cookie Settings
            </a>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
