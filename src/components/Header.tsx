import { useFlow } from "../context/FlowContext";
import { BALICLogo } from "../icons/Icons";

export function Header() {
  const { user, coins, openRewards } = useFlow();

  return (
    <header className="app-header">
      <div className="app-header__logo">
        <BALICLogo height={36} />
      </div>
      <div className="app-header__right">
        {user && (
          <span className="app-header__greeting">Hi, {user.name}</span>
        )}
        <button
          className="app-header__coins"
          onClick={openRewards}
          aria-label={`${coins} coins`}
        >
          <CoinPill /> <b>{coins}</b>
        </button>
      </div>
    </header>
  );
}

function CoinPill() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <defs>
        <linearGradient id="coin-pill-hdr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD95F" />
          <stop offset="100%" stopColor="#E2951B" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="9" r="8" fill="url(#coin-pill-hdr)" stroke="#B06816" strokeWidth="0.8" />
      <text x="9" y="12" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7a4710">₹</text>
    </svg>
  );
}
