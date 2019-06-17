const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let uploadSingle = upload.single('file');

module.exports = {
    uploadSingle
};