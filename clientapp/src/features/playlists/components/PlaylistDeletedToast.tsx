import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';

import { PlaylistDeletedEvent } from '@/_utility';
import { useRecoilState } from 'recoil';
import { atomPlaylists } from '../recoil';
import { SwipeableSnackbar } from '@/components';


interface Props {
	deleteEvent: PlaylistDeletedEvent | null
	isOpen: boolean,
	onClose: () => void
}

export function PlaylistDeletedToast({ deleteEvent, isOpen, onClose }: Props) {
	const [playlists, setPlaylists] = useRecoilState(atomPlaylists);

	const handleUndo = (event: React.SyntheticEvent | Event, reason?: string) => {
		if(!deleteEvent) return;

		if(deleteEvent.index > playlists.length - 1) {
			setPlaylists([...playlists, deleteEvent.playlist]);
		} else {
			const clone = [...playlists];
			clone.splice(deleteEvent.index, 0, deleteEvent.playlist)
			setPlaylists(clone);
		}

		onClose();
	};

	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleUndo}>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={onClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<SwipeableSnackbar
			open={isOpen}
			autoHideDuration={6000}
			onClose={onClose}
			message="Playlist Removed"
			action={action}
		/>
	)
}