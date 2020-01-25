const express = require('express');
const actionRouter = require('../actions/actionRouter');
const projectDb = require('../data/helpers/projectModel');

const { 
  validateProjectId, 
  validateProjectPost 
} = require('../middleware/projectValidation');

const router = express.Router();

router.use('/:id/actions', actionRouter);

// --- END POINTS --- //

// Get - /projects
router.get('/', (req, res, next) => {
  projectDb.get(req.project)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// GET - /projects/:id
router.get('/:id', validateProjectId(), (req, res) => {
  res.json(req.project);
})

// POST - /projects
router.post('/', validateProjectPost(), (req, res, next) => {
  projectDb.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// PUT - /projects/:id
router.put('/:id', validateProjectId(), validateProjectPost(), (req, res, next) => {
  projectDb.update(req.params.id, req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// DELETE - /projects/:id
router.delete('/:id', validateProjectId(), (req, res, next) => {
  projectDb.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "Project was successfully deleted."
      })
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router;