import * as React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import LoupeIcon from '@mui/icons-material/Loupe';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';

export const ListItems = ({ incidents }) => {
	const router = useRouter();
	async function handleClick(value) {
		console.log(value);
		let newPath = `/${value._id}`;
		await router.push(newPath);
		return;
	}
	return incidents.map((incident) => (
		<ListItem
			key={incident._id}
			role={undefined}
			dense
			button
			onClick={() => handleClick(incident)}
		>
			<ListItemText primary='Incident:' secondary={incident.name} />
			<ListItemText
				primary='Status'
				secondary={!incident.issue_resolved ? 'OPEN' : 'CLOSED'}
			/>
			<ListItemText primary='Reporting Date' secondary={incident.date} />
			<ListItemSecondaryAction>
				<IconButton onClick={() => handleClick(incident)}>
					<LoupeIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));
};
