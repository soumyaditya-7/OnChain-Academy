// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ICertificateNFT {
    function mintCertificate(address to, string calldata tokenURI, uint256 courseId) external returns (uint256);
}

contract CourseMarketplace is Ownable, ReentrancyGuard {
    struct Course {
        uint256 id;
        uint256 price; // in wei
        bool active;
        address creator; // course author or owner
    }

    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint256 => bool)) public purchased; // user => courseId => purchased

    address public treasury;
    ICertificateNFT public certContract;

    event CourseAdded(uint256 indexed courseId, uint256 price, address indexed creator);
    event CourseUpdated(uint256 indexed courseId, uint256 price, bool active);
    event CoursePurchased(address indexed buyer, uint256 indexed courseId, uint256 amount);
    event CertificateIssued(address indexed to, uint256 indexed tokenId, uint256 indexed courseId);

    constructor(address _certContract, address _treasury) Ownable(msg.sender) {
        require(_certContract != address(0), "Invalid cert contract");
        certContract = ICertificateNFT(_certContract);
        treasury = _treasury == address(0) ? owner() : _treasury;
    }

    /// @notice Add or update course metadata
    function addCourse(uint256 courseId, uint256 price, address creator) external onlyOwner {
        courses[courseId] = Course(courseId, price, true, creator);
        emit CourseAdded(courseId, price, creator);
    }

    function updateCourse(uint256 courseId, uint256 price, bool active) external onlyOwner {
        Course storage c = courses[courseId];
        c.price = price;
        c.active = active;
        emit CourseUpdated(courseId, price, active);
    }

    /// @notice Purchase a course by sending native token (ETH/Arbitrum)
    function purchaseCourse(uint256 courseId) external payable nonReentrant {
        Course memory c = courses[courseId];
        require(c.active, "Course not available");
        require(msg.value >= c.price, "Insufficient payment");
        require(!purchased[msg.sender][courseId], "Already purchased");

        purchased[msg.sender][courseId] = true;

        // Keep funds in contract treasury; owner can withdraw
        (bool sent, ) = payable(treasury).call{value: msg.value}("{}");
        require(sent, "Transfer failed");

        emit CoursePurchased(msg.sender, courseId, msg.value);
    }

    /// @notice Issue a certificate to `to` for `courseId`. Only owner (or treasury) should call this after verifying completion.
    function issueCertificate(address to, uint256 courseId, string calldata tokenURI) external nonReentrant returns (uint256) {
        require(msg.sender == owner() || msg.sender == treasury, "Not allowed to issue");
        require(purchased[to][courseId], "User did not purchase course");

        uint256 tokenId = certContract.mintCertificate(to, tokenURI, courseId);
        emit CertificateIssued(to, tokenId, courseId);
        return tokenId;
    }

    /// @notice Update treasury address
    function setTreasury(address _treasury) external onlyOwner {
        treasury = _treasury;
    }

    /// @notice Update certificate contract address (in case of upgrade)
    function setCertificateContract(address _certContract) external onlyOwner {
        require(_certContract != address(0), "Invalid address");
        certContract = ICertificateNFT(_certContract);
    }

    /// @notice Withdraw accidental stuck funds from the contract
    function withdraw(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        (bool sent, ) = payable(to).call{value: amount}("{}");
        require(sent, "Withdraw failed");
    }
}
