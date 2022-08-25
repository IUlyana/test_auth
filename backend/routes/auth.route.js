const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('./../db/models');

authRouter.get('/user', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    res.json({
      isLoggedIn: true,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

authRouter.post('/register', async (req, res) => {
  const { name, password } = req.body;

  const existingUser = await User.findOne({ where: { name } });
  if (existingUser) {
    res.status(422).json({ error: 'Такой пользователь уже есть' });
    return;
  }

  const user = await User.create({
    name,
    password: await bcrypt.hash(password, 10),
  });

  req.session.userId = user.id;
  res.json({ id: user.id, name: user.name });
});

authRouter.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await User.findOne({ where: { name } });

  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    req.session.userId = existingUser.id;
    res.json({ id: existingUser.id, name: existingUser.name });
  } else {
    res.status(401).json({ error: 'Такого пользователя нет либо пароли не совпадают' });
  }
});

authRouter.post('/logout', (req, res) => {
  res.clearCookie('user_sid');
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

module.exports = authRouter;
