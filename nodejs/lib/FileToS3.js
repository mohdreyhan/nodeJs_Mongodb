'use strict';

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAYIRGO36HLIBXGB6F',
    secretAccessKey: '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'
});

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'imagessbucket',
        acl: 'public-read',
        serverSideEncryption: 'AES256',
        fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});

module.exports = uploadS3;