import { artifacts, ethers, waffle } from "hardhat";
//import { ethers } from "ethers";
import hre from "hardhat";
import dotenv from "dotenv";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import fs from "fs";
import type { Adapter } from "../../src/types/Adapter";
import type { TestTKN } from "../../src/types/TestTKN";
import type { WrpEth } from "../../src/types/WrpEth";
import { Signers } from "../types";

import { shouldDeployCorrectly } from "./testAdapter.deployment";
import { shouldBehaveCorrectly } from "./testAdapter.behavior";
describe("Unit tests", function () {
    // gather deployment info
    const network = hre.network.name;
    const config = dotenv.parse(fs.readFileSync(`.env${network}`));
    for (const parameter in config) {
        process.env[parameter] = config[parameter];
    }
    before(async function () {
        this.signers = {} as Signers;
        this.hre = hre;
        const signers: SignerWithAddress[] = await hre.ethers.getSigners();
        this.signers.admin = signers[0];
        this.alice = signers[1];
        this.bob = signers[2];
        this.carl = signers[3];
        this.dan = signers[4];
        this.gateway = signers[5];

        const testTKN = await hre.ethers.getContractFactory("TestTKN");
        this.TKN = <TestTKN>(
            await testTKN.deploy(
                config.TOKEN_NAME as string,
                config.TOKEN_SYMBOL as string
            )
        );
        console.log(`Deployed to: ${this.TKN.address}`);

        const WETH = await hre.ethers.getContractFactory("WrpEth");
        this.WETH = <WrpEth>await WETH.deploy("Wrapped Ethereum", "WETH");
        console.log(`Deployed to: ${this.WETH.address}`);

        /*let getPairAbi = "function getPair(address,address)returns(address)"
                this.factory = await this.hre.ethers.getContractAt(getPairAbi, config.FACTORY_ADDRESS as string)*/
        //this.WETHAddress = config.WETH_ADDRESS as string

        this.LPToken = await this.hre.ethers.getContractAt(
            "IERC20",
            config.WETH_ADDRESS as string
        );

        const adapter = await hre.ethers.getContractFactory("Adapter");
        this.Adapter = <Adapter>(
            await adapter.deploy(
                config.FACTORY_ADDRESS as string,
                config.ROUTER_ADDRESS as string
            )
        );
        console.log(`Deployed to: ${this.Adapter.address}`);
    });

    describe("Test adapter", function () {
        beforeEach(async function () { });

        shouldDeployCorrectly();

        shouldBehaveCorrectly();
    });
});
