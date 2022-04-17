import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


import { Song } from '../song';

import { red } from '@mui/material/colors';

import { useState } from 'react';
import React from 'react';

type Props = {
	song: Song
}

export default function SongCardId({ song }: Props) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleCopyIdClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(song.trackId);
		}

		setAnchorEl(event.currentTarget);
		setTimeout(() => {
			setAnchorEl(null);
		}, 500)
	};

	const copiedPopoverOpen = Boolean(anchorEl);

	return (
		<React.Fragment>
			<Button size="small" variant="text" color="error" sx={{ mr: -2 }} onClick={handleCopyIdClick}>
				<Typography variant="caption" color={red[700]}>
					<code>{song.trackId}</code>
				</Typography>
			</Button>
			<Popover
				elevation={0}
				transitionDuration={300}
				anchorEl={anchorEl}
				open={copiedPopoverOpen}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<Typography variant="caption">Copied!</Typography>
			</Popover>
		</React.Fragment>
	)
}