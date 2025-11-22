# RecurChain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Project Overview

RecurChain is a decentralized recurring payment automation system that allows users to schedule USDC payments, automate transfers, receive real-time notifications, and off-ramp to local currency. It integrates Privy for authentication, Base for onchain execution, and a simple backend for secure automation.

## Overview

RecurChain enables users to create automated payment agents that execute on a recurring schedule. The system handles authentication, wallet access, USDC transfers, NAIRA payouts, notifications, transaction logs, and receipt generation. The goal is to provide a seamless and reliable way to automate both onchain and traditional payments.

## Features

-   **User Authentication:** Secure authentication through Privy.
-   **Dashboard:** Comprehensive overview of active agents, recent activities, and key metrics.
-   **Agent Management:** Create, edit, pause, resume, and delete recurring payment agents.
-   **Automated Payments:** Recurring payment agents that run automatically for USDC onchain transfers.
-   **Off-Ramp Support:** NAIRA payouts through integrated API partners.
-   **Wallet Management:** Manage USDC balance, deposit, and withdraw funds.
-   **Transaction History:** Detailed logs of all recurring payments and transactions, with downloadable receipts.
-   **Real-time Notifications:** Receive alerts for payment successes, failures, and low balances.
-   **Responsive Design:** Optimized for various screen sizes, including mobile with a collapsible sidebar.
-   **Modern UI/UX:** Futuristic minimalist design with smooth animations, clean buttons, and intuitive navigation.
-   **Secure Backend:** JWT verification, encrypted database fields, and no private key storage.
-   **Smart Contract Integration:** Automated USDC transfer logic, verifying sender, receiver, amount, and schedule.

## Frontend

Built with Next.js, React, Privy Auth, and modern UI components.
-   Futuristic minimalist design with no gradients.
-   Clean buttons with light rounding.
-   Smooth animations for loading and actions.
-   Modals for all alerts and confirmations.
-   Fully functional dashboard and agent management UI.

## Backend

Node.js and Express powers all core backend logic.
-   MongoDB stores users, agents, logs, notifications, and receipts.
-   Privy server verification for secure authentication.
-   Automated scheduler checks balances and executes recurring payments.
-   USDC onchain transfers through Base.
-   Naira payouts through supported off-ramp API.
-   Webhooks for payment updates.
-   Complete audit logs for every action.

## Smart Contracts

-   Supports automated USDC transfer logic.
-   Verifies sender, receiver, amount, and schedule.
-   Integrates with the backend scheduler.
-   Designed for reliability and simplicity.

## Folder Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express backend API
├── smartContract/     # Hardhat project for smart contracts
└── docs/              # Project documentation (if any)
```

## Getting Started

Follow these instructions to set up and run RecurChain locally.

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud instance)

### Environment Variables

Create a `.env` file in both the `frontend/` and `backend/` directories based on their respective `.env.example` files.

**`backend/.env` example:**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
BASE_RPC_URL=your_base_rpc_url
OFFRAMP_API_KEY=your_offramp_api_key
```

**`frontend/.env` example:**

```
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_BASE_RPC_URL=your_base_rpc_url
```

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/RecurChain.git
    cd RecurChain
    ```

2.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install # or yarn install
    ```

3.  **Backend Setup:**
    ```bash
    cd ../backend
    npm install # or yarn install
    ```

4.  **Smart Contracts Setup:**
    ```bash
    cd ../smartContract
    npm install # or yarn install
    ```

### Running the Applications

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm start # or yarn start
    ```
    The backend will typically run on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    ```bash
    cd ../frontend
    npm run dev # or yarn dev
    ```
    The frontend will typically run on `http://localhost:3000`.

3.  **Deploy Smart Contracts (Optional, for full functionality):**
    Refer to the `smartContract/README.md` for detailed instructions on deploying the smart contracts to Base Testnet or Mainnet.

Open [http://localhost:3000](http://localhost:3000) in your browser to access the RecurChain application.

## Requirements

-   Node.js
-   MongoDB
-   Privy App ID and Secret
-   Base RPC URL
-   API keys for off-ramp services

## Status

RecurChain is under active development. All core logic, interfaces, and automation systems are being refined for full deployment.

## Contributing

We welcome contributions to RecurChain! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots / Demo

*(Add screenshots or a link to a live demo here)*