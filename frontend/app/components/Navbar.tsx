"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, User, Heart, LogOut } from "lucide-react";
import { useUserStore } from "../userStore/user";

function Navbar() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  // Guard function: Haddii uusan login ahayn, toos u dir /login
  const handleProtectedNavigation = (e: React.MouseEvent, href: string) => {
    if (!user) {
      e.preventDefault(); // Ka baajinaya in uu boggaas directly u gudbo
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              StoreX
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Raadi shaatiyo, saacado, dhar..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
            <Search className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
          </div>

          {/* Navigation Links - Dhammaan way muuqanayaan marka hore */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>

            <Link
              href="/products"
              onClick={(e) => handleProtectedNavigation(e, "/products")}
              className="hover:text-indigo-600 transition-colors"
            >
              Products
            </Link>

            <Link
              href="/kinds"
              onClick={(e) => handleProtectedNavigation(e, "/kinds")}
              className="hover:text-indigo-600 transition-colors"
            >
              Kinds
            </Link>

            <Link href="/contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all relative">
              <Heart className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              onClick={(e) => handleProtectedNavigation(e, "/cart")}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

            {!user ? (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-indigo-100 hover:shadow-lg transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 hidden md:inline">
                  {user.firstName} {user.lastName}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;