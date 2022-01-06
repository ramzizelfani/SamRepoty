import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Incident from '../../models/Incident';
import {
	CssBaseline,
	Container,
	Typography,
	Divider,
	Button,
	Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/system';

/* Allows you to view incident card info and delete Incident card*/
const IncidentPage = ({ incident }) => {
	const router = useRouter();
	const [message, setMessage] = useState('');
	const handleDelete = async () => {
		const incidentID = router.query.id;

		try {
			await fetch(`/api/incidents/${incidentID}`, {
				method: 'Delete',
			});
			router.push('/');
		} catch (error) {
			setMessage('Failed to delete this incident.');
		}
	};

	return (
		<Fragment>
			<CssBaseline />
			<Container m={'2rem'}>
				<Typography
					color={'red'}
					fontWeight={'800'}
					fontSize={'2rem'}
					letterSpacing={'.5rem'}
					textAlign={'center'}
					mt={'2rem'}
				>
					INCIDENT DETAILS
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: 'center',
						justifyContent: 'space-between',
						bgcolor: 'background.paper',
						overflow: 'hidden',
						borderRadius: '12px',
						boxShadow: 1,
						fontWeight: 'bold',
					}}
				>
					<Box component='span' sx={{ color: 'blue', fontSize: 12 }}>
						Inv. Report Number: {incident.investigation_report_number}
					</Box>
					<Box component='span' sx={{ color: 'blue', fontSize: 12 }}>
						Report Number: {incident.report_number}
					</Box>

					<Box component='span' sx={{ color: 'blue', fontSize: 12 }}>
						Reporting Date: {incident.date}
					</Box>

					<Box component='span' sx={{ color: 'blue', fontSize: 12 }}>
						Status: {incident.issue_resolved ? 'Closed' : 'Open'}
					</Box>
				</Box>
				<Divider textAlign='center'>
					<Typography
						sx={{ display: 'inline' }}
						color={'blue'}
						fontWeight={'500'}
					>
						Incident Details
					</Typography>
				</Divider>
				<Stack direction={'row'} spacing={1}>
					<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
						Title:
					</Box>
					<Box>{incident.name}</Box>
				</Stack>
				<Stack direction={'row'} spacing={1}>
					<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
						Description:
					</Box>
					<Box>{incident.description}</Box>
				</Stack>
				<Divider textAlign='center'>
					<Typography
						sx={{ display: 'inline' }}
						color={'blue'}
						fontWeight={'500'}
					>
						Reporter
					</Typography>
				</Divider>
				<Stack direction={'row'} spacing={1}>
					<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
						Name:
					</Box>
					<Box>{incident.reporter_name}</Box>
				</Stack>
				<Stack direction={'row'} spacing={1}>
					<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
						Role:
					</Box>
					<Box>{incident.reporter_position}</Box>
				</Stack>
				{/* Extra Incident Info: Likes and Dislikes */}
				{incident.investigator_name && (
					<>
						<Divider textAlign='center'>
							<Typography
								sx={{ display: 'inline' }}
								color={'blue'}
								fontWeight={'500'}
							>
								Investigation Output
							</Typography>
						</Divider>
						<Stack direction={'row'} spacing={1}>
							<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
								Investigator:
							</Box>
							<Box>{incident.investigator_name}</Box>
						</Stack>
						<Stack direction={'row'} spacing={1}>
							<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
								Role:
							</Box>
							<Box>{incident.investigator_position}</Box>
						</Stack>
						<Stack direction={'row'} spacing={1}>
							<Box component='span' sx={{ color: 'blue', fontSize: 18 }}>
								Comments:
							</Box>
							<Box>{incident.investigation_report}</Box>
						</Stack>
					</>
				)}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					m={'2rem'}
				>
					<Link href='/[id]/edit' as={`/${incident._id}/edit`}>
						<Button variant='contained' color='success'>
							Edit
						</Button>
					</Link>
					<Button variant='contained' color='error' onClick={handleDelete}>
						Delete
					</Button>
				</Box>
				{message && <p>{message}</p>}
			</Container>
		</Fragment>
	);
};

export async function getServerSideProps({ params }) {
	await dbConnect();

	const incident = JSON.parse(
		JSON.stringify(await Incident.findById(params.id))
	);
	console.log(incident);
	incident._id = incident._id.toString();
	incident.date = JSON.parse(JSON.stringify(incident.date));
	return { props: { incident } };
}

export default IncidentPage;
