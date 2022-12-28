// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ApequestReward is Ownable, ReentrancyGuard {
    struct IToken {
        bytes32 name;
        bytes32 symbol;
        address token;
    }

    struct IQuizz {
        uint256 cid;        // live quizz id no
        bytes32 aid;        // unique
        address creator;
        bool isActive;
        IToken token;
    }

    address[] public stableTokens;
    bytes32[] public quizzes;
    mapping (address => IToken) public stableToken;        // address: tokenaddress, uint256: index i.e stableTokens[tokenIndex]
    mapping (bytes32 => IQuizz) public quizz;               // bytes32: aid, index: quizzesIndex: quizz contract id to  quizzesIndex i.e quizzes[quizzesIndex]
    uint256 public quizzCounter;
    uint256 public tokenCounter;
    
    

    function getQuizz(bytes32 aid) public view returns(IQuizz memory){
        return quizz[aid];
    }
    
    function getToken(address _token) public view returns(IToken memory){
        return stableToken[_token];
    }
    

    // temp as of now for testnet amount removed once its went to live
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}
