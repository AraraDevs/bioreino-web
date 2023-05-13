const Student = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    cpf,
    plan,
    subscriptionDate,
  } = req.body;

  console.log(
    await Student.updateOne(
      { name: 'Pedro' },
      {
        $push: {
          progressArray: {
            courseId: '111',
            lessonProgress: [{ lessonId: '2121', complete: true }],
          },
        },
      },
    ),
  );

  const userExists = await Student.findOne({ email });
  if (userExists)
    return res.status(422).json({ msg: 'Este e-mail já está em uso' });

  if (password !== confirmPassword)
    return res.status(422).json({ msg: 'As senhas não conferem!' });

  const salt = bcrypt.genSaltSync(12);
  const passwordHash = bcrypt.hashSync(password, salt);
  const cpfHash = bcrypt.hashSync(cpf, salt);

  const savedUser = new Student({
    name,
    email,
    password: passwordHash,
    cpf: cpfHash,
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
