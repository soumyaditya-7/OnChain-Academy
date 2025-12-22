// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
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

    // owner => courseId => tokenId (0 if none)
    mapping(address => mapping(uint256 => uint256)) public ownerCourseToken;

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
        require(ownerCourseToken[to][courseId] == 0, "Certificate already issued for this course");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCourse[tokenId] = courseId;
        ownerCourseToken[to][courseId] = tokenId;

        emit CertificateMinted(to, tokenId, courseId, tokenURI);
        return tokenId;
    }

    /// @notice Burns a certificate. Only contract owner, token owner, or approved operator can burn.
    function burn(uint256 tokenId) external {
        // Only contract owner or authorized issuers can revoke certificates
        require(issuers[msg.sender] || owner() == _msgSender(), "Not authorized to burn");
        address tokenOwner = ownerOf(tokenId);
        uint256 courseId = tokenCourse[tokenId];
        // clear mapping before burn
        if (ownerCourseToken[tokenOwner][courseId] == tokenId) {
            ownerCourseToken[tokenOwner][courseId] = 0;
        }
        _burn(tokenId);
    }

    /// @notice Ensure tokenCourse and ownerCourseToken are cleared on any burn
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Soulbound: prevent transfers (but allow mint and burn)
        if (from != address(0) && to != address(0)) {
            revert("Certificates are non-transferable");
        }
        
        // If burning, clear the mappings
        if (to == address(0) && from != address(0)) {
            uint256 courseId = tokenCourse[tokenId];
            if (courseId != 0) {
                tokenCourse[tokenId] = 0;
                if (ownerCourseToken[from][courseId] == tokenId) {
                    ownerCourseToken[from][courseId] = 0;
                }
            }
        }
        
        return super._update(to, tokenId, auth);
    }

    // --- Soulbound protections: disable approvals ---
    // Note: Transfers are already blocked by the _update override above.
    // We only need to override approve functions which are still virtual in OZ v5.
    function approve(address, uint256) public virtual override(ERC721, IERC721) {
        revert("Certificates are soulbound");
    }

    function setApprovalForAll(address, bool) public virtual override(ERC721, IERC721) {
        revert("Certificates are soulbound");
    }
}
