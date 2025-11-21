

# RecurChain

RecurChain is a decentralized recurring payment automation system that allows users to schedule USDC payments, automate transfers, receive real-time notifications, and off-ramp to local currency. It integrates Privy for authentication, Base for onchain execution, and a simple backend for secure automation.

## Overview

RecurChain enables users to create automated payment agents that execute on a recurring schedule. The system handles authentication, wallet access, USDC transfers, NAIRA payouts, notifications, transaction logs, and receipt generation. The goal is to provide a seamless and reliable way to automate both onchain and traditional payments.

## Features

User authentication through Privy
Dashboard with balance, active agents, history, and notifications
Recurring payment agents that run automatically
USDC onchain transfers
Off-ramp support for NAIRA payouts through API partners
Search, sidebar navigation, and notification center
Modals for confirmations, errors, and success messages
Full transaction logs and downloadable receipts
Smooth animations and modern UI
Secure backend with JWT verification
Encrypted database fields
No private key storage

## Frontend

Built with Next.js, React, Privy Auth, and modern UI components
Futuristic minimalist design with no gradients
Clean buttons with light rounding
Smooth animations for loading and actions
Modals for all alerts and confirmations
Fully functional dashboard and agent management UI

## Backend

Node.js and Express powers all core backend logic
MongoDB stores users, agents, logs, notifications, and receipts
Privy server verification for secure authentication
Automated scheduler checks balances and executes recurring payments
USDC onchain transfers through Base
Naira payouts through supported off-ramp API
Webhooks for payment updates
Complete audit logs for every action

## Smart Contracts

Supports automated USDC transfer logic
Verifies sender, receiver, amount, and schedule
Integrates with the backend scheduler
Designed for reliability and simplicity

## Folder Structure

frontend
backend
smartContract
docs

## Getting Started

Clone the repository
Install dependencies for frontend and backend
Configure environment variables
Run both services with your package manager
Deploy smart contracts to Base Testnet or Base Mainnet

## Requirements

Node.js
MongoDB
Privy App ID and Secret
Base RPC URL
API keys for off-ramp services

## Status

RecurChain is under active development. All core logic, interfaces, and automation systems are being refined for full deployment.

---
