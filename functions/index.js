const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');
const gcconfig = {
    projectId: 'udemy-react-nati-1521638812816\n',
    keyFilename: 'udemy-react-native.json'
};
const gcs = require('@google-cloud/storage')(gcconfig);

admin.initializeApp({
    credential: admin.credential.cert(require('./udemy-react-native.json'))
});

exports.storeImage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            console.log('No token present');
            res.status(403).json({error: 'Unauthorized'});
            return;
        }
        let idToken;
        idToken = req.headers.authorization.split('Bearer ')[1];
        return new Promise((resolve, reject) => {
            admin.auth().verifyIdToken(idToken)
                .then(decodedToken => {
                    const body = JSON.parse(req.body);
                    const uploadPath = '/tmp/uploaded-image.jpg';
                    fs.writeFileSync(uploadPath, body.image, 'base64', err => {
                        console.log(err);
                        return res.status(500).json({error: err});
                    });
                    const bucket = gcs.bucket('udemy-react-nati-1521638812816.appspot.com');
                    const uuid = UUID();
                    return bucket.upload(uploadPath, {
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
                            resolve(
                                res.status(201).json({
                                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
                                    bucket.name +
                                    '/o/' +
                                    encodeURIComponent(file.name) +
                                    '?alt=media&token=' +
                                    uuid
                                })
                            );
                        } else {
                            console.log(err);
                            res.status(500).json({error: err});
                        }
                    });
                })
                .catch(err => {
                    console.log('Invalid token.', err);
                    res.status(403).json({error: 'Unauthorized'});
                    reject(new Error('Something went wrong!'));
                });
        });
    });
});
