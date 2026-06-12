import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  fetchUser,
  fetchVouchers,
  type UserInfo,
  type Voucher,
} from "../api";

export type FlowStep = "refer" | "rewards" | "coin-history" | "error";

interface FlowState {
  step: FlowStep;
  openRefer: () => void;
  openRewards: () => void;
  openCoinHistory: () => void;

  user: UserInfo | null;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  vouchers: Voucher[];
  loading: boolean;
}

const FlowContext = createContext<FlowState | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<FlowStep>("refer");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [coins, setCoins] = useState(0);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  // SSO token extraction on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token") || sessionStorage.getItem("sso_token");

    // In dev mode, auto-inject a mock token so the app is runnable without ?token=
    const useMocks = import.meta.env.DEV && !import.meta.env.VITE_API_BASE;
    if (!token && useMocks) {
      token = "dev-mock-token";
    }

    // if (!token) {
    //   setStep("error");
    //   setLoading(false);
    //   return;
    // }
    sessionStorage.setItem("sso_token", token!);

    // Clean token from URL without reload
    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    window.history.replaceState({}, "", url.pathname + url.search);

    // Load user + vouchers in parallel
    Promise.all([fetchUser(), fetchVouchers()])
      .then(([u, v]) => {
        setUser(u);
        setCoins(u.coin_balance);
        setVouchers(v);
      })
      .catch(() => {
        setStep("error");
      })
      .finally(() => setLoading(false));
  }, []);

  const value: FlowState = {
    step,
    openRefer: useCallback(() => setStep("refer"), []),
    openRewards: useCallback(() => setStep("rewards"), []),
    openCoinHistory: useCallback(() => setStep("coin-history"), []),

    user,
    coins,
    setCoins,
    vouchers,
    loading,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
}
