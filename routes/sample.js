const Sample = require('../models/sample');
const CrudHandle = require('./crudHandle');

module.exports = app => {
    CrudHandle(app, Sample, 'samples');
};