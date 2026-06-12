import "./styles/global.css";
import "./styles/app.css";
import { FlowProvider, useFlow } from "./context/FlowContext";
import { Refer } from "./pages/Refer";
import { Rewards } from "./pages/Rewards";
import { CoinHistory } from "./pages/CoinHistory";

function Stage() {
  const { step, loading } = useFlow();

  if (loading) {
    return (
      <div className="app-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <p>Loading…</p>
      </div>
    );
  }

  // if (step === "error") {
  //   return (
  //     <div className="app-root" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 12 }}>
  //       <h1 style={{ fontSize: 20, fontWeight: 700 }}>Session Invalid</h1>
  //       <p style={{ color: "var(--text-500)" }}>Your login token is missing, invalid, or expired.</p>
  //     </div>
  //   );
  // }

  if (step === "rewards") return <Rewards />;
  if (step === "coin-history") return <CoinHistory />;
  return <Refer />;
}

export default function App() {
  return (
    <FlowProvider>
      <Stage />
    </FlowProvider>
  );
}
