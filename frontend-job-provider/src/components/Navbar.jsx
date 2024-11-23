import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Home,
  Info,
  Phone,
  LogIn,
  UserPlus,
  PlusCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../assets/placeholder.png";

import { AuthContext } from "../context/useAuth.js";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contactus", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-14">
        <div className="hidden mr-4 md:flex">
          <Link to="/" className="flex items-center mr-6 space-x-2">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <span className="hidden font-bold text-red-500 sm:inline-block ">
              RehaishKiKhwaish
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
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
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center justify-between flex-1 space-x-2 md:justify-end">
          <div className="flex-1 w-full md:w-auto md:flex-none">
            <Link to="/" className="flex items-center mr-6 space-x-2 md:hidden">
              <img
                src="../assets/placeholder.png"
                alt="Logo"
                className="w-6 h-6"
              />
              <span className="font-bold">RehaishKiKhwaish</span>
            </Link>
          </div>
          <nav className="flex items-center">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="hidden text-red-500 md:inline-flex"
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Log In
                  </Link>
                </Button>
                <Button asChild className="hidden text-red-500 md:inline-flex">
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link to="/addListing">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Listing
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative w-8 h-8 rounded-full"
                    >
                      <User className="w-4 h-4" />
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
