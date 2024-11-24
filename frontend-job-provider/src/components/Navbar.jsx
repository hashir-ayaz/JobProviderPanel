import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  Info,
  Phone,
  LogIn,
  UserPlus,
  PlusCircle,
  User,
} from "lucide-react"; // Icon library
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { Button } from "@/components/ui/button"; // Custom button component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Dropdown menu components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Sheet (mobile menu) components
import logo from "@/assets/logo.png"; // Logo import
// import AuthContext from "../context/AuthContext"; // Context for auth state
import useAuth from "../hooks/useAuth.js";

export default function Navbar() {
  const { isLoggedIn, user } = useAuth(); // Access AuthContext
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname); // Track active path
  const navigate = useNavigate();
  console.log("isLoggedIn", isLoggedIn);
  console.log("user", user);
  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    window.location.reload(); // Reload to clear state and redirect
  };

  // Define navigation items
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contactus", icon: Phone },
  ];

  return (
    <header className="font-custom sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-5 ">
      <div className="container flex items-center mx-auto h-14">
        {/* Desktop Navbar */}
        <div className="hidden mr-4 md:flex">
          <Link to="/" className="flex items-center mr-6 space-x-2">
            <img src={logo} alt="Logo" className="h-auto w-36" />
            {/* <span className="hidden font-bold text-primary sm:inline-block">
              SkillConnect
            </span> */}
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  activePath === item.href
                    ? "text-foreground font-bold"
                    : "text-foreground/60"
                )}
                onClick={() => setActivePath(item.href)} // Update active path
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu (Sheet) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through our website with ease.
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center py-2 text-sm font-medium",
                    activePath === item.href
                      ? "text-foreground font-bold"
                      : "text-foreground/60"
                  )}
                  onClick={() => {
                    setActivePath(item.href); // Update active path
                    setIsMobileMenuOpen(false); // Close mobile menu
                  }}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Right Section: Authentication & User Actions */}
        <div className="flex items-center justify-between flex-1 space-x-2 md:justify-end">
          {/* Mobile Logo */}
          <div className="flex-1 w-full md:w-auto md:flex-none">
            <Link to="/" className="flex items-center mr-6 space-x-2 md:hidden">
              <img src={logo} alt="Logo" className="w-6 h-6" />
              <span className="font-bold">RehaishKiKhwaish</span>
            </Link>
          </div>

          <nav className="flex items-center">
            {/* If the user is NOT logged in */}
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="hidden font-bold text-black md:inline-flex"
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2 text-black " />
                    Log In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="hidden text-white rounded-full bg-primary md:inline-flex"
                >
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {/* If the user IS logged in */}
                <Button className="bg-primary hover:bg-primary-dark" asChild>
                  <Link to="/post-job">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Post Job
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative w-12 h-12 mx-2 border-2 border-solid rounded-full text-primary border-primary"
                    >
                      <User className="h-6 w-7" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
