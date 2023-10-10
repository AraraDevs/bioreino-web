const jwt = require('jsonwebtoken');

function createUserToken(user, req, res) {
  const secret = process.env.TOKEN_SECRET;

  try {
    // create a token
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      secret,
      { expiresIn: 604800 }, // 604.800 segundos == 7 dias
    );

    // return token
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
}

module.exports = createUserToken;
