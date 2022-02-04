import { expect } from "chai";

export function shouldDeployCorrectly(): void {
    it("should deploy correctly", async function () {
        expect(await this.TKN.name()).to.be.eq("testToken")
        expect(await this.TKN.symbol()).to.be.eq("TKN")
        expect(await this.WETH.name()).to.be.eq("Wrapped Ethereum")
        expect(await this.WETH.symbol()).to.be.eq("WETH")
        expect(await this.Adapter.factory()).to.be.eq("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")
        expect(await this.Adapter.router()).to.be.eq("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
    });
}