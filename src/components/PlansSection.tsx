import { PLANS, type Plan } from "../data/plans";
import { IconCheck } from "../icons/Icons";

const BALIC_BASE_URL = "https://www.bajajallianz.com/health-insurance";

export function PlansSection() {
  return (
    <section className="plans">
      <div className="plans__inner">
        <div className="plans__head">
          <h2 className="plans__title">
            Buy a plan, <b>earn coins</b>
          </h2>
          <p className="plans__sub">
            Pick a plan that fits you — bonus health-coins drop into your wallet on purchase.
          </p>
        </div>

        <div className="plans__grid">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const href = `${BALIC_BASE_URL}/${plan.id}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`plan-card plan-card--${plan.accent}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div className="plan-card__top">
        <span className="plan-card__reward">
          <CoinDot /> +{plan.rewardCoins} coins
        </span>
        {plan.badge && (
          <span className={`plan-card__badge plan-card__badge--${plan.badge.toLowerCase().replace(/\s+/g, "-")}`}>
            {plan.badge}
          </span>
        )}
      </div>

      <h3 className="plan-card__name">{plan.name}</h3>
      <p className="plan-card__tagline">{plan.tagline}</p>
      <div className="plan-card__cover">{plan.cover}</div>

      <ul className="plan-card__list">
        {plan.highlights.map((h) => (
          <li key={h}>
            <IconCheck width={14} height={14} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="plan-card__foot">
        <div className="plan-card__price">
          <strong>₹{plan.price.toLocaleString("en-IN")}</strong>
          <span>/ {plan.period}</span>
        </div>
        <span className="btn btn--primary plan-card__cta">View Plan</span>
      </div>
    </a>
  );
}

function CoinDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden style={{ verticalAlign: "-1px" }}>
      <defs>
        <linearGradient id="plan-coin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD95F" />
          <stop offset="100%" stopColor="#E2951B" />
        </linearGradient>
      </defs>
      <circle cx="7" cy="7" r="6.2" fill="url(#plan-coin)" stroke="#B06816" strokeWidth="0.8" />
      <text x="7" y="10" textAnchor="middle" fontSize="7" fontWeight="800" fill="#7a4710">₹</text>
    </svg>
  );
}
