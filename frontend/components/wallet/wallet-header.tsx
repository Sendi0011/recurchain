"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, ClipboardCheck } from "lucide-react";

export default function WalletHeader({
  balance,
  walletAddress,
}: {
  balance: number;
  walletAddress: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <motion.div
        variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
        className="md:col-span-2 bg-card border border-border rounded-lg p-6 relative overflow-hidden group hover:border-primary/30 transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
          <motion.h2
            key={balance}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            ${balance.toFixed(2)}
          </motion.h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Network</p>
              <p className="text-sm font-semibold text-foreground">Base (L2)</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Asset</p>
              <p className="text-sm font-semibold text-foreground">USDC</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
        className="bg-card border border-border rounded-lg p-6 flex flex-col justify-center"
      >
        <p className="text-xs text-muted-foreground mb-2">Wallet Address</p>
        {walletAddress ? (
          <div className="flex items-center gap-2">
            <p className="text-sm font-mono text-foreground truncate">
              {walletAddress}
            </p>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-secondary"
            >
              {copied ? (
                <ClipboardCheck size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className="text-muted-foreground" />
              )}
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not available</p>
        )}
      </motion.div>
    </motion.div>
  );
}
