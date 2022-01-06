import dbConnect from '../../../lib/dbConnect';
import Incident from '../../../models/Incident';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const incidents = await Incident.find(
					{}
				); /* find all the data in our database */
				res.status(200).json({ success: true, data: incidents });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const incident = await Incident.create(
					req.body
				); /* create a new model in the database */
				res.status(201).json({ success: true, data: incident });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
