import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const IncidentSchema = new mongoose.Schema({
	name: {
		/* The name of this pet */

		type: String,
		required: [true, 'Please provide a name for this incident.'],
		maxlength: [20, 'Name cannot be more than 60 characters'],
	},
	description: {
		type: String,
		required: [true, 'Please provide a detailed description of the incident'],
	},
	date: {
		type: String,
		required: [true, 'Please provide the date and time of the incident.'],
	},
	reporter_name: {
		/* The first person who reported about the incident */

		type: String,
		required: [true, 'Please provide reporter name'],
		maxlength: [20, 'Reporter Name cannot be more than 60 characters'],
	},
	reporter_position: {
		/* The first person who reported about the incident */

		type: String,
		required: [true, 'Please provide reporter name'],
		maxlength: [20, 'Reporter Name cannot be more than 60 characters'],
	},

	investigator_name: {
		/* The first person who reported about the incident */

		type: String,
		required: [false, 'Please provide investigator name'],
		maxlength: [20, 'Investigator Name cannot be more than 60 characters'],
	},
	investigator_position: {
		/* The first person who reported about the incident */

		type: String,
		required: [false, 'Please provide investigator position'],
		maxlength: [20, 'Investigator position cannot be more than 60 characters'],
	},

	issue_resolved: {
		/* Whether the incident was resolved or not, if applicable */

		type: Boolean,
	},

	investigation_report_number: {
		/* List of things your pet likes to do */

		type: Number,
		required: true,
	},
	report_number: {
		/* List of things your pet does not like to do */

		type: Number,
		required: true,
	},
	investigation_report: {
		type: String,
	},
});

export default mongoose.models.Incident ||
	mongoose.model('Incident', IncidentSchema);
