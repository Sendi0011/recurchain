"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Landmark, Wand2, Copy, Inbox } from "lucide-react";
import { Transaction } from "@/types";
import DashboardLayout from "@/components/layout/dashboard-layout";
import WalletHeader from "@/components/wallet/wallet-header";
import WalletActions from "@/components/wallet/wallet-actions";
import TransactionHistory from "@/components/wallet/transaction-history";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";

export default function WalletPage() {
  const { user, ready: privyReady, authenticated } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();

  const [balance, setBalance] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | string>("all");
  const [filterType, setFilterType] = useState<"all" | string>("all");

  const filteredTransactions = transactions.filter((tx) => {
    if (filterStatus !== "all" && tx.status !== filterStatus) return false;
    if (filterType !== "all" && tx.type !== filterType) return false;
    return true;
  });

  // Effect: find embedded wallet + fetch balance
  useEffect(() => {
    if (!privyReady || !walletsReady || !authenticated) {
      return;
    }

    const embedded = wallets.find((w) => w.walletClientType === "privy");
    if (!embedded) {
      console.warn("No embedded privy wallet found");
      return;
    }

    setWalletAddress(embedded.address);

    (async () => {
      try {
        const provider = await embedded.getEthereumProvider();
        const etherProvider = new ethers.BrowserProvider(provider);
        const bal = await etherProvider.getBalance(embedded.address);
        const formatted = parseFloat(ethers.formatEther(bal));
        setBalance(formatted);
      } catch (err) {
        console.error("Error fetching balance", err);
      }
    })();
  }, [privyReady, walletsReady, authenticated, wallets]);

  if (!privyReady || !walletsReady) {
    return <div>Loading wallet info…</div>;
  }

  if (!authenticated) {
    return <div>Please log in to see your wallet.</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40 p-6"
        >
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
        </motion.div>

        <div className="p-6 space-y-6">
          <WalletHeader balance={balance} walletAddress={walletAddress} />
          <WalletActions
            onDeposit={() => setShowDepositModal(true)}
            onWithdraw={() => setShowWithdrawModal(true)}
          />
          {transactions.length > 0 ? (
            <TransactionHistory
              transactions={filteredTransactions}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              filterType={filterType}
              onFilterTypeChange={setFilterType}
            />
          ) : (
            <div className="relative text-center py-12 text-muted-foreground bg-card border border-border rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative">
                <div className="flex justify-center">
                  <Inbox className="w-16 h-16" />
                </div>
                <p className="mt-4 text-lg">No transactions found.</p>
                <p className="text-sm">
                  Your recent transactions will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        {showDepositModal && (
          <DepositModal
            walletAddress={walletAddress}
            onClose={() => setShowDepositModal(false)}
            onConfirm={(amt) => {
              setBalance((b) => b + amt);
              setShowDepositModal(false);
            }}
          />
        )}
        {showWithdrawModal && (
          <WithdrawModal
            balance={balance}
            onClose={() => setShowWithdrawModal(false)}
            onConfirm={(amt) => {
              setBalance((b) => b - amt);
              setShowWithdrawModal(false);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

function DepositModal({
  onClose,
  onConfirm,
  walletAddress,
}: {
  onClose: () => void;
  onConfirm: (amount: number) => void;
  walletAddress: string | null;
}) {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm(parseFloat(amount));
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border rounded-lg p-6 max-w-sm w-full"
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Deposit Funds
        </h3>
        <div className="space-y-4">
          <div className="text-center bg-secondary p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Your Wallet Address
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-lg font-mono text-foreground truncate">
                {walletAddress}
              </p>
              <button onClick={handleCopy} className="p-1 text-foreground">
                {copied ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    ✓
                  </motion.div>
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amount
            </label>
            <div className="flex items-center border border-border rounded-lg bg-input">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent text-foreground focus:outline-none"
              />
              <span className="px-4 text-muted-foreground">USD</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isProcessing || !amount}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isProcessing ? "Processing..." : "Confirm Deposit"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WithdrawModal({
  balance,
  onClose,
  onConfirm,
}: {
  balance: number;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}) {
  const [amount, setAmount] = useState("");
  const [withdrawType, setWithdrawType] = useState<"usdc" | "naira">("usdc");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!amount || num <= 0 || num > balance) return;
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm(num);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border rounded-lg p-6 max-w-sm w-full"
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Withdraw Funds
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Withdraw as
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setWithdrawType("usdc")}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  withdrawType === "usdc"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-foreground"
                }`}
              >
                USDC
              </button>
              <button
                onClick={() => setWithdrawType("naira")}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  withdrawType === "naira"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-foreground"
                }`}
              >
                Naira
              </button>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Available Balance</p>
            <p className="text-lg font-semibold text-foreground">
              {balance.toFixed(2)} USDC
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amount
            </label>
            <div className="flex items-center border border-border rounded-lg bg-input">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent text-foreground focus:outline-none"
              />
              <span className="px-4 text-muted-foreground">
                {withdrawType === "usdc" ? "USDC" : "₦"}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isProcessing || !amount}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isProcessing ? "Processing..." : "Confirm Withdrawal"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
