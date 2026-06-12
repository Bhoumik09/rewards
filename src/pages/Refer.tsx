import { useState } from "react";
import { Header } from "../components/Header";
import { ShareLinkCard } from "../components/ShareLinkCard";
import { PlansSection } from "../components/PlansSection";
import { useFlow } from "../context/FlowContext";
import { submitLead } from "../api";

export function Refer() {
  const { openRewards } = useFlow();

  return (
    <div className="app-root">
      <Header />
      <ReferralForm />
      <ShareLinkCard />
      <PlansSection />
      <div className="refer-redeem">
        <button className="btn btn--primary" onClick={openRewards}>
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}

function ReferralForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim().length > 1 && /^\d{10}$/.test(mobile);

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitLead(name.trim(), mobile); // fire and forget
    setSubmitted(true);
  };

  const handleAnother = () => {
    setName("");
    setMobile("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className="referral-form">
        <div className="referral-form__success">
          <h3>Referral submitted!</h3>
          <p>We'll follow up with your contact. You'll earn coins as they progress.</p>
          <button className="btn btn--outline-purple" onClick={handleAnother}>
            Refer another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="referral-form">
      <h2 className="referral-form__title">Refer a friend</h2>
      <p className="referral-form__desc">Enter their details and we'll take it from here.</p>
      <div className="referral-form__fields">
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Mobile number"
          value={mobile}
          maxLength={10}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
        />
        <button
          className="btn btn--primary"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Submit Referral
        </button>
      </div>
    </section>
  );
}
