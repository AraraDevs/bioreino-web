const Category = require('../models/Category');
const Student = require('../models/Student');

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await Category.find();

      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message:
          'Ops! Algum erro ocorreu e não foi possível buscar nenhuma categoria de cursos',
      });
    }
  }
}

module.exports = CategoryController;
