const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Comment = require('./models/Comment.js');
const VotingRoutes = require('./VotingRoutes.js');
const dotenv = require('dotenv');
const secret = 'secret123';
const Community = require('./models/Community');
const CommunityRoutes = require('./CommunityRoutes');
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(VotingRoutes);
app.use(CommunityRoutes);

function getUserFromToken(token) {
  const userInfo = jwt.verify(token, secret);
  return User.findById(userInfo.id);
}

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('DB Connection Successfull'))
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('ok');
});

app.post('/register', (req, res) => {
  const { email, username } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({ email, username, password });
  user
    .save()
    .then((user) => {
      jwt.sign({ id: user._id }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(201).cookie('token', token).send();
        }
      });
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;

  getUserFromToken(token)
    .then((user) => {
      res.json({ username: user.username });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (user && user.username) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign({ id: user._id }, secret, (err, token) => {
          res.cookie('token', token).send();
        });
      } else {
        res.status(422).json('Invalid username or password');
      }
    } else {
      res.status(422).json('Invalid username or password');
    }
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').send();
});

app.get('/comments', (req, res) => {
  const { search, community } = req.query;
  const filters = search
    ? { body: { $regex: '.*' + search + '.*' } }
    : { rootId: null };

  if (community) {
    filters.community = community;
  }

  Comment.find(filters)
    .sort({ postedAt: -1 })
    .then((comments) => {
      res.json(comments);
    });
});

app.get('/search', (req, res) => {
  const { phrase } = req.query;

  Comment.find({
    body: { $regex: '.*' + phrase + '.*' },
  })
    .sort({ postedAt: -1 })
    .then((comments) => {
      Community.find({ name: { $regex: '.*' + phrase + '.*' } }).then(
        (communities) => {
          res.json({ comments, communities });
        }
      );
    });
});

app.get('/comments/root/:rootId', (req, res) => {
  Comment.find({ rootId: req.params.rootId })
    .sort({ postedAt: -1 })
    .then((comments) => {
      res.json(comments);
    });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id).then((comment) => {
    res.json(comment);
  });
});

app.post('/comments', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  getUserFromToken(token)
    .then((userInfo) => {
      const { title, body, parentId, rootId, community } = req.body;
      const comment = new Comment({
        title,
        body,
        author: userInfo.username,
        postedAt: new Date(),
        parentId,
        rootId,
        community,
      });
      comment
        .save()
        .then((savedComment) => {
          res.json(savedComment);
        })
        .catch(console.log);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.listen(4000);
