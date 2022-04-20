import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Playlist } from '@/features/playlists/models';
import { useState } from 'react';
import { uuidv4 } from '@/_utility';
import { PlaylistNameField } from './PlaylistNameField';
import { usePlaylistForm } from './usePlaylistForm';

interface Props {
	isOpen: boolean,
	onClose: () => void
}

export function CreatePlaylistDialog({ isOpen, onClose }: Props) {
	const [name, setName] = useState('');
	const [error, setError] = useState<string | boolean>('');

	const {
		playlists,
		isDefault,
		defaultSwitchDisabled,
		setPlaylists,
		handleDefaultChange,
	} = usePlaylistForm('');

	const handleClose = () => {
		onClose();
	};

	const handleSave = () => {
		const newPlaylist: Playlist = {
			id: uuidv4(),
			name: name,
			default: isDefault,
			deleted: false,
			songs: []
		}

		setPlaylists([...playlists, newPlaylist])
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth='md' fullWidth>
			<DialogTitle sx={{ textAlign: 'center', pb: 1 }}>Create Playlist</DialogTitle>
			<DialogContent sx={{ pt: 0, pb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<PlaylistNameField value={name} onError={setError} onChange={setName}/>
				<FormControlLabel control={
					<Switch checked={isDefault} onChange={handleDefaultChange} color="warning" disabled={defaultSwitchDisabled} />
				} label="Default" />
			</DialogContent>
			<DialogActions sx={{ py: 1 }}>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave} disabled={!!error || !name.length}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}