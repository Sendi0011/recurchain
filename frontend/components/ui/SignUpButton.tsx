'use client';

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from './button';
import { LogIn } from 'lucide-react';

export function SignUpButton() {
  const { login, ready, authenticated } = usePrivy();

  const handleLogin = async () => {
    if (!ready) return;
    try {
      await login();
      // login triggers Privy social login / embedded wallet creation
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Button 
      onClick={handleLogin} 
      disabled={!ready || authenticated}
      variant="default"
      size="lg"
      className="w-full"
    >
      <LogIn className="mr-2 h-5 w-5" />
      {authenticated ? "Logged In" : "Sign up / Log in"}
    </Button>
  );
}
