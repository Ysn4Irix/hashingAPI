const crypto = require('crypto');

module.exports = hash = data => {
    const md5 = crypto.createHash('md5').update(data).digest('hex');
    const sha1 = crypto.createHash('sha1').update(data).digest('hex');
    const sha256 = crypto.createHash('sha256').update(data).digest('hex');
    const sha512 = crypto.createHash('sha512').update(data).digest('hex');
    return {
        md5: md5,
        sha1: sha1,
        sha256: sha256,
        sha512: sha512
    }
}