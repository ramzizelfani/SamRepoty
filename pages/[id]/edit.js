import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url) =>
	fetch(url)
		.then((res) => res.json())
		.then((json) => json.data);

const EditIncident = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: incident, error } = useSWR(
		id ? `/api/incidents/${id}` : null,
		fetcher
	);

	if (error) return <p>Failed to load</p>;
	if (!incident) return <p>Loading...</p>;

	const incidentForm = {
		investigation_report_number: incident.investigation_report_number,
		report_number: incident.report_number,
		name: incident.name,
		description: incident.description,
		date: incident.date,
		reporter_name: incident.reporter_name,
		reporter_position: incident.reporter_position,
		investigator_name: incident.investigator_name,
		investigator_position: incident.investigator_position,
		issue_resolved: incident.issue_resolved,
		investigation_report: incident.investigation_report,
	};

	return (
		<Form
			formId='edit-incident-form'
			incidentForm={incidentForm}
			forNewIncident={false}
		/>
	);
};

export default EditIncident;
