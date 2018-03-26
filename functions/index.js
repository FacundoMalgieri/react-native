const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');
const gcconfig = {
    projectId: 'udemy-react-nati-1521638812816\n',
    keyFilename: 'udemy-react-native.json'
};
const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const body = JSON.parse(req.body);
        const uploadPath = '/tmp/uploaded-image.jpg';
        fs.writeFileSync(uploadPath, body.image, 'base64', err => {
            console.log(err);
            return res.status(500).json({error: err});
        });
        const bucket = gcs.bucket('udemy-react-nati-1521638812816.appspot.com');
        const uuid = UUID();
        bucket.upload(uploadPath, {
            uploadType: 'media',
            destination: '/places/' + uuid + '.jpg',
            metadata: {
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (err, file) => {
            if (!err) {
                res.status(201).json({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
                    bucket.name +
                    '/o/' +
                    encodeURIComponent(file.name) +
                    '?alt=media&token=' +
                    uuid,
                    imagePath: '/places/' + uuid + '.jpg'
                });
            } else {
                console.log(err);
                res.status(500).json({error: err});
            }
        });
    });
});

exports.deleteImage = functions.database.ref('/places/{placeId}')
    .onDelete(event => {
        const placeData = event.data.previous.val();
        const imagePath = placeData.imagePath;
        const bucket = gcs.bucket('udemy-react-nati-1521638812816.appspot.com');
        bucket.file(imagePath);
        return bucket.file(imagePath).delete();

    });