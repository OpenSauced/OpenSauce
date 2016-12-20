var express = require('express')
var cloudinary = require('cloudinary');
var router = express.Router()
const config = require('../env/config')

cloudinary.config(config.cloudConfig);

router.post('/image/test', upload.single('spot_image'), (req, res) => {
  if (req.file !== undefined) {
    // send spot photo to cloudinary
    cloudinary.uploader.upload(req.file.path, (result) => {
      // delete file from server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error on image delete:', err);
        } else {
          const postObj = req.body;
          postObj.img_url = result.secure_url;
          db.spots.post(req.body)
            .then((resolve) => {
              console.log('sending', resolve);
              res.status(201).send(resolve);
            })
            .catch((reject) => {
              console.log('rejecting with', reject);
              res.status(500).send(reject);
            });
        }
      });
    });
  } else {
    res.status(400).send('Spots require images');
  }
});


router.post('/test/image', function(req, res) {
  cloudinary.uploader.upload("my_picture.jpg", function(result) {
    console.log(result)
  });
  res.end(200)
})

module.exports = router
