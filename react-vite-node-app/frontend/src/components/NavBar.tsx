import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface User {
  userId: number;
  username: string;
  avatar?: string;
}

interface NavBarProps {
  logo?: string;
  navItems?: NavItem[];
  // user?: User | null;
  onMenuClick?: (item: NavItem) => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfile?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  logo = "GameHub",
  navItems = [
    { label: "Home", href: "/", isActive: true },
    { label: "BoardGame", href: "/board_game" },
    { label: "Games", href: "/games" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "About", href: "/about" },
  ],
  // user = null,
  onMenuClick,
  onLogin,
  onLogout,
  onProfile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(
    navItems.find((item) => item.isActive)?.label || navItems[0]?.label
  );

  const navigate = useNavigate();
  onMenuClick = (item: NavItem) => {
    navigate(`${item.href}`);
  };

  onLogin = () => {
    navigate("/auth");
  };
  if (user === null) {
    axios
      .get("/api/check-auth", { withCredentials: true })
      .then((response) => {
        console.log(response.data);

        if (response.data.isLoggedIn) {
          setUser(response.data.user);
          console.log(response.data.user);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error checking auth:", error);
      });
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-menu-container")) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: NavItem) => {
    setActiveItem(item.label);
    setIsMobileMenuOpen(false);
    if (onMenuClick) {
      onMenuClick(item);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : "not-scrolled"}`}>
        <div className="nav-container">
          {/* Logo */}
          <div
            className="nav-logo"
            onClick={() => handleItemClick({ label: "Home", href: "/" })}
          >
            {logo}
          </div>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                {/* <span
                  className={`nav-link ${
                    activeItem === item.label ? "active" : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                > */}
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </NavLink>
                {/* </span> */}
              </li>
            ))}
          </ul>

          {/* Connection Status & Auth */}
          <div className="nav-actions">
            <div className="connection-status">Connected</div>

            {user ? (
              <div className="user-menu-container">
                <div
                  className={`user-button ${isProfileMenuOpen ? "open" : ""}`}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="user-avatar">
                    {/* user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    ) */}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    {/* <div className="user-email">{user.email}</div> */}
                  </div>
                  <svg
                    className="chevron-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className={`user-dropdown ${isProfileMenuOpen ? "open" : ""}`}
                >
                  <div className="dropdown-item" onClick={onProfile}>
                    <svg
                      className="dropdown-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </div>
                  <div className="dropdown-item">
                    <svg
                      className="dropdown-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </div>
                  <div className="dropdown-item">
                    <svg
                      className="dropdown-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help
                  </div>
                  <div className="dropdown-item logout" onClick={onLogout}>
                    <svg
                      className="dropdown-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <button className="login-button" onClick={onLogin}>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`mobile-toggle ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <ul className="mobile-nav-menu">
              {navItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  <span
                    className={`mobile-nav-link ${
                      activeItem === item.label ? "active" : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
              <li className="mobile-nav-item">
                <div
                  className="connection-status"
                  style={{ margin: "1rem 0", justifySelf: "center" }}
                >
                  Connected
                </div>
              </li>
              <li className="mobile-nav-item">
                {user ? (
                  <div>
                    <div className="mobile-nav-link" onClick={onProfile}>
                      👤 Profile
                    </div>
                    <div
                      className="mobile-nav-link"
                      onClick={onLogout}
                      style={{ color: "#ff6b6b" }}
                    >
                      🚪 Logout
                    </div>
                  </div>
                ) : (
                  <div
                    className="mobile-nav-link"
                    onClick={onLogin}
                    style={{ color: "#00d4ff" }}
                  >
                    🔑 Login
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div style={{ height: "70px" }}></div>
    </>
  );
};

export default NavBar;
