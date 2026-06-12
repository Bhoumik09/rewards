import { useState } from "react";
import { Header } from "../components/Header";
import { useFlow } from "../context/FlowContext";
import { redeemVoucher, type Voucher } from "../api";
import { IconBack, IconChevron } from "../icons/Icons";

export function Rewards() {
  const { openRefer, coins, vouchers, openCoinHistory, setCoins } = useFlow();

  const [modal, setModal] = useState<Voucher | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState<{ code: string; expiry: string } | null>(null);

  const handleRedeem = async (voucher: Voucher) => {
    if (coins < voucher.coin_cost) return;
    setRedeeming(true);
    try {
      const result = await redeemVoucher(voucher.id);
      setCoins((c) => c - voucher.coin_cost);
      setRedeemed({ code: result.voucher_code, expiry: result.expiry });
    } catch {
      setRedeemed(null);
    } finally {
      setRedeeming(false);
    }
  };

  const closeModal = () => {
    setModal(null);
    setRedeemed(null);
  };

  return (
    <div className="app-root">
      <Header />

      <div className="rewards-page__topbar">
        <button className="icon-btn" onClick={openRefer} aria-label="Back">
          <IconBack width={20} height={20} />
        </button>
        <h1>Rewards</h1>
      </div>

      {/* Coin balance */}
      <section className="rewards-balance">
        <div className="rewards-balance__label">Your Current Balance</div>
        <div className="rewards-balance__value">
          <CoinBadge />
          <span>{coins}</span>
          <small>coins</small>
        </div>
        <button className="rewards-balance__history" type="button" onClick={openCoinHistory}>
          <span>Coin History</span>
          <IconChevron width={18} height={18} style={{ transform: "rotate(-90deg)" }} />
        </button>
      </section>

      {/* Voucher list */}
      <section className="rewards-section">
        <h2>Redeem Vouchers</h2>
        {vouchers.length === 0 ? (
          <p style={{ color: "var(--text-500)", padding: 16 }}>No vouchers available right now.</p>
        ) : (
          <div className="voucher-grid">
            {vouchers.map((v) => (
              <VoucherCard
                key={v.id}
                voucher={v}
                canAfford={coins >= v.coin_cost}
                onRedeem={() => setModal(v)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Confirm / result modal */}
      {modal && (
        <div className="consent-backdrop" role="dialog" aria-modal="true">
          <div className="redeem-modal">
            {redeemed ? (
              <>
                <h3>Voucher Redeemed!</h3>
                <p className="redeem-modal__code">Code: <b>{redeemed.code}</b></p>
                <p className="redeem-modal__expiry">Expires: {redeemed.expiry}</p>
                <button className="btn btn--primary" onClick={closeModal}>Done</button>
              </>
            ) : (
              <>
                <h3>Confirm Redemption</h3>
                <p>Redeem <b>{modal.name}</b> for <b>{modal.coin_cost} coins</b>?</p>
                {coins < modal.coin_cost && (
                  <p style={{ color: "var(--orange-500)", fontSize: 13, marginTop: 4 }}>
                    Insufficient balance.
                  </p>
                )}
                <div className="redeem-modal__actions">
                  <button className="btn btn--outline-purple" onClick={closeModal}>Cancel</button>
                  <button
                    className="btn btn--primary"
                    disabled={redeeming || coins < modal.coin_cost}
                    onClick={() => handleRedeem(modal)}
                  >
                    {redeeming ? "Redeeming…" : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function VoucherCard({
  voucher,
  canAfford,
  onRedeem,
}: {
  voucher: Voucher;
  canAfford: boolean;
  onRedeem: () => void;
}) {
  return (
    <article className="voucher-card">
      <span className="voucher-card__badge">Expires: {voucher.expiry}</span>
      <h3>{voucher.name}</h3>
      <div className="voucher-card__cost">{voucher.coin_cost} coins</div>
      <button
        className="voucher-card__cta"
        type="button"
        disabled={!canAfford}
        onClick={onRedeem}
      >
        Redeem Now
        <IconChevron width={14} height={14} style={{ transform: "rotate(-90deg)" }} />
      </button>
    </article>
  );
}

function CoinBadge() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id="coin-bg-lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD95F" />
          <stop offset="100%" stopColor="#E2951B" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#coin-bg-lg)" stroke="#B06816" strokeWidth="1.5" />
      <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="800" fill="#7a4710">₹</text>
    </svg>
  );
}
