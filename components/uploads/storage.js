const path = require('path');
const crypto = require('crypto');
const GridfsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const { config } = require('../../config');

const storage = new GridfsStorage({
  url: config.dbUri2,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

module.exports = upload;