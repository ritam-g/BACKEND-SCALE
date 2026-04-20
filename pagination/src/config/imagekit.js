require('dotenv').config();
const ImageKit = require('imagekit');

let imagekit = null;

// Lazy-load ImageKit initialization
const getImageKit = () => {
    if (!imagekit) {
       
        imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY ||`public_VbOZ77YJJSyMn/ZpSgO/rVNAwY4=`,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY || `private_saTe7hT7qxKfPkBobpEWi9yz1wQ=`,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ||`https://ik.imagekit.io/6b0qui93u`,
        });
    }
    return imagekit;
};

module.exports = { getImageKit };
