import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useFlow } from "../context/FlowContext";
import { fetchCoinHistory, type CoinHistoryEntry } from "../api";
import { IconBack } from "../icons/Icons";

export function CoinHistory() {
  const { openRewards, coins } = useFlow();
  const [entries, setEntries] = useState<CoinHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoinHistory()
      .then(setEntries)
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-root">
      <Header />

      <div className="rewards-page__topbar">
        <button className="icon-btn" onClick={openRewards} aria-label="Back">
          <IconBack width={20} height={20} />
        </button>
        <h1>Coin History</h1>
      </div>

      <section className="coin-history">
        <div className="coin-history__summary">
          <div className="coin-history__summary-item coin-history__summary-item--balance">
            <span>Current balance</span>
            <b>{coins}</b>
          </div>
        </div>

        {loading ? (
          <p style={{ padding: 24, color: "var(--text-500)" }}>Loading history…</p>
        ) : entries.length === 0 ? (
          <p style={{ padding: 24, color: "var(--text-500)" }}>No transactions yet.</p>
        ) : (
          <ul className="coin-history__list">
            {entries.map((e) => {
              const isEarn = e.amount > 0;
              return (
                <li key={e.id} className="coin-history__row">
                  <div className={`coin-history__icon coin-history__icon--${isEarn ? "earn" : "spend"}`} aria-hidden>
                    {isEarn ? "+" : "−"}
                  </div>
                  <div className="coin-history__body">
                    <div className="coin-history__title">{e.description}</div>
                  </div>
                  <div className="coin-history__meta">
                    <div className={`coin-history__amount coin-history__amount--${isEarn ? "earn" : "spend"}`}>
                      {isEarn ? "+" : "−"}{Math.abs(e.amount)}
                    </div>
                    <div className="coin-history__date">{e.date}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
