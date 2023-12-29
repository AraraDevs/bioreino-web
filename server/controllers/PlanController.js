const Plans = require('../models/Plans');

class PlanController {
  static async getPlans(req, res) {
    try {
      const plan = await Plans.find();

      res.status(200).json(plan);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = PlanController;
