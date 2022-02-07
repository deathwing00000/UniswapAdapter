//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract Adapter {
    using SafeERC20 for IERC20;

    /**
     * This even emiited when pair created
     * @param pairAddress address of pair.
     * @param tokenA address of first token at pair.
     * @param tokenB address of second token at pair.
     */
    event PairCreated(
        address indexed pairAddress,
        address tokenA,
        address tokenB
    );
    /**
     * This even emiited when liquidity added.
     * @param to address at which we send liquidity tokens.
     * @param amountA amount of token A added to liquidity pool.
     * @param amountB amount of token B added to liquidity pool.
     * @param liquidity amount of liquidity tokens that investor recieved.
     */
    event LiquidityAdded(
        address indexed to,
        uint256 amountA,
        uint256 amountB,
        uint256 indexed liquidity
    );
    /**
     * This even emiited when liquidity removed.
     * @param to address what recieves tokens from pair.
     * @param amountA amount of token A that investor recieves.
     * @param amountB amount of token B that investor recieves.
     * @param liquidity amount of liquidity tokens that was send.
     */
    event LiquidityRemoved(
        address indexed to,
        uint256 amountA,
        uint256 amountB,
        uint256 indexed liquidity
    );
    /**
     * This event even emiited when swap was done
     * @param to address of reciever of tokens.
     * @param amounts array of amounts of tokens that used for swap.
     * @param path array of addresses of pairs for determine path of swap.
     */
    event Swapped(
        address indexed to,
        uint256[] indexed amounts,
        address[] path
    );

    /** Address of Uniswap's factory. */
    address public factory;

    /** Address of Uniswap's router. */
    address public router;

    /**
     * Constructor for deploy contract.
     * @param _factory Address of Uniswap's factory.
     * @param _router Address of Uniswap's router.
     */
    constructor(address _factory, address _router) {
        factory = _factory;
        router = _router;
    }

    /**
     * Function that creates pair.
     * @param tokenA address of first token at pair.
     * @param tokenB address of second token at pair.
     * @return pair address of pair.
     */
    function createPair(address tokenA, address tokenB)
        external
        returns (address pair)
    {
        pair = IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        emit PairCreated(pair, tokenA, tokenB);
    }

    /**
     * View function that returns address of pair.
     * @param tokenA address of first token at pair.
     * @param tokenB address of second token at pair.
     * @return pair address of pair.
     */
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair)
    {
        pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
    }

    /**
     * View function that returns count of all existing pairs.
     * @return count of all existing pairs.
     */
    function allPairsLength() external view returns (uint256) {
        return IUniswapV2Factory(factory).allPairsLength();
    }

    /**
     * Function that adds tokens in liquidity pool.
     * @param tokenA address of first token at pair.
     * @param tokenB address of second token at pair.
     * @param amountADesired amount of token A that you desire to add to liquidity pool.
     * @param amountBDesired amount of token B that you desire to add to liquidity pool.
     * @param amountAMin amount of token A that you want minimum to be added at liquidity pool.
     * @param amountBmin amount of token B that you want minimum to be added at liquidity pool.
     * @param to address that gets liquidity tokens of pair/
     * @param deadline time until which that call is staying relevant.
     * @return amountA amount of token A that was added to pool.
     * @return amountB amount of token B that was added to pool.
     * @return liquidity amount of liquidity tokens that was send at {to} address.
     */
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

        (amountA, amountB, liquidity) = IUniswapV2Router02(router).addLiquidity(
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
        emit LiquidityAdded(to, amountA, amountB, liquidity);
    }

    /**
     * Function that removes tokens from liquidity pool.
     * @param tokenA address of first token at pair.
     * @param tokenB address of second token at pair.
     * @param liquidity amount of liquidity token that you want to send.
     * @param amountAMin amount of token A that you wants minimum to get from liquidity pool.
     * @param amountBMin amount of token B that you wants minimum to get from liquidity pool.
     * @param to address at which we will get tokens from pair.
     * @param deadline time until which that call is staying relevant.
     * @return amountA amount of token A that {to} gets.
     * @return amountB amount of token B that {to} gets.
     */
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB) {
        address pairAddress = (
            IUniswapV2Factory(factory).getPair(tokenA, tokenB)
        );
        IERC20(pairAddress).safeTransferFrom(
            msg.sender,
            address(this),
            liquidity
        );
        IERC20(pairAddress).approve(address(router), liquidity);
        (amountA, amountB) = IUniswapV2Router02(router).removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
        emit LiquidityRemoved(to, amountA, amountB, liquidity);
    }

    /**
     * Function that swaps exact amount of tokens A for some amount of tokens B.
     * @param amountIn exact amount of token A that we want to swap in.
     * @param amountOutMin minimum amount of token B that we want to send out for swap.
     * @param path array of addresses of pairs for determine path of swap.
     * @param to address which will gets tokens out by swap.
     * @param deadline time until which that call is staying relevant.
     * @return amounts array of amounts of tokens that used for swap.
     */
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(path[0]).approve(address(router), amountIn);

        amounts = IUniswapV2Router02(router).swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );
        emit Swapped(to, amounts, path);
        //IERC20(path[1]).safeTransferFrom(to, msg.sender, 1);
    }

    /**
     * Function that swaps some amount of tokens A for exact amount of tokens B.
     * @param amountOut amount of token B that we want to get.
     * @param amountInMax maximum amount of token A that we ready to send in for swap.
     * @param path array of addresses of pairs for determine path of swap.
     * @param to address which will gets tokens out by swap.
     * @param deadline time until which that call is staying relevant.
     * @return amounts array of amounts of tokens that used for swap.
     */
    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            address(this),
            amountInMax
        );
        IERC20(path[0]).approve(address(router), amountInMax);
        amounts = IUniswapV2Router02(router).swapTokensForExactTokens(
            amountOut,
            amountInMax,
            path,
            to,
            deadline
        );
        IERC20(path[0]).safeTransfer(msg.sender, amountInMax - amounts[0]);
        emit Swapped(to, amounts, path);
    }

    /**
     * Given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset.
     * @param amountIn amount of tokens that we swapping in
     * @param path array of addresses of pairs for determine path of swap.
     * @return amounts array of amounts of tokens that used for swap.
     */
    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts)
    {
        amounts = IUniswapV2Router02(router).getAmountsOut(amountIn, path);
    }

    /**
     * Given an output amount of an asset and pair reserves, returns a required input amount of the other asset.
     * @param amountOut amount of tokens that we want to recieve.
     * @param path array of addresses of pairs for determine path of swap.
     * @return amounts array of amounts of tokens that used for swap.
     */
    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts)
    {
        amounts = IUniswapV2Router02(router).getAmountsIn(amountOut, path);
    }
}
