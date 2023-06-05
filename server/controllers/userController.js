const Student = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, plan, subscriptionDate } = req.body;

  const userExists = await Student.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: 'Este e-mail já está em uso' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const savedUser = new Student({
    name,
    email,
    password: passwordHash,
    plan,
    subscriptionDate,
  });

  try {
    await savedUser.save();

    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) {
    return res.status(422).json({ msg: 'E-mail ou senha incorretos' });
  }

  const matchPassword = bcrypt.compareSync(password, user.password);
  if (!matchPassword) {
    return res.status(422).json({ msg: 'E-mail ou senha incorretos' });
  }

  try {
    const secret = process.env.TOKEN_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        progressArray: user.progressArray,
        coursesProgress: user.coursesProgress,
        lastCourse: user.lastCourse,
        plan: user.plan,
      },
      secret,
      { expiresIn: 604800 }, // 604.800 segundos == 7 dias
    );

    res.status(200).json({ msg: 'Autenticação realizada com sucesso', token });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

module.exports = { register, login };
