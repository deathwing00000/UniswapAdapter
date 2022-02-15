import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export function shouldBehaveCorrectly(): void {
  it("works with factory correctly", async function () {
    //testing factory's functions
    let prevPairsNumber: BigNumber = await this.Adapter.allPairsLength();
    let currentPairNumber;
    expect(
      (currentPairNumber = await this.Adapter.connect(this.alice).createPair(
        this.TKN.address,
        this.WETH.address
      ))
    ).to.be.ok;
    //console.log(prevPairsNumber)
    //console.log(currentPairNumber)
    expect(await this.Adapter.allPairsLength()).to.be.eq(
      prevPairsNumber.add(1)
    );
    expect(await this.Adapter.getPair(this.TKN.address, this.WETH.address)).to
      .be.ok;
  });

  it("should works with assets correctly", async function () {
    //mints TKN
    expect(
      await this.TKN.connect(this.signers.admin).mint(
        this.alice.address,
        this.hre.ethers.utils.parseEther("100")
      )
    ).to.be.ok;
    expect(
      await this.TKN.connect(this.signers.admin).mint(
        this.dan.address,
        this.hre.ethers.utils.parseEther("100")
      )
    ).to.be.ok;

    //deposit WETH
    await expect(
      this.WETH.connect(this.alice).deposit(
        this.alice.address,
        this.hre.ethers.utils.parseEther("100"),
        { value: this.hre.ethers.utils.parseEther("99.9") }
      )
    ).to.be.revertedWith("WrpEth: Not enough eth for deposit.");
    expect(
      await this.WETH.connect(this.dan).deposit(
        this.dan.address,
        this.hre.ethers.utils.parseEther("100"),
        { value: this.hre.ethers.utils.parseEther("100") }
      )
    ).to.be.ok;

    expect(await this.WETH.balanceOf(this.dan.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );
    expect(
      await this.WETH.connect(this.alice).deposit(
        this.alice.address,
        this.hre.ethers.utils.parseEther("100"),
        { value: this.hre.ethers.utils.parseEther("101") }
      )
    ).to.be.ok;
    expect(
      await this.hre.ethers.provider.getBalance(this.WETH.address)
    ).to.be.eq(this.hre.ethers.utils.parseEther("200"));

    //withdraw tests
    await expect(
      this.WETH.connect(this.alice).withdraw(
        this.hre.ethers.utils.parseEther("150")
      )
    ).to.be.reverted; //With("WrpEth: Withdraw amount exceeds balance amount.");
    expect(
      await this.WETH.connect(this.alice).withdraw(
        this.hre.ethers.utils.parseEther("50")
      )
    ).to.be.ok;
    expect(
      await this.hre.ethers.provider.getBalance(this.WETH.address)
    ).to.be.eq(this.hre.ethers.utils.parseEther("150"));

    //transfer and transferFrom tests for WETH
    expect(
      await this.WETH.connect(this.alice).approve(
        this.bob.address,
        this.WETH.balanceOf(this.alice.address)
      )
    ).to.be.ok;
    await expect(
      this.WETH.connect(this.bob).transferFrom(
        this.alice.address,
        this.bob.address,
        this.hre.ethers.utils.parseEther("51")
      )
    ).to.be.revertedWith("WrpEth: Amount excceeds allowance.");
    expect(
      await this.WETH.connect(this.bob).transferFrom(
        this.alice.address,
        this.bob.address,
        this.hre.ethers.utils.parseEther("50")
      )
    ).to.be.ok;

    //expect(await this.WETH.connect(this.bob).transferFrom(this.bob.address, this.bob.address, this.hre.ethers.utils.parseEther("50"))).to.be.ok
    expect(await this.WETH.balanceOf(this.bob.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("50")
    );
    expect(await this.WETH.balanceOf(this.alice.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("0")
    );
    expect(
      await this.WETH.connect(this.bob).transfer(
        this.carl.address,
        this.hre.ethers.utils.parseEther("50")
      )
    ).to.be.ok;
    expect(await this.WETH.balanceOf(this.bob.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("0")
    );
    expect(await this.WETH.balanceOf(this.carl.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("50")
    );
    expect(
      await this.WETH.connect(this.carl).transferFrom(
        this.carl.address,
        this.bob.address,
        this.hre.ethers.utils.parseEther("50")
      )
    ).to.be.ok;
    expect(await this.WETH.balanceOf(this.bob.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("50")
    );
    expect(await this.WETH.balanceOf(this.carl.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("0")
    );

    //testing deposit and withdraw reverts
    await this.signers.admin.sendTransaction({
      to: this.shitReceiver.address,
      value: ethers.utils.parseEther("100"),
    });

    expect(
      await this.hre.ethers.provider.getBalance(this.shitReceiver.address)
    ).to.be.eq(this.hre.ethers.utils.parseEther("100"));

    await expect(
      this.shitReceiver.deposit(
        this.shitReceiver.address,
        this.hre.ethers.utils.parseEther("10"),
        { value: this.hre.ethers.utils.parseEther("50") }
      )
    ).to.be.revertedWith("WrpEth: Change returns failed.");
  });

  it("should works with router correctly", async function () {
    //testing router's functions
    let pairAddress = await this.Adapter.getPair(
      this.TKN.address,
      this.WETH.address
    );
    let deadline = Math.floor(Date.now() / 1000) + 10000;
    this.LPToken = await this.hre.ethers.getContractAt("IERC20", pairAddress);

    expect(await this.WETH.balanceOf(this.dan.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );
    expect(await this.TKN.balanceOf(this.dan.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );
    expect(
      await this.WETH.connect(this.dan).approve(
        this.Adapter.address,
        this.WETH.balanceOf(this.dan.address)
      )
    ).to.be.ok;
    expect(
      await this.TKN.connect(this.dan).approve(
        this.Adapter.address,
        this.TKN.balanceOf(this.dan.address)
      )
    ).to.be.ok;

    //adding liquidity with 100TKN and 100 WETH
    let liqudityOutputs;
    expect(
      (liqudityOutputs = await this.Adapter.connect(this.dan).addLiquidity(
        this.TKN.address,
        this.WETH.address,
        this.hre.ethers.utils.parseEther("100"),
        this.hre.ethers.utils.parseEther("100"),
        this.hre.ethers.utils.parseEther("20"),
        this.hre.ethers.utils.parseEther("20"),
        this.dan.address,
        deadline
      ))
    ).to.be.ok;

    expect(await this.TKN.balanceOf(this.dan.address)).to.be.eq(0);

    expect(
      await this.Adapter.connect(this.dan).getAmountsOut(
        this.hre.ethers.utils.parseEther("100"),
        [this.TKN.address, this.WETH.address]
      )
    ).to.be.ok;

    expect(
      await this.Adapter.connect(this.dan).getAmountsIn(
        this.hre.ethers.utils.parseEther("10"),
        [this.TKN.address, this.WETH.address]
      )
    ).to.be.ok;

    //swapping exact 100TKN for minimum 40WETH
    let expecetedAmount = await this.Adapter.getAmountsOut(
      this.hre.ethers.utils.parseEther("100"),
      [this.TKN.address, this.WETH.address]
    );

    expect(await this.TKN.balanceOf(this.alice.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );
    expect(
      await this.TKN.connect(this.alice).approve(
        this.Adapter.address,
        this.TKN.balanceOf(this.alice.address)
      )
    ).to.be.ok;
    expect(
      await this.TKN.allowance(this.alice.address, this.Adapter.address)
    ).to.be.eq(await this.TKN.balanceOf(this.alice.address));

    expect(
      await this.Adapter.connect(this.alice).swapExactTokensForTokens(
        this.hre.ethers.utils.parseEther("100"),
        this.hre.ethers.utils.parseEther("40"),
        [this.TKN.address, this.WETH.address],
        this.alice.address,
        deadline
      )
    ).to.be.ok;

    expect(await this.WETH.balanceOf(this.alice.address)).to.be.eq(
      expecetedAmount[1]
    );

    let newWETHAliceBalance: BigNumber = this.hre.ethers.utils
      .parseEther("100")
      .sub(await this.WETH.balanceOf(pairAddress));
    let newTKNPairBalance: BigNumber = this.hre.ethers.utils
      .parseEther("100")
      .add(this.hre.ethers.utils.parseEther("100"));
    expect(await this.WETH.balanceOf(this.alice.address)).to.be.eq(
      newWETHAliceBalance
    );
    expect(await this.TKN.balanceOf(pairAddress)).to.be.eq(newTKNPairBalance);

    //swapping maximum 20WETH for 30TKN
    expecetedAmount = await this.Adapter.getAmountsIn(
      this.hre.ethers.utils.parseEther("30"),
      [this.WETH.address, this.TKN.address]
    );

    let oldWETHAliceBalance: BigNumber = await this.WETH.balanceOf(
      this.alice.address
    );
    newWETHAliceBalance = oldWETHAliceBalance.sub(expecetedAmount[0]);

    expect(
      await this.WETH.connect(this.alice).approve(
        this.Adapter.address,
        this.WETH.balanceOf(this.alice.address)
      )
    ).to.be.ok;
    expect(
      await this.Adapter.connect(this.alice).swapTokensForExactTokens(
        this.hre.ethers.utils.parseEther("30"),
        this.hre.ethers.utils.parseEther("20"),
        [this.WETH.address, this.TKN.address],
        this.alice.address,
        deadline
      )
    ).to.be.ok;

    expect(await this.WETH.balanceOf(this.alice.address)).to.be.eq(
      newWETHAliceBalance
    );
    /*expect(await this.WETH.balanceOf(this.alice.address)).to.be.eq(
            expecetedAmount[1]
        );*/

    expect(await this.TKN.balanceOf(this.alice.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("30")
    );
    expect(await this.TKN.balanceOf(pairAddress)).to.be.eq(
      this.hre.ethers.utils.parseEther("170")
    );

    newWETHAliceBalance = await this.WETH.balanceOf(this.alice.address);
    let newWETHPairBalance: BigNumber = await this.WETH.balanceOf(pairAddress);
    let SumOfWETHBalances: BigNumber =
      newWETHPairBalance.add(newWETHAliceBalance);
    expect(await SumOfWETHBalances).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );
    // await expect(function ()).to.emit("Removed", adapter).withArgs(args..)

    //testing removeLiquidity

    expect(
      await this.LPToken.connect(this.dan).approve(
        this.Adapter.address,
        this.LPToken.balanceOf(this.dan.address)
      )
    ).to.be.ok;

    expect(
      await this.Adapter.connect(this.dan).removeLiquidity(
        this.TKN.address,
        this.WETH.address,
        this.hre.ethers.utils.parseEther("10"),
        this.hre.ethers.utils.parseEther("10"),
        this.hre.ethers.utils.parseEther("3.2"),
        this.dan.address,
        deadline
      )
    ).to.be.ok;

    let oldWETHPairBalance: BigNumber = await this.WETH.balanceOf(pairAddress);
    let liquidity: BigNumber = this.hre.ethers.utils.parseEther("10");
    let newWETHDanAddrees: BigNumber = liquidity
      .mul(oldWETHPairBalance)
      .div(await this.LPToken.totalSupply());
    expect(await this.WETH.balanceOf(this.dan.address)).to.be.eq(
      newWETHDanAddrees
    );

    SumOfWETHBalances = (await this.WETH.balanceOf(this.dan.address))
      .add(await this.WETH.balanceOf(this.alice.address))
      .add(await this.WETH.balanceOf(pairAddress));
    expect(await SumOfWETHBalances).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );

    expect(
      await this.WETH.connect(this.gateway).deposit(
        this.shitReceiver.address,
        this.hre.ethers.utils.parseEther("100"),
        { value: this.hre.ethers.utils.parseEther("100") }
      )
    ).to.be.ok;

    expect(await this.WETH.balanceOf(this.shitReceiver.address)).to.be.eq(
      this.hre.ethers.utils.parseEther("100")
    );

    await expect(
      this.shitReceiver.withdraw(this.hre.ethers.utils.parseEther("100"))
    ).to.be.revertedWith("WrpEth: Withdraw failed.");
  });
}
