import {
  ADDRESS_0X0,
  ERC20__factory,
  NetworkType,
  tokenDataByNetwork,
} from "@gearbox-protocol/sdk";
import { ethers } from "hardhat";

export async function detectNetwork(): Promise<NetworkType> {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  try {
    const usdcMainnet = ERC20__factory.connect(
      tokenDataByNetwork.Mainnet.USDC,
      deployer,
    );
    await usdcMainnet.balanceOf(ADDRESS_0X0);
    return "Mainnet";
  } catch {
    try {
      const usdcMainnet = ERC20__factory.connect(
        tokenDataByNetwork.Kovan.USDC,
        deployer,
      );
      await usdcMainnet.balanceOf(ADDRESS_0X0);
      return "Kovan";
    } catch {
      throw new Error("Unknown network");
    }
  }
}
