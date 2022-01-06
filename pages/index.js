import List from '@mui/material/List';

import dbConnect from '../lib/dbConnect';
import Incident from '../models/Incident';
import { ListItems } from '../components/ListItems';

const Index = ({ incidents }) => (
	<List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
		<ListItems incidents={incidents} />
	</List>
);

/* Retrieves incident(s) data from mongodb database */
export async function getServerSideProps() {
	await dbConnect();

	/* find all the data in our database */
	const result = await Incident.find({});
	const incidents = result.map((doc) => {
		const incident = doc.toObject();
		incident._id = incident._id.toString();
		incident.date = JSON.parse(JSON.stringify(incident.date));

		return incident;
	});

	return { props: { incidents: incidents } };
}

export default Index;
