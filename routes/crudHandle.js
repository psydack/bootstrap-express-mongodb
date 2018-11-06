const mongoose = require("mongoose");

module.exports = (app, ClassToUse, path) => {
  app.get(`/api/${path}`, (req, res, next) => {
    ClassToUse.find()
      .exec()
      .then(response => res.json(response))
      .catch(err => next(err));
  });

  app.get(`/api/${path}/:id`, (req, res, next) => {
    ClassToUse.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
      .then(response => res.json(response))
      .catch(err => next(err));
  });

  app.post(`/api/${path}`, (req, res, next) => {
    const objInstance = new ClassToUse(req.body);
    const error = objInstance.validateSync();
    if (error) {
      res.json(error);
    } else {
      objInstance
        .save()
        .then(() => res.json(objInstance))
        .catch(err => next(err));
    }
  });

  app.put(`/api/${path}/:id`, (req, res, next) => {
    // res.json({ OI: 'OI' });
    const objInstance = new ClassToUse(req.body);
    const error = objInstance.validateSync();
    if (error) {
      res.json(error);
    } else {
      ClassToUse.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      })
        .then(response => res.json(response))
        .catch(err => next(err));
    }
  });

  app.delete(`/api/${path}/:id`, (req, res, next) => {
    ClassToUse.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(response => res.json(response))
      .catch(err => next(err));
  });
};
