const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const { 
  validateProjectId
 } = require('../middleware/projectValidation');

const {  
  validateActionId, 
  validateAction 
} = require('../middleware/actionValidation');

const router = express.Router({
  mergeParams: true,
})

// --- END POINTS --- //

// GET - /projects/:id/actions
router.get('/', validateProjectId(), (req, res, next) => {
  actionDb.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// GET - /projects/:id/actions/:id
router.get('/:id', validateActionId(), validateProjectId(), (req, res, next) => {
  actionDb.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// POST - /projects/:id/actions
router.post('/', validateProjectId(), validateAction(), (req, res, next) => {
  actionDb.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// PUT - /projects/:id/actions/:id
router.put('/:id', validateProjectId(), validateActionId(), (req, res, next) => {
  actionDb.update(req.action.id, req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    })
})

// DELETE - /projects/:id/actions/:id
router.delete('/:id', validateProjectId(), validateActionId(), (req, res, next) => {
  actionDb.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "Action was successfully removed."
      })
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router;