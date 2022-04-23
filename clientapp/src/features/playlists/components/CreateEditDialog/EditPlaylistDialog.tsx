import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Playlist } from '@/features/playlists/models';
import { useState } from 'react';
import { removeItemAtIndex, replaceItemAtIndex, uuidv4 } from '@/_utility';
import { PlaylistNameField } from './PlaylistNameField';
import { usePlaylistForm } from './usePlaylistForm';

interface Props {
	playlistId: string
	isOpen: boolean,
	onClose: () => void
}

export function EditPlaylistDialog({ playlistId, isOpen, onClose }: Props) {
	const [error, setError] = useState<string | boolean>('');

	const {
		playlists,
		existingPlaylist,
		name,
		isDefault,
		defaultSwitchDisabled,
		setPlaylists,
		setName,
		handleDefaultChange,
	} = usePlaylistForm(playlistId);

	if(!existingPlaylist) {
		throw new Error('Cannot edit playlist that does not exist')
	}

	const handleClose = () => {
		onClose();
	};

	const handleDelete = () => {
		const index = playlists.findIndex((x) => x.id === playlistId)
		const newPlaylists = removeItemAtIndex(playlists, index);

		setPlaylists(newPlaylists)
		onClose();
	}

	const handleSave = () => {
		const replacedPlaylist: Playlist = {
			id: existingPlaylist.id,
			name: name,
			default: isDefault,
			deleted: existingPlaylist.deleted,
			songs: existingPlaylist.songs
		}

		const index = playlists.findIndex((x) => x.id === playlistId)
		const newPlaylists = replaceItemAtIndex(playlists, index, replacedPlaylist);

		setPlaylists(newPlaylists)
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth='md' fullWidth>
			<DialogTitle sx={{ textAlign: 'center', pb: 1 }}>Edit Playlist</DialogTitle>
			<DialogContent sx={{ pt: 0, pb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<PlaylistNameField playlist={existingPlaylist} value={name} onError={setError} onChange={setName}/>
				<FormControlLabel control={
					<Switch checked={isDefault} onChange={handleDefaultChange} color="warning" disabled={defaultSwitchDisabled} />
				} label="Default" />
			</DialogContent>
			<DialogActions sx={{ py: 1 }}>
				<Button color='error' disabled={isDefault} onClick={handleDelete}>Delete</Button>
				<div style={{flex: 1}}></div>
				<Button color="inherit" onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave} disabled={!!error || !name.length}>Save</Button>
			</DialogActions>
		</Dialog>
	);
}