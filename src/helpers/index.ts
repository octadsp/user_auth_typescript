import crypto from 'crypto';

const SECRET = 'OCTAADSP-REST-API';

// crypto.randomBytes(128) untuk menghasilkan 128 bytes secara acak kemudian diubah menjadi format string dengan metode toString dengan enkoding base64
export const random = () => crypto.randomBytes(128).toString('base64');

// Fungsi ini menerima 2 parameter (salt , password)
// Crypto.createHmac('sha256') = membuat instance objek HMAC (Hash-based Message Authentication Code) dengan algoritma hash SHA-256.
// Nilai salt & password digabungkan dengan method join menggunakan ('/') sebagai tanda pemisahnya dan digunakan sebagai kunci untuk HMAC.
// Method .update(SECRET) digunakan untuk mengupdate HMAC dengan nilai SECRET
// Method .digest() digunakan untuk menghasilkan nilai hash dari HMAC
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};