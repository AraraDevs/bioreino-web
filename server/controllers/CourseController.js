const Course = require('../models/Course');
const User = require('../models/Student');

const jwt = require('jsonwebtoken');

// helpers
const getToken = require('../helpers/get-token');

class CourseController {
  static async getCoursesFiltered(req, res) {
    const { plan } = req.params;

    try {
      let courses;

      if (plan === 'professional') {
        courses = await Course.find();
      } else {
        courses = await Course.find({ plan });
      }

      if (courses.length === 0) {
        res.status(404).json({
          msg: 'Desculpe, não encontramos nenhum curso com essas características. Experimente alterar o filtro.',
        });
      } else {
        res.status(200).json(courses);
      }
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  static async getCourseByUrlTitle(req, res) {
    const { title } = req.params;

    try {
      // get course by title
      const course = await Course.findOne({ courseUrl: title });

      res.status(200).json(course);
    } catch (error) {
      res.status(404).json({ msg: error });
    }
  }

  static async allCourses(req, res) {
    const { limit } = req.params;

    try {
      if (limit) return res.status(200).json(await Course.find().limit(limit));

      res.status(200).json(await Course.find());
    } catch (error) {
      res.status(500).json({
        msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }

  static async create(req, res) {
    const { professor, image, plan, category, title, lessons, courseUrl } =
      req.body;

    // checks if user is a professor
    const user = await User.findById(req.user.id);

    if (!user.professor) {
      return res.status(403).json({ msg: 'Acesso Negado!' });
    }

    // validations
    if (!professor) {
      return res
        .status(422)
        .json({ msg: 'Necessário enviar o nome do professor!' });
    }

    if (!image) {
      return res
        .status(422)
        .json({ msg: 'Necessário enviar a imagem do curso!' });
    }

    if (!plan) {
      return res.status(422).json({
        msg: 'Necessário enviar a qual plano de assinatura o curso pertence!',
      });
    }

    if (!category) {
      return res
        .status(422)
        .json({ msg: 'Necessário enviar a qual categoria o curso pertence!' });
    }

    if (!title) {
      return res
        .status(422)
        .json({ msg: 'Necessário enviar o título do curso!' });
    }

    if (!lessons || lessons.length === 0) {
      return res
        .status(422)
        .json({ msg: 'Necessário adicionar uma ou mais aulas a esse curso!' });
    }

    if (!courseUrl) {
      return res.status(422).json({ msg: 'Necessário enviar a url do curso!' });
    }

    try {
      const savedCourse = new Course({
        professor,
        imageUrl: image,
        plan,
        category,
        title,
        lessons,
        courseUrl,
      });

      savedCourse.save();

      res.status(201).json({ msg: 'Curso criado com sucesso!' });
    } catch (error) {
      res.status(500).json({
        msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }
}

module.exports = CourseController;
