//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract Adapter {
    using SafeERC20 for IERC20;

    IUniswapV2Factory public factory;

    IUniswapV2Router02 public router;

    constructor(address _factory, address _router) {
        factory = IUniswapV2Factory(_factory);
        router = IUniswapV2Router02(_router);
    }

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair)
    {
        pair = factory.createPair(tokenA, tokenB);
    }

    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair)
    {
        pair = factory.getPair(tokenA, tokenB);
    }

    function allPairsLength() external view returns (uint256) {
        return factory.allPairsLength();
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBmin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        )
    {
        /*IERC20(tokenA).approve(address(this), amountADesired);
        IERC20(tokenB).approve(address(this), amountBDesired);*/
        IERC20(tokenA).safeTransferFrom(
            msg.sender,
            address(this),
            amountADesired
        );
        IERC20(tokenB).safeTransferFrom(
            msg.sender,
            address(this),
            amountBDesired
        );
        IERC20(tokenA).approve(address(router), amountADesired);
        IERC20(tokenB).approve(address(router), amountBDesired);
        (amountA, amountB, liquidity) = router.addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBmin,
            to,
            deadline
        );
        IERC20(tokenA).safeTransfer(msg.sender, amountADesired - amountA);
        IERC20(tokenB).safeTransfer(msg.sender, amountBDesired - amountB);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB) {
        (amountA, amountB) = router.removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        amounts = router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );
    }

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        amounts = router.swapTokensForExactTokens(
            amountOut,
            amountInMax,
            path,
            to,
            deadline
        );
    }

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts)
    {
        amounts = router.getAmountsOut(amountIn, path);
    }

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts)
    {
        amounts = router.getAmountsIn(amountOut, path);
    }
}
