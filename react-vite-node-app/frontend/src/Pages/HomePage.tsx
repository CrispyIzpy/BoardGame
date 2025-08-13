import React, { useState, useEffect } from "react";
import {
  Play,
  Users,
  Trophy,
  Dice6,
  Crown,
  Star,
  ArrowRight,
  Gamepad2,
  Target,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const buttonLink = (buttonLocation: string | undefined) => {
    if (buttonLocation != undefined) navigate(buttonLocation);
  };

  const games = [
    {
      name: "Settlers Arena",
      description:
        "Build, trade, and conquer in our enhanced Catan-style experience",
      players: "3-4 Players",
      time: "60-90 min",
      difficulty: "Medium",
      status: "Available Now",
      gradientClass: "emerald-teal-gradient",
      icon: <Crown className="icon-medium" />,
      href: "board_game",
    },
    {
      name: "Trade Empire",
      description: "Master resource management and strategic trading",
      players: "2-6 Players",
      time: "45-75 min",
      difficulty: "Easy",
      status: "Coming Soon",
      gradientClass: "blue-cyan-gradient",
      icon: <Target className="icon-medium" />,
      href: "",
    },
    {
      name: "Hex Dominion",
      description: "Tactical hex-based strategy with dynamic board generation",
      players: "2-4 Players",
      time: "90-120 min",
      difficulty: "Hard",
      status: "In Development",
      gradientClass: "purple-pink-gradient",
      icon: <Zap className="icon-medium" />,
      href: "",
    },
  ];

  const features = [
    {
      icon: <Users className="icon-large" />,
      title: "Multiplayer Gaming",
      description: "Play with friends online or challenge players worldwide",
    },
    {
      icon: <Trophy className="icon-large" />,
      title: "Ranking System",
      description: "Climb the leaderboards and earn achievements",
    },
    {
      icon: <Dice6 className="icon-large" />,
      title: "Fair Random",
      description: "Cryptographically secure randomization for fair gameplay",
    },
  ];

  return (
    <div className="homepage">
      {/* Animated Background */}
      <div className="homepage-background">
        <div className="background-base" />
        <div className="background-animated" />

        {/* Floating Hexagons */}
        <div className="floating-hexagons">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`hex-float hex-float-${i + 1}`}>
              <div className="hexagon-shape" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div
            className="hero-content"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <h1 className="hero-title">
              Board Games
              <br />
              <span className="hero-subtitle">Reimagined</span>
            </h1>

            <p className="hero-description">
              Experience classic strategy games with modern multiplayer
              features, stunning visuals, and competitive play
            </p>

            <div className="hero-buttons">
              <button
                className="btn-primary group"
                data-link="/board_game"
                onClick={(e) => buttonLink(e.currentTarget.dataset.link)}
              >
                <Play className="icon-small group-hover-scale" />
                Start Playing
                <ArrowRight className="icon-small group-hover-translate" />
              </button>

              <button
                className="btn-secondary"
                data-link="/about"
                onClick={(e) => buttonLink(e.currentTarget.dataset.link)}
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number cyan">1,247</div>
                <div className="stat-label">Active Players</div>
              </div>
              <div className="stat-item">
                <div className="stat-number green">892</div>
                <div className="stat-label">Games Played Today</div>
              </div>
              <div className="stat-item">
                <div className="stat-number purple">3</div>
                <div className="stat-label">Game Modes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-indicator-container">
            <div className="scroll-indicator-dot" />
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="games-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title cyan-blue-gradient-text">
              Choose Your Adventure
            </h2>
            <p className="section-description">
              From classic strategy to innovative new mechanics, find your
              perfect game
            </p>
          </div>

          <div className="games-grid">
            {games.map((game, index) => (
              <div key={index} className="game-card group">
                <a className="game-link" href={game.href}>
                  <div className="game-card-background" />
                  <div className="game-card-content">
                    <div className={`game-icon ${game.gradientClass}`}>
                      {game.icon}
                    </div>

                    <h3 className="game-title">{game.name}</h3>
                    <p className="game-description">{game.description}</p>

                    <div className="game-details">
                      <div className="game-detail-row">
                        <span className="detail-label">Players:</span>
                        <span className="detail-value">{game.players}</span>
                      </div>
                      <div className="game-detail-row">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{game.time}</span>
                      </div>
                      <div className="game-detail-row">
                        <span className="detail-label">Difficulty:</span>
                        <span className="detail-value">{game.difficulty}</span>
                      </div>
                    </div>

                    <div className="game-footer">
                      <span
                        className={`status-badge ${
                          game.status === "Available Now"
                            ? "status-available"
                            : game.status === "Coming Soon"
                            ? "status-coming"
                            : "status-development"
                        }`}
                      >
                        {game.status}
                      </span>

                      <button
                        className={`game-play-btn ${
                          game.status === "Available Now"
                            ? "play-btn-active"
                            : "play-btn-disabled"
                        }`}
                        disabled={game.status !== "Available Now"}
                      >
                        <Gamepad2 className="icon-small" />
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title purple-pink-gradient-text">
              Built for Gamers
            </h2>
            <p className="section-description">
              Every feature designed to enhance your strategic gaming experience
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="feature-icon purple-pink-gradient group-hover-scale">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Play?</h2>
            <p className="cta-description">
              Join thousands of players in strategic battles. Create your
              account and start your journey today.
            </p>

            <div className="cta-buttons">
              <button className="btn-primary group">
                <Star className="icon-small group-hover-scale" />
                Create Free Account
              </button>

              <button className="btn-secondary">Play as Guest</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
