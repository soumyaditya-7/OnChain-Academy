// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title CertificateNFT - Simple ERC721 for course completion certificates
/// @author ArbiLearn
/// @notice Owner can set issuers (Marketplace or backend) that are allowed to mint certificates
contract CertificateNFT is ERC721URIStorage, Ownable {
    // simple incrementing counter for token IDs
    uint256 private _tokenIdCounter;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}

    // issuer => allowed
    mapping(address => bool) public issuers;

    // tokenId => courseId
    mapping(uint256 => uint256) public tokenCourse;

    event IssuerSet(address indexed issuer, bool allowed);
    event CertificateMinted(address indexed to, uint256 indexed tokenId, uint256 indexed courseId, string uri);

    /// @notice Set an authorized issuer (marketplace, backend service) allowed to mint
    function setIssuer(address issuer, bool allowed) external onlyOwner {
        issuers[issuer] = allowed;
        emit IssuerSet(issuer, allowed);
    }

    /// @notice Mint a certificate to `to` for `courseId` with `tokenURI`
    /// @dev Only accounts marked as issuer or contract owner can call
    function mintCertificate(address to, string calldata tokenURI, uint256 courseId) external returns (uint256) {
        require(issuers[msg.sender] || msg.sender == owner(), "Not authorized to mint");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCourse[tokenId] = courseId;

        emit CertificateMinted(to, tokenId, courseId, tokenURI);
        return tokenId;
    }

    /// @notice Burns a certificate. Only contract owner, token owner, or approved operator can burn.
    function burn(uint256 tokenId) external {
        address tokenOwner = ownerOf(tokenId);
        bool isApprovedOperator = (isApprovedForAll(tokenOwner, _msgSender()) || getApproved(tokenId) == _msgSender());
        require(tokenOwner == _msgSender() || isApprovedOperator || owner() == _msgSender(), "Not authorized to burn");
        _burn(tokenId);
    }
}
