import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const USDC_TOKEN_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const FEE_COLLECTOR_ADDRESS = "0x585a3c024e2fd3849da84b799e47324b570a953d"; // Replace with the fee collector's address
const INITIAL_PLATFORM_FEE = 10; // 0.1% in basis points

const RecurChainModule = buildModule("RecurChainModule", (m) => {
  const usdcTokenAddress = m.getParameter("usdcTokenAddress", USDC_TOKEN_ADDRESS);
  const feeCollectorAddress = m.getParameter("feeCollectorAddress", FEE_COLLECTOR_ADDRESS);

  const recurChainAgent = m.contract("RecurChainAgent", [
    usdcTokenAddress,
    feeCollectorAddress,
  ]);

  return { recurChainAgent };
});

export default RecurChainModule;
