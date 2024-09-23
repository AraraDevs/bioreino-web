// Middleware para verificar a chave de API
const verifyApiKey = (req, res, next) => {
  const keyApi = req.header('x-api-key');

  if (!keyApi || keyApi !== process.env.API_KEY) {
    return res
      .status(403)
      .json({ message: 'Acesso negado. Chave de API inválida.' });
  }

  next();
};

module.exports = verifyApiKey;
