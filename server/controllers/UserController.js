const Student = require('../models/Student');
const Course = require('../models/Course');
const Plans = require('../models/Plans');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

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
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    const isValidId = ObjectId.isValid(plan) || !objectIdRegex.test(plan);
    if (!isValidId) {
      return res.status(422).json({ message: 'Usuário não encontrado!' });
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
    } catch (error) {
      console.log(error);

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

  static async createTemporaryAccount(req, res) {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz';
    let email = '';
    for (let i = 0; i < 10; i++) {
      const pos = Math.floor(Math.random() * caracteres.length);
      email += caracteres[pos];
    }
    email += '@bioreino.com.br';

    const name = 'Turista Bioreino';
    let password = '';
    while (password.length < 12) {
      password += Math.random().toString(36).substring(2);
    }
    password = password.substring(0, 12);

    // plan scholar ID
    const plan = '6577d2cb69c149d4293871ea';

    // create a password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const expiresAfter = new Date(Date.now() + 24 * 60 * 60 * 1000);
    try {
      const savedUser = new Student({
        name,
        email,
        password: passwordHash,
        plan,
        expiresAfter,
      });
      await savedUser.save();
      res
        .status(201)
        .json({ email: savedUser.email, password, accessPeriod: expiresAfter });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Erro ao criar conta temporária, tente novamente!' });
    }
  }

  static async editUser(req, res) {
    const id = req.params.id;

    // check if id is valid
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    const isValidId = ObjectId.isValid(id) || !objectIdRegex.test(id);
    if (!isValidId) {
      return res.status(422).json({ message: 'Usuário não encontrado!' });
    }

    if (req.user.id !== id) {
      return res.status(400).json({ message: 'Acesso não autorizado!' });
    }

    const user = await Student.findOne({ _id: id });
    if (!user) {
      return res.status(422).json({ message: 'Usuário não encontrado!' });
    }

    const { name, email, password, confirm_password, plan } = req.body;

    // validations
    if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!' });
    }
    user.name = name;

    if (!email) {
      return res.status(422).json({ message: 'O email é obrigatório!' });
    }

    const userExists = await Student.findOne({ email });
    if (user.email !== email && userExists) {
      return res.status(422).json({ message: 'Este email já está em uso!' });
    }
    user.email = email;

    if (password !== confirm_password) {
      return res.status(422).json({ message: 'As senhas não conferem!' });
    } else if (password && password === confirm_password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    const planExists = await Plans.findById(plan);
    if (!plan && !planExists) {
      return res
        .status(422)
        .json({ message: 'O plano de assinatura é obrigatório!' });
    }
    user.plan = plan;

    try {
      await Student.findByIdAndUpdate(user._id, { $set: user }, { new: true });

      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await Student.findOne({ email });
      if (!user)
        return res.status(400).json({ message: 'Usuário não encontrado.' });

      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setMinutes(now.getMinutes() + 15);
      await Student.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      const mailOptions = {
        from: 'Bioreino noreply@bioreino.top',
        to: email,
        subject: 'Pedido de resete de senha',
        template: 'auth/forgot_password',
        context: { user_email: email, token },
      };
      mailer.sendMail(mailOptions, (err) => {
        if (err)
          return res.status(400).send({
            message: 'Não foi possível enviar e-mail de esqueceu a senha.',
          });
        return res.json({
          message: 'E-mail de redefinição de senha enviado com sucesso!',
        });
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: 'Erro no esqueceu a senha, tente novamente!' });
    }
  }

  static async resetPassword(req, res) {
    const { password } = req.body;
    const { key, email } = req.query;

    try {
      const user = await Student.findOne({ email }).select(
        '+passwordResetToken passwordResetExpires'
      );
      if (!user)
        return res.status(400).json({ message: 'Usuário não encontrado, tente novamente.' });
      if (!password)
        return res
          .status(400)
          .json({ message: 'É necessário passar a senha.' });

      if (key !== user.passwordResetToken)
        return res.status(400).json({ message: 'Token inválido.' });

      const now = new Date();
      if (now > user.passwordResetExpires)
        return res
          .status(400)
          .json({ message: 'Token expirou, gere um novo.' });

      // create a password hash
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

      user.password = passwordHash;
      user.passwordResetExpires = null;
      user.passwordResetToken = null;

      await user.save();
      res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Não foi possível trocar a senha, tente novamente.' });
    }
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
          .json({ message: 'Nenhum curso foi acessado no momento.' });

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
          .json({ message: 'Nenhum curso foi acessado no momento.' });

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

  static async newCourseProgress(userId, courseId) {
    // get updated student data
    const studentUpdated = await Student.findById(userId);
    const courseUpdated = studentUpdated.coursesProgress.find(
      (course) => course._id.toString() === courseId.toString()
    );

    const totalLessonViewed = courseUpdated.lessonsViewed.length;
    // all course lessons
    const course = await Course.findById(courseUpdated._id);

    const totalOfLessons = course.lessons.length;
    const progress = Math.round((totalLessonViewed / totalOfLessons) * 100);

    return progress;
  }

  static async addCourseToProgress(userId, course, lesson) {
    await Student.findByIdAndUpdate(userId, {
      $push: {
        coursesProgress: {
          _id: course._id,
          title: course.title,
          progress: 0,
          lessonsViewed: lesson._id,
        },
      },
    });
  }

  static async addLessonToCourse(userId, course, lesson) {
    await Student.updateOne(
      { _id: userId, 'coursesProgress._id': course._id },
      {
        $push: {
          'coursesProgress.$.lessonsViewed': lesson._id,
        },
      }
    );
  }

  static async updateProgress(userId, course) {
    const newProgress = await UserController.newCourseProgress(
      userId,
      course._id
    );

    await Student.updateOne(
      { _id: userId, 'coursesProgress._id': course._id },
      {
        $set: {
          'coursesProgress.$.progress': newProgress,
        },
      }
    );
  }

  static async updateCoursesProgress(req, res) {
    const { courseData, lessonData } = req.body;
    const userId = req.user.id;

    try {
      const studentSaved = await Student.findById(userId);
      // checks if the student already has the course in coursesProgress
      const course = studentSaved.coursesProgress.find(
        (course) => course._id.toString() === courseData._id.toString()
      );

      if (course) {
        const lessonExists = course.lessonsViewed.some((lesson) =>
          lesson.equals(lessonData._id)
        );
        if (!lessonExists) {
          await UserController.addLessonToCourse(
            userId,
            courseData,
            lessonData
          );
          UserController.updateProgress(userId, courseData);
        }
      } else {
        await UserController.addCourseToProgress(
          userId,
          courseData,
          lessonData
        );
        UserController.updateProgress(userId, courseData);
      }

      res
        .status(200)
        .json({ message: 'Progresso de curso atualizado com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
}

module.exports = UserController;
