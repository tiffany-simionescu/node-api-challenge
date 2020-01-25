const actionDb = require('../data/helpers/actionModel');

function validateActionId() {
  return (req, res, next) => {
    actionDb.get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action
          next();
        } else {
          res.status(400).json({
            message: "Invalid Action Id."
          })
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          message: "Error retrieving the action."
        })
      })
  }
}

function validateAction() {
  return (req, res, next) => {
    const project_id = req.params.id;
    const {notes, description} = req.body;

    if (!project_id) {
      return res.status(500).json({
        message: "Error with project_id"
      })
    } else if (!notes || !description) {
      return res.status(500).json({
        message: "Please provide a description and notes."
      })
    } else {
      req.action = { project_id, notes, description };
    }
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction
}