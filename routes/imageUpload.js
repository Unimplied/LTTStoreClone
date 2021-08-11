const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    }, filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        
    }
})

function checkFileType(file, cb){
    const filetype = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(esxtname && mimetype ) {
        return cb(null, true)
    } else {
        cb('Please only upload images')
    }
}

const upload = multer({
    storage,
    fileFiler: function( req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
});

module.exports = router;