import { expect } from "chai";
import { BigNumber } from "ethers";

export function shouldBehaveCorrectly(): void {
    it("works with factory correctly", async function () {
        let prevPairsNumber: BigNumber = await this.Adapter.allPairsLength()
        //expect(await this.Adapter.getPair()).to.be.ok
        let pairAddress = await this.Adapter.connect(this.alice).createPair(this.TKN.address, this.WETHAddress)
        console.log(await pairAddress)
        expect(await this.Adapter.allPairsLength()).to.be.eq(prevPairsNumber.add(1))
        //expect(await this.Adapter.getPair(this.TKN.address, this.WETH.address)).to.be.eq(pairAddress.toString())
    })

    it("should works with router correctly", async function () {

    })
}