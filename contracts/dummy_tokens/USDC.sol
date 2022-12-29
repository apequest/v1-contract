// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor(address _user) ERC20("USDC", "USDC") {
        _mint(_user, 100 * 1 ether);
    }
}
