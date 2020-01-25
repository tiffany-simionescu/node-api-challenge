const projectDb = require('../data/helpers/projectModel');

function validateProjectId() {
  return (req, res, next) => {
    projectDb.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project
        next();
      } else {
        res.status(400).json({
          message: "Invalid Project Id"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving the project."
      })
    })
  }
}

function validateProjectPost() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        message: "Please provide a name and description"
      })
    }
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProjectPost
}