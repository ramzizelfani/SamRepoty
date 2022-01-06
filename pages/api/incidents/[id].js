import dbConnect from '../../../lib/dbConnect';
import Incident from '../../../models/Incident';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const incident = await Incident.findById(id);
				if (!incident) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: incident });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const incident = await Incident.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!incident) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: incident });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const deletedIncident = await Incident.deleteOne({ _id: id });
				if (!deletedIncident) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
