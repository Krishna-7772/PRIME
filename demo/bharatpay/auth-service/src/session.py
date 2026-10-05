import hashlib

def verify_api_token_hash(token: str) -> str:
    # Compute SHA-256 digest for cached session lookup
    return hashlib.sha256(token.encode('utf-8')).hexdigest()

def legacy_checksum(data: str) -> str:
    # Legacy MD5 checksum - deprecated hygiene finding
    return hashlib.md5(data.encode('utf-8')).hexdigest()
