// Imports
const db = require('../../data/db-config');

// Models
function find() { // ✅ EXERCISE A
	return db('schemes as sc')
		.leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
		.groupBy('sc.scheme_id')
		.orderBy('sc.scheme_id', 'ASC')
		.select('sc.*')
		.count('st.step_id as number_of_steps');
}

async function findById(scheme_id) { // ✅ EXERCISE B
	const result = await db('schemes as sc')
		.leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
		.where('sc.scheme_id', scheme_id)
		.select('sc.scheme_id', 'scheme_name', 'step_id', 'step_number', 'instructions')
		.orderBy('step_number', 'ASC');

	if (result[0].length == 0) {
		return null;
	}
	
	const newScheme = {
		scheme_id: result[0].scheme_id,
		scheme_name: result[0].scheme_name,
		steps: []
	};

	if (result[0].step_id == null) {
		return newScheme;
	}

	for (let step of result) {
		newScheme.steps.push({
			step_id: step.step_id,
			step_number: step.step_number,
			instructions: step.instructions
		});
	}

	return newScheme;
}

function findSteps(scheme_id) { // ✅ EXERCISE C
	return db('steps as st')
		.join('schemes as sc', 'st.scheme_id', 'sc.scheme_id')
		.select('step_id', 'step_number', 'instructions', 'scheme_name')
		.where('st.scheme_id', scheme_id)
		.orderBy('step_number', 'ASC');
}

async function add(scheme) { // ✅ EXERCISE D
	const [id] = await db('schemes').insert(scheme);
	return findById(id);
}

async function addStep(scheme_id, step) { // ✅ EXERCISE E
	await db('steps').insert({
		step_number: step.step_number,
		instructions: step.instructions,
		scheme_id: scheme_id
	});
	return findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
