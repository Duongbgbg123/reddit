const Community = require('./models/Community');

const express = require('express');
const { getUserFromToken } = require('./UserFunctions');
const router = express.Router();

router.post('/communities', (req, res) => {
  const { name, slogan, avatar, cover } = req.body;
  Community.exists({ name }).then((exists) => {
    if (exists) {
      res.json('');
    } else {
      getUserFromToken(req.cookies.token).then((userInfo) => {
        const community = new Community({
          name,
          slogan,
          avatar,
          cover,
          author: userInfo,
        });
        community.save().then(() => {
          res.status(201).json('');
        });
      });
    }
  });
});

router.get('/communities/:name', (req, res) => {
  const { name } = req.params;
  Community.findOne({ name }).then((c) => {
    res.json(c);
  });
});

module.exports = router;
