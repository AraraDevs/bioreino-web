const Course = require('../models/Course');
const User = require('../models/Student');

class CourseController {
  static async courses(req, res) {
    const { quantity } = req.query;

    try {
      if (quantity) {
        return res.status(200).json(await Course.find().limit(quantity));
      }
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async create(req, res) {
    const { professor, image, plan, category, title, lessons, slug } = req.body;

    // checks if user is a professor
    const user = await User.findById(req.user.id);

    if (!user.professor) {
      return res.status(403).json({ message: 'Acesso Negado!' });
    }

    // validations
    if (!professor) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar o nome do professor!' });
    }

    if (!image) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar a imagem do curso!' });
    }

    if (!plan) {
      return res.status(422).json({
        message:
          'Necessário enviar a qual plano de assinatura o curso pertence!',
      });
    }

    if (!category) {
      return res.status(422).json({
        message: 'Necessário enviar a qual categoria o curso pertence!',
      });
    }

    if (!title) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar o título do curso!' });
    }

    if (!lessons || lessons.length === 0) {
      return res.status(422).json({
        message: 'Necessário adicionar uma ou mais aulas a esse curso!',
      });
    }

    if (!slug) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar a url do curso!' });
    }

    try {
      const savedCourse = new Course({
        professor,
        imageUrl: image,
        plan,
        category,
        title,
        lessons,
        slug,
      });

      savedCourse.save();

      res.status(201).json({ message: 'Curso criado com sucesso!' });
    } catch (error) {
      res.status(500).json({
        message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }
}

module.exports = CourseController;
