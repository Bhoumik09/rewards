const API_BASE = import.meta.env.VITE_API_BASE ?? "";
const USE_MOCKS = import.meta.env.DEV && !import.meta.env.VITE_API_BASE;

function getToken(): string | null {
  return sessionStorage.getItem("sso_token");
}

function headers(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface UserInfo {
  name: string;
  coin_balance: number;
}

export interface Voucher {
  id: string;
  name: string;
  coin_cost: number;
  expiry: string;
}

export interface CoinHistoryEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface RedeemResult {
  voucher_code: string;
  expiry: string;
}

// ---- Mock data for local development ----
const MOCK_USER: UserInfo = { name: "Varun", coin_balance: 850 };

const MOCK_VOUCHERS: Voucher[] = [
  { id: "v1", name: "Preventive Health Check-up", coin_cost: 500, expiry: "31 Dec 2026" },
  { id: "v2", name: "Dental Care Voucher", coin_cost: 300, expiry: "30 Sep 2026" },
  { id: "v3", name: "Physiotherapy Session", coin_cost: 400, expiry: "15 Nov 2026" },
  { id: "v4", name: "Amazon ₹200 Gift Card", coin_cost: 200, expiry: "28 Feb 2027" },
];

const MOCK_HISTORY: CoinHistoryEntry[] = [
  { id: "h1", date: "27 Apr 2026", description: "Family Shield purchased by Arushi Prasad", amount: 200 },
  { id: "h2", date: "26 Apr 2026", description: "Aditi Srivastava showed interest", amount: 25 },
  { id: "h3", date: "24 Apr 2026", description: "Preventive health voucher redeemed", amount: -500 },
  { id: "h4", date: "20 Apr 2026", description: "Referral link opened", amount: 5 },
  { id: "h5", date: "18 Apr 2026", description: "Wellness Plus purchased by you", amount: 75 },
  { id: "h6", date: "12 Apr 2026", description: "Contact added — Shreya Rana", amount: 10 },
  { id: "h7", date: "10 Apr 2026", description: "Contact added — Umang Panchal", amount: 10 },
];

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((r) => setTimeout(() => r(value), ms));
}
// -----------------------------------------

export async function fetchUser(): Promise<UserInfo> {
  if (USE_MOCKS) return delay(MOCK_USER);
  const res = await fetch(`${API_BASE}/api/user/me`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchVouchers(): Promise<Voucher[]> {
  if (USE_MOCKS) return delay(MOCK_VOUCHERS);
  const res = await fetch(`${API_BASE}/api/vouchers`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch vouchers");
  return res.json();
}

export async function submitLead(_name: string, _mobile: string): Promise<void> {
  if (USE_MOCKS) return;
  fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name: _name, mobile: _mobile }),
  }).catch(() => {
    // silently ignore
  });
}

export async function fetchCoinHistory(): Promise<CoinHistoryEntry[]> {
  if (USE_MOCKS) return delay(MOCK_HISTORY);
  const res = await fetch(`${API_BASE}/api/coins/history`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch coin history");
  return res.json();
}

export async function redeemVoucher(voucherId: string): Promise<RedeemResult> {
  if (USE_MOCKS) {
    return delay({
      voucher_code: `MOCK-${voucherId.toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`,
      expiry: "31 Dec 2026",
    }, 500);
  }
  const res = await fetch(`${API_BASE}/api/coins/redeem`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ voucher_id: voucherId }),
  });
  if (!res.ok) throw new Error("Redemption failed");
  return res.json();
}
