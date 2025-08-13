import React, { useState, useEffect } from "react";
import {
  Users,
  Target,
  Zap,
  Heart,
  Shield,
  Globe,
  Star,
  Code,
  Gamepad2,
  Crown,
} from "lucide-react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const values = [
    {
      icon: <Heart className="icon-large" />,
      title: "Community First",
      description:
        "Building connections through strategic gameplay and fostering a welcoming environment for all players.",
    },
    {
      icon: <Shield className="icon-large" />,
      title: "Fair Play",
      description:
        "Ensuring every game is balanced with secure randomization and anti-cheat measures.",
    },
    {
      icon: <Zap className="icon-large" />,
      title: "Innovation",
      description:
        "Continuously improving the digital board game experience with cutting-edge technology.",
    },
    {
      icon: <Globe className="icon-large" />,
      title: "Accessibility",
      description:
        "Making strategic gaming accessible to players worldwide, regardless of location or experience.",
    },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & Game Designer",
      description:
        "Passionate about bringing classic board games to the digital world with 10+ years in game development.",
      avatar: "AC",
      gradient: "cyan-blue-gradient",
    },
    {
      name: "Sarah Williams",
      role: "Lead Developer",
      description:
        "Full-stack engineer specializing in real-time multiplayer systems and user experience.",
      avatar: "SW",
      gradient: "purple-pink-gradient",
    },
    {
      name: "Marcus Rodriguez",
      role: "Community Manager",
      description:
        "Building and nurturing our gaming community while ensuring fair play and positive experiences.",
      avatar: "MR",
      gradient: "emerald-teal-gradient",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Beginning",
      description:
        "Started development with a vision to revolutionize online board gaming.",
      icon: <Star className="icon-medium" />,
    },
    {
      year: "2024",
      title: "First Game Launch",
      description:
        "Successfully launched Settlers Arena with multiplayer capabilities.",
      icon: <Crown className="icon-medium" />,
    },
    {
      year: "2024",
      title: "1000+ Players",
      description:
        "Reached our first major milestone of active community members.",
      icon: <Users className="icon-medium" />,
    },
    {
      year: "2025",
      title: "Platform Expansion",
      description: "Adding new games and features based on community feedback.",
      icon: <Gamepad2 className="icon-medium" />,
    },
  ];

  const stats = [
    { number: "1,247", label: "Active Players", color: "cyan" },
    { number: "15,000+", label: "Games Played", color: "green" },
    { number: "98%", label: "Player Satisfaction", color: "purple" },
    { number: "24/7", label: "Server Uptime", color: "yellow" },
  ];

  return (
    <div className="about-page">
      {/* Background */}
      <div className="about-background">
        <div className="background-base" />
        <div className="background-animated" />

        {/* Floating Shapes */}
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}>
              <div className="shape-inner" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <div
            className="hero-content"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="about-title">
              About Our
              <br />
              <span className="title-accent">Gaming Platform</span>
            </h1>

            <p className="about-description">
              We're passionate developers and gamers on a mission to bring the
              strategic depth and social connection of board games into the
              digital age, creating experiences that bring people together from
              around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title cyan-blue-gradient-text">
                Our Mission
              </h2>
              <p className="mission-description">
                To create the ultimate digital board gaming experience that
                preserves the strategic depth and social interaction of classic
                games while leveraging modern technology to connect players
                globally. We believe that great games bring people together,
                foster critical thinking, and create lasting memories.
              </p>

              <div className="mission-highlights">
                <div className="highlight-item">
                  <Target className="highlight-icon" />
                  <span>Strategic Gaming Excellence</span>
                </div>
                <div className="highlight-item">
                  <Users className="highlight-icon" />
                  <span>Global Community Building</span>
                </div>
                <div className="highlight-item">
                  <Code className="highlight-icon" />
                  <span>Cutting-Edge Technology</span>
                </div>
              </div>
            </div>

            <div className="mission-visual">
              <div className="hexagon-cluster">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`hex-piece hex-piece-${i + 1}`}>
                    <div className="hex-inner" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title purple-pink-gradient-text">
              Our Values
            </h2>
            <p className="section-description">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card group">
                <div className="value-icon purple-pink-gradient group-hover-scale">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className={`stat-number ${stat.color}`}>{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title emerald-teal-gradient-text">
              Meet the Team
            </h2>
            <p className="section-description">
              The passionate people behind your gaming experience
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card group">
                <div className="team-card-inner">
                  <div className={`team-avatar ${member.gradient}`}>
                    {member.avatar}
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title yellow-orange-gradient-text">
              Our Journey
            </h2>
            <p className="section-description">
              Key milestones in our mission to revolutionize board gaming
            </p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon">{milestone.icon}</div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <h2 className="cta-title">Join Our Community</h2>
            <p className="cta-description">
              Be part of the future of strategic gaming. Connect with players
              worldwide and experience board games like never before.
            </p>

            <div className="cta-buttons">
              <button className="btn-primary group">
                <Gamepad2 className="icon-small group-hover-scale" />
                Start Playing Now
              </button>

              <button className="btn-secondary">
                <Users className="icon-small" />
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
