// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20 {
    constructor(address _user) ERC20("USDT", "USDT") {
        _mint(_user, 100 * (10**18));
    }
}
