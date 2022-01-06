import Form from '../components/Form';

const NewIncident = () => {
	const incidentForm = {
		// investigation_report_number: ,
		// report_number: 0,
		name: '',
		description: '',
		date: '',
		reporter_name: '',
		reporter_position: '',
		investigator_name: '',
		investigator_position: '',
		issue_resolved: false,
		investigation_report: '',
	};

	return <Form formId='add-incident-form' incidentForm={incidentForm} />;
};

export default NewIncident;
