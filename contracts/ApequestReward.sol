// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IERC20.sol";

contract ApequestReward is Ownable, ReentrancyGuard {
    struct IToken {
        string name;
        string symbol;
        address token;
        bool isActive;
    }

    struct IQuizz {
        uint256 cid; // live quizz id no
        bytes32 aid; // unique
        address creator;
        bool isActive;
        IToken token;
        uint256 amount;
    }

    address[] public stableTokens;
    bytes32[] public quizzids;
    mapping(address => IToken) public stableToken; // address: tokenaddress, uint256: index i.e stableTokens[tokenIndex]
    mapping(bytes32 => IQuizz) public quizz; // bytes32: aid, index: quizzesIndex: quizz contract id to  quizzesIndex i.e quizzes[quizzesIndex]
    mapping(address => mapping(address => uint256)) public stakeHolders; //  address: creator, address: token address, uint256 stakeamount
    uint256 public quizzCounter;
    uint256 public tokenCounter;

    function stake(address _token, bytes32 _aid, uint256 _amount) public {
        require(
            stableToken[_token].isActive,
            "only listed tokens can be staked"
        );
        IQuizz memory _quizz = IQuizz(
            quizzCounter,
            _aid,
            msg.sender,
            true,
            getToken(_token),
            _amount
        );
        quizz[_aid] = _quizz;
        quizzids.push(_aid);
        // IERC20(_token).approve(address(this),_amount);
        // IERC20(_token).transferFrom
        IERC20(_token).transfer(address(this), _amount); // as of now using transfer:: approve, transferFrom
        stakeHolders[msg.sender][_token] += _amount;
        quizzCounter += 1;
    }

    function setToken(address _token) public onlyOwner {
        stableTokens.push(_token);
        stableToken[_token] = IToken({
            name: IERC20(_token).name(),
            symbol: IERC20(_token).symbol(),
            isActive: true,
            token: _token
        });
        tokenCounter += 1;
    }
    
    function getQuizz(bytes32 _aid) public view returns (IQuizz memory) {
        return quizz[_aid];
    }

    function getAllTokensAddress() public view returns (address[] memory) {
        address[] memory _addresses;
        for (uint256 i = 0; i < stableTokens.length; i++) {
            address payable _address = payable(stableTokens[i]);
            _addresses[i] = _address;
        }
        return _addresses;
    }

    function getToken(address _token) public view returns (IToken memory) {
        return stableToken[_token];
    }

    // temp as of now for testnet amount removed once its went to live
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}
