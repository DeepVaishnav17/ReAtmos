import Home from "./Home";
import TopNav from "../../components/TopNav";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <TopNav />
      <Home />

    </div>
  );
};

export default DashboardLayout;
