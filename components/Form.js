import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const Form = ({ formId, incidentForm, forNewIncident = true }) => {
	const router = useRouter();
	const contentType = 'application/json';
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');

	const [form, setForm] = useState({
		investigation_report_number: incidentForm.investigation_report_number,
		report_number: incidentForm.report_number,
		name: incidentForm.name,
		description: incidentForm.description,
		date: incidentForm.date,
		reporter_name: incidentForm.reporter_name,
		reporter_position: incidentForm.reporter_position,
		investigator_name: incidentForm.investigator_name,
		investigator_position: incidentForm.investigator_position,
		issue_resolved: incidentForm.issue_resolved,
		investigation_report: incidentForm.investigation_report,
	});

	/* The PUT method edits an existing entry in the mongodb database. */
	const putData = async (form) => {
		const { id } = router.query;
		console.log(id);

		try {
			const res = await fetch(`/api/incidents/${id}`, {
				method: 'PUT',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify(form),
			});

			// Throw error with status code in case Fetch API req failed
			if (!res.ok) {
				throw new Error(res.status);
			}

			const { data } = await res.json();

			mutate(`/api/incidents/${id}`, data, false); // Update the local data without a revalidation
			router.push('/');
		} catch (error) {
			console.log(error);
			setMessage('Failed to update incident');
		}
	};

	/* The POST method adds a new entry in the mongodb database. */
	const postData = async (form) => {
		try {
			const res = await fetch('/api/incidents', {
				method: 'POST',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify(form),
			});

			// Throw error with status code in case Fetch API req failed
			if (!res.ok) {
				throw new Error(res.status);
			}

			router.push('/');
		} catch (error) {
			console.log(error);
			setMessage('Failed to add incident');
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const value =
			target.name === 'issue_resolved' ? target.checked : target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = formValidate();
		if (Object.keys(errs).length === 0) {
			forNewIncident ? postData(form) : putData(form);
		} else {
			setErrors({ errs });
		}
	};

	/* Makes sure incident info is filled for incident investigation_report_number, report_number, name, description,  reporter name and position, and reporting date*/
	const formValidate = () => {
		let err = {};
		if (!form.investigation_report_number)
			err.investigation_report_number =
				'Investigation Report Number is required';
		if (!form.report_number) err.name = 'Report number is required';
		if (!form.name) err.name = 'Name is required';
		if (!form.description)
			err.description = 'Description of the incident is required';
		if (!form.reporter_name) err.reporter_name = 'Reporter name is required';
		if (!form.reporter_position)
			err.reporter_position = 'Reporter Position is required';
		if (!form.date) err.date = 'Incident Reporting Date is required';
		return err;
	};

	return (
		<>
			<form id={formId} onSubmit={handleSubmit} className='form-style-9'>
				<h4>{forNewIncident ? 'New Incident' : 'Edit Incident'}</h4>
				<ul>
					<label>Meta Data</label>
					<li>
						<input
							type='number'
							name='investigation_report_number'
							className='field-style field-split align-right'
							placeholder='Investigation Report Number'
							value={form.investigation_report_number}
							onChange={handleChange}
							required
						/>
						<input
							type='number'
							name='report_number'
							className='field-style field-split align-right'
							placeholder='Report Number'
							value={form.report_number}
							onChange={handleChange}
							required
						/>
						{forNewIncident && (
							<input
								type='datetime-local'
								name='date'
								value={form.date}
								onChange={handleChange}
								required
								className='field-style field-split align-left'
								placeholder='Incident Reporting Time'
							/>
						)}
					</li>
					<label>Incident Details</label>
					<li>
						<input
							type='text'
							maxLength='20'
							name='name'
							value={form.name}
							onChange={handleChange}
							required
							className='field-style field-full align-left'
							placeholder='Incident Type/Name'
						/>
					</li>
					<li>
						<textarea
							name='description'
							className='field-style'
							placeholder='Details...'
							value={form.description}
							onChange={handleChange}
							required
						/>
					</li>
					<label> Reporter </label>

					<li>
						<input
							type='text'
							name='reporter_name'
							value={form.reporter_name}
							onChange={handleChange}
							required
							className='field-style field-split align-left'
							placeholder='Full Name'
						/>
						<input
							type='text'
							name='reporter_position'
							value={form.reporter_position}
							onChange={handleChange}
							required
							className='field-style field-split align-left'
							placeholder='Position'
						/>
					</li>
					{!forNewIncident && (
						<Fragment>
							<label> Investigator </label>
							<li>
								<input
									type='text'
									name='investigator_name'
									value={form.investigator_name}
									onChange={handleChange}
									required
									className='field-style field-split align-left'
									placeholder='Full Name'
								/>
								<input
									type='text'
									name='investigator_position'
									value={form.investigator_position}
									onChange={handleChange}
									required
									className='field-style field-split align-left'
									placeholder='Role'
								/>
							</li>
							<label> Status </label>
							<li>
								<input
									type='checkbox'
									name='issue_resolved'
									checked={form.issue_resolved}
									onChange={handleChange}
								/>
								<span>{form.issue_resolved ? 'Closed' : 'Open'}</span>
							</li>
							<label>Investigation Report</label>
							<li>
								<textarea
									name='investigation_report'
									className='field-style'
									placeholder='Investigation output...'
									value={form.investigation_report}
									onChange={handleChange}
									required
								/>
							</li>
						</Fragment>
					)}
					<li>
						<input type='submit' value='Submit' />
					</li>
				</ul>
			</form>
			<p>{message}</p>
			<div>
				{Object.keys(errors).map((err, index) => (
					<li key={index}>{err}</li>
				))}
			</div>
		</>
	);
};

export default Form;
