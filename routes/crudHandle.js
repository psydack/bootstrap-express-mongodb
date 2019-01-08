const mongoose = require("mongoose");

/**
 * Simple crud made to use with MONGO DB
 * @author Rofli Sanches
 * @param {Express} app see index.js
 * @param {Scheme} ClassToUse mongo model like this: '../models/sample.js'
 * @param {String} path where do you like to access
 *
 * @example see ./sample.js
 */
module.exports = (app, ClassToUse, path) => {
  /**
   * Route List all objects from a given path (table)
   * @return {Array|Object} object list or an error (defined in mongoose scheme)
   * @example http://localhost:4000/api/sample
   */
  app.get(`/api/${path}`, (req, res, next) => {
    ClassToUse.find()
      .exec()
      .then(response => res.json(response))
      .catch(err => next(err));
  });

  /**
   * Route to get single id from a path (table)
   * @return {Object} object or an error (defined in mongoose scheme)
   * @example http://localhost:4000/api/sample/5bbe0df21c9d44000021bc74
   */
  app.get(`/api/${path}/:id`, (req, res, next) => {
    ClassToUse.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
      .then(response => res.json(response))
      .catch(err => next(err));
  });

  /**
   * Create new instance (object) from specific type (path)
   * @return {Object} updated object or an error (defined in mongoose scheme)
   * @example http://localhost:4000/api/sample
   * // within body a object
   * // {
   * //    "title": "New object created from RoflisCrud",
   * //    "distributionDate": "2019-01-01T00:00:00.000Z"
   * // }
   */
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

  /**
   * Update a instance (object)
   * @param {ObjectId} id
   * @return {Object} updated object or an error (defined in mongoose scheme)
   * @example http://localhost:4000/api/sample/0bbe0df21c9d44000021bc74
   *
   * // within body a object
   * // { "title": "New name" }
   */
  app.put(`/api/${path}/:id`, (req, res, next) => {
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

  /**
   * It's not a soft delete!
   * BE CAREFUL
   * @param {ObjectId} id
   * @return {Object} updated object or an error (defined in mongoose scheme)
   * @example http://localhost:4000/api/sample/0bbe0df21c9d44000021bc74
   */
  app.delete(`/api/${path}/:id`, (req, res, next) => {
    ClassToUse.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(response => res.json(response))
      .catch(err => next(err));
  });
};
