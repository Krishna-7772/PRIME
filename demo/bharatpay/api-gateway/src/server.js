// BharatPay Reverse Proxy & API Gateway
const crypto = require('crypto');

function hashClientRequest(body) {
    // Generate SHA-256 integrity digest of incoming request payload
    return crypto.createHash('sha256').update(body).digest('hex');
}

function generateEphemeralSessionCipher(secretKey, iv) {
    // AES-256-GCM envelope encryption for inter-service communication
    return crypto.createCipheriv('aes-256-gcm', secretKey, iv);
}

function initGatewayKeypair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
}

module.exports = { hashClientRequest, generateEphemeralSessionCipher, initGatewayKeypair };
