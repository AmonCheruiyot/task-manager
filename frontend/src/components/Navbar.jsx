import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar({ setPage, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page) => {
    setPage(page);
    setIsOpen(false); // Close menu on mobile after navigation
  };

  const menuItems = [
    { name: "Home", page: "home" },
    { name: "Dashboard", page: "dashboard" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        {/* Logo / Brand */}
        <h1
          className="text-2xl md:text-3xl font-bold cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => handleNavClick("home")}
        >
          TaskSprint
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`relative pb-1 hover:text-blue-200 transition-colors duration-300
                ${currentPage === item.page ? "font-semibold text-blue-100" : ""}`}
            >
              {item.name}
              {currentPage === item.page && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            {isOpen ? (
              <AiOutlineClose className="text-2xl" />
            ) : (
              <AiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (collapsible) */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all ease-out duration-300 ${
          isOpen ? "max-h-60 opacity-100 py-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-blue-700 mx-4 rounded-lg p-4 flex flex-col space-y-4 shadow-inner">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`block text-left px-4 py-2 rounded transition-colors duration-300
                ${currentPage === item.page ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
