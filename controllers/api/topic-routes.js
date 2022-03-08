const router = require('express').Router();
const { Topic } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll()    
    .then(dbTopicData => res.json(dbTopicData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbTopicData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    title: req.body.title   
  })
    .then(dbTopicData => {
      req.session.save(() => {
        req.session.user_id = dbTopicData.id;
        req.session.username = dbTopicData.username;
        req.session.loggedIn = true;
  
        res.json(dbTopicData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbTopicData => {
    if (!dbTopicData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbTopicData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbTopicData.id;
      req.session.username = dbTopicData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbTopicData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => { 
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbTopicData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbTopicData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
