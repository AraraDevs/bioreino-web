const Student = require('../models/Student');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ObjectId = require('mongoose').Types.ObjectId;

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');

class UserController {
  static async register(req, res) {
    const { name, email, password, plan } = req.body;

    // check if student exists
    const userExists = await Student.findOne({ email });
    if (userExists) {
      return res.status(422).json({ message: 'Este e-mail já está em uso' });
    }

    // create a password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // check if id is valid
    const isValidId = ObjectId.isValid(plan);
    if (!isValidId) {
      return res.status(422).json({ message: 'ID inválido!' });
    }

    // create a user
    const savedUser = new Student({
      name,
      email,
      password: passwordHash,
      plan,
    });

    try {
      await savedUser.save();

      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    // check student exists
    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(422).json({ message: 'E-mail ou senha incorretos' });
    }

    // compare password with db password
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res.status(422).json({ message: 'E-mail ou senha incorretos' });
    }

    createUserToken(user, req, res);
  }

  static async getUserData(req, res) {
    try {
      if (req.headers.authorization) {
        const token = getToken(req);
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await Student.findById(decoded.id).select('-password');

        res.status(200).send(user);
      } else {
        res.status(401).json({ message: 'Acesso Negado!' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro, tente mais tarde!' });
    }
  }

  static async getLastCourseAndLesson(req, res) {
    const userId = req.user.id;

    try {
      // get user data
      const userSaved = await Student.findById(userId);

      // get lastCourse of the user
      const userLastCourse = userSaved.lastCourse;

      if (!userLastCourse)
        return res
          .status(200)
          .json({ message: 'Nenhum curso e aula foram acessados no momento' });

      res.status(200).json(userLastCourse);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }

  static async getCoursesProgress(req, res) {
    const userId = req.user.id;

    try {
      const userSaved = await Student.findById(userId);
      const coursesProgress = userSaved.coursesProgress;

      if (!coursesProgress)
        return res
          .status(200)
          .json({ message: 'Nenhum curso foi acessado no momento' });

      res.status(200).json(coursesProgress);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }

  static async updateLastCourse(req, res) {
    const {
      courseTitle,
      slug,
      professor,
      imageUrl,
      lessonTitle,
      lessonDescription,
      slugLesson,
    } = req.body;
    const userId = req.user.id;

    // validations
    if (!courseTitle) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar o título do curso!' });
    }

    if (!slug) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar o slug do curso!' });
    }

    if (!professor) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar o nome do professor!' });
    }

    if (!imageUrl) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar a imagem do curso!' });
    }

    if (!lessonTitle) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar o título da aula!' });
    }

    if (!lessonDescription) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar a descrição da aula!' });
    }

    if (!slugLesson) {
      return res
        .status(422)
        .json({ message: 'É necessário enviar o slug da aula!' });
    }

    // update values of the lastCourse
    const lastCourse = {
      courseTitle,
      slug,
      professor,
      imageUrl,
      lastLesson: {
        lessonTitle,
        lessonDescription,
        slug: slugLesson,
      },
    };

    try {
      await Student.findByIdAndUpdate(userId, { lastCourse });

      res
        .status(200)
        .json({ message: 'Última aula assistida pelo aluno foi atualizada!' });
    } catch (error) {
      res.status(500).json({
        message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }

  static async updateCoursesProgress(req, res) {
    const { courseTitle, lessonTitle } = req.body;
    const userId = req.user.id;

    try {
      const studentSaved = await Student.findById(userId);

      const coursesProgress = studentSaved.coursesProgress;

      // checks if the student has coursesProgress
      if (!coursesProgress || !coursesProgress[courseTitle]) {
        await Student.findByIdAndUpdate(userId, {
          [`coursesProgress.${courseTitle}`]: [lessonTitle],
        });
        return res
          .status(201)
          .json({ message: 'Adicionado progresso de curso' });
      }

      // checks if the student already has the lesson saved
      const lessonExists = coursesProgress[courseTitle].includes(lessonTitle);

      if (lessonExists) {
        return res
          .status(200)
          .json({ message: 'Já existe uma aula semelhante a essa salva' });
      }

      await Student.findByIdAndUpdate(userId, {
        $push: { [`coursesProgress.${courseTitle}`]: lessonTitle },
      });

      return res
        .status(200)
        .json({ message: 'Progresso de curso atualizado com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
}

module.exports = UserController;
