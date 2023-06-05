const Lesson = require('../models/Lesson');

const allLessonsFromTheCourse = async (req, res) => {
  const { courseTitle } = req.params;

  try {
    const lessons = await Lesson.find({ courseTitle });

    if (lessons.length === 0) {
      res.status(404).json({
        msg: 'Desculpe, não encontramos nenhuma aula para este curso.',
      });
    } else {
      res.status(200).json(lessons);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { allLessonsFromTheCourse };
