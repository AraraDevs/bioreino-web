const Category = require('../models/Category');
const Student = require('../models/Student');

class CategoryController {
  static async getCategories(req, res) {
    const userId = req.user.id;

    try {
      // get user data
      const userSaved = await Student.findById(userId);

      const userPlan = userSaved.plan;

      let categories;
      if (userPlan === 'professional') {
        categories = await Category.find();
      } else {
        categories = await Category.find({ plan: userPlan });
      }

      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: 'Ops! Algum erro ocorreu e não foi possível buscar nenhuma categoria de cursos',
      });
    }
  }
}

module.exports = CategoryController;
