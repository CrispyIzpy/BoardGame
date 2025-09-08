import React, { useState, useEffect } from "react";
import {
  Users,
  Crown,
  Clock,
  Zap,
  Settings,
  Play,
  Target,
  Trophy,
  Globe,
  UserCheck,
  Gamepad2,
} from "lucide-react";
import "../styles/BoardGameMatchmake.css";
import axios from "axios";

const BoardGameMatchmake = () => {
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [queueTime, setQueueTime] = useState(0);
  const [playersInQueue, setPlayersInQueue] = useState(12);

  useEffect(() => {
    let interval;
    if (isMatchmaking) {
      interval = setInterval(() => {
        setQueueTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMatchmaking]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMatchmake = () => {
    setPlayersInQueue(1);

    axios
      .post(
        "/api/MatchMaking",
        // { Data },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching tiles:", error);
      });

    if (isMatchmaking) {
      setIsMatchmaking(false);
      setQueueTime(0);
    } else {
      setIsMatchmaking(true);
    }
  };

  const gameSettings = [
    { label: "Map Size", value: "Standard" },
    { label: "Victory Points", value: "10" },
    { label: "Trade Rules", value: "Standard" },
    { label: "Timer", value: "90s per turn" },
  ];

  const recentStats = [
    { label: "Games Played", value: "47", color: "cyan" },
    { label: "Win Rate", value: "68%", color: "green" },
    { label: "Current Rank", value: "Gold III", color: "warning" },
    { label: "Best Streak", value: "8 wins", color: "purple" },
  ];

  return (
    <div className="matchmaking-page">
      {/* Animated Background */}
      <div className="homepage-background">
        <div className="background-base" />
        <div className="background-animated" />

        {/* Floating Hexagons */}
        <div className="floating-hexagons">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`hex-float hex-float-${i + 1}`}>
              <div className="hexagon-shape" />
            </div>
          ))}
        </div>
      </div>

      <div className="matchmaking-container">
        {/* Header Section */}

        <div className="matchmaking-content">
          {/* Main Matchmaking Card */}
          <div className="matchmaking-card">
            <div className="card-header">
              <h2 className="cyan-blue-gradient-text">Find Match</h2>
              <div className="queue-info">
                <Users className="icon-small" />
                <span>{playersInQueue} players in queue</span>
              </div>
            </div>

            <div className="matchmaking-section">
              {isMatchmaking ? (
                <div className="matchmaking-active">
                  <div className="searching-animation">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring pulse-ring-delay-1"></div>
                    <div className="pulse-ring pulse-ring-delay-2"></div>
                    <Gamepad2 className="search-icon" />
                  </div>
                  <h3 className="search-title">Searching for Players...</h3>
                  <p className="search-subtitle">
                    Finding the perfect match for you
                  </p>
                  <div className="queue-timer">
                    <Clock className="icon-small" />
                    <span>Queue Time: {formatTime(queueTime)}</span>
                  </div>
                </div>
              ) : (
                <div className="matchmaking-ready">
                  <div className="ready-icon emerald-teal-gradient">
                    <Play className="icon-large" />
                  </div>
                  <h3 className="ready-title">Ready to Play</h3>
                  <p className="ready-subtitle">
                    Join a competitive match with players of similar skill
                  </p>
                </div>
              )}

              <button
                className={`matchmaking-btn ${
                  isMatchmaking ? "btn-cancel" : "btn-primary"
                } group`}
                onClick={handleMatchmake}
              >
                {isMatchmaking ? (
                  <>
                    <span>Cancel Search</span>
                  </>
                ) : (
                  <>
                    <Play className="icon-small group-hover-scale" />
                    <span>Start Matchmaking</span>
                    <Zap className="icon-small group-hover-scale" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Side Content */}
          <div className="side-content">
            {/* Game Settings */}
            <div className="settings-card">
              <div className="card-header-small">
                <Settings className="icon-small" />
                <h3>Match Settings</h3>
              </div>
              <div className="settings-list">
                {gameSettings.map((setting, index) => (
                  <div key={index} className="setting-item">
                    <span className="setting-label">{setting.label}</span>
                    <span className="setting-value">{setting.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Stats */}
            <div className="stats-card">
              <div className="card-header-small">
                <Trophy className="icon-small" />
                <h3>Your Stats</h3>
              </div>
              <div className="stats-grid">
                {recentStats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className={`stat-number ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="actions-card">
              <div className="card-header-small">
                <Target className="icon-small" />
                <h3>Quick Actions</h3>
              </div>
              <div className="action-buttons">
                <button className="action-btn">
                  <Globe className="icon-small" />
                  <span>Browse Lobbies</span>
                </button>
                <button className="action-btn">
                  <UserCheck className="icon-small" />
                  <span>Invite Friends</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardGameMatchmake;
