// Imports
const Schemes = require('./scheme-model');
const db = require('../../data/db-config');


// Middleware
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await db('schemes')
      .select()
      .where('scheme_id', req.params.scheme_id);
    
    if (scheme) {
      next();
    } else {
      next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found` });
    }
  } catch(err) {
    next(err);
  }
};

const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if (scheme_name == null || scheme_name === '' || typeof scheme_name != 'string') {
    next({ status: 400, message: 'invalid scheme_name' });
  } else {
    next();
  }
};

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;

  if (instructions == null || instructions === '') {
    next({ status: 400, message: 'invalid step' });
  } else if (typeof step_number != 'number' || step_number < 1) {
    next({ status: 400, message: 'invalid step' });
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
