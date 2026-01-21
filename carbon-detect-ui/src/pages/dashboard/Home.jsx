import { useEffect, useState } from "react";
import { getDashboardHome } from "../../services/dashboardService";
import PrismBackground from "../../components/PrismBackground";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDashboardHome();
        setData(res);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading)
    return (
      <p style={{ padding: 20, color: "white" }}>Loading dashboard…</p>
    );

  return (
    <div className="home-container">
      <PrismBackground />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Track your <span className="gradient-text">carbon footprint</span>
            </h1>
            <p className="hero-subtitle">
              Make informed decisions about your environmental impact and join
              thousands reducing emissions globally.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary">Start Tracking</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-icon">📊</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Your Impact</div>
            <div className="stat-value">
              {data?.totalEmissionsReduced || "0"} kg CO₂
            </div>
            <div className="stat-sublabel">Reduced</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Carbon Coins</div>
            <div className="stat-value">{data?.carbonCoins || "0"}</div>
            <div className="stat-sublabel">Earned</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Greeting</div>
            <div className="stat-value" style={{ fontSize: "14px" }}>
              {data?.greeting || "Welcome"}
            </div>
            <div className="stat-sublabel">Today</div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features-section">
        <h2 className="section-title">How it works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Track Activities</h3>
            <p>Log your daily activities and see their environmental impact</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💚</div>
            <h3>Earn Rewards</h3>
            <p>Collect carbon coins and unlock sustainable rewards</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Make Impact</h3>
            <p>Join a global community reducing emissions together</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
