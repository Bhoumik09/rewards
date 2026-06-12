import { useState } from "react";
import { IconCheck, IconCopy, IconMessage, IconSend } from "../icons/Icons";

const REFERRAL_LINK = "https://arogyacare.co/refer/varun-x7q2";
const SHARE_MESSAGE = `I'm using ArogyaCare for health insurance — sign up with my link and we both win rewards: ${REFERRAL_LINK}`;

export function ShareLinkCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const waHref = `https://wa.me/?text=${encodeURIComponent(SHARE_MESSAGE)}`;
  const smsHref = `sms:?body=${encodeURIComponent(SHARE_MESSAGE)}`;

  return (
    <div className="share-link">
      <div className="share-link__head">
        <h4>Share your referral link</h4>
        <p>Send it to friends — they sign up, you earn rewards instantly.</p>
      </div>

      <div className="share-link__copy">
        <input readOnly value={REFERRAL_LINK} aria-label="Referral link" />
        <button
          type="button"
          className={`share-link__copy-btn ${copied ? "is-copied" : ""}`}
          onClick={copy}
        >
          {copied ? (
            <>
              <IconCheck width={14} height={14} /> Copied
            </>
          ) : (
            <>
              <IconCopy width={14} height={14} /> Copy
            </>
          )}
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="share-link__icon-btn share-link__icon-btn--whatsapp"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <IconMessage width={16} height={16} />
        </a>
        <a
          href={smsHref}
          className="share-link__icon-btn share-link__icon-btn--sms"
          aria-label="Send as message"
          title="Send as message"
        >
          <IconSend width={16} height={16} />
        </a>
      </div>
    </div>
  );
}
