const Lesson = require('../models/Lesson');
const User = require('../models/Student');
const Course = require('../models/Course');

class LessonController {
  static async create(req, res) {
    const {
      description,
      videoUrl,
      transcription,
      title,
      courseTitle,
      courseUrl,
      lessonUrl,
    } = req.body;

    // checks if user is a professor
    const user = await User.findById(req.user.id);

    if (!user.professor) {
      return res.status(403).json({ message: 'Acesso Negado!' });
    }

    // validations
    if (!description) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar a descrição da aula!' });
    }

    if (!videoUrl) {
      return res.status(422).json({ message: 'Necessário enviar a url do vídeo!' });
    }

    if (!title) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar o título da aula!' });
    }

    if (!courseTitle) {
      return res
        .status(422)
        .json({ message: 'Necessário enviar o título do curso!' });
    }

    if (!courseUrl) {
      return res.status(422).json({ message: 'Necessário enviar a url do curso!' });
    }

    if (!lessonUrl) {
      return res.status(422).json({ message: 'Necessário enviar a url da aula!' });
    }

    try {
      const savedLesson = new Lesson({
        description,
        videoUrl,
        transcription: transcription || '',
        title,
        courseTitle,
        courseUrl,
        lessonUrl,
      });

      savedLesson.save();

      const updatedData = {
        _id: savedLesson._id,
        title: savedLesson.title,
        description: savedLesson.description,
        lessonUrl: savedLesson.lessonUrl,
        transcription: savedLesson.transcription,
        videoUrl: savedLesson.videoUrl,
      };
      
      await Course.findOneAndUpdate(
        { title: courseTitle },
        { $push: { lessons: updatedData } },
      );
      // POR ALGUMA RAZÃO ESTÁ DANDO ERRO NO FRONTEND MSM TENDO A AULA CRIADA NO CURSO, VERIFIQUE

      res.status(201).json({ message: 'Aula criada com sucesso!' });
    } catch (error) {
      res.status(500).json({
        message: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
      });
    }
  }
}

module.exports = LessonController;
