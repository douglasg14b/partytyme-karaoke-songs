import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";

import AddIcon from '@mui/icons-material/Add';

import React, { useState } from "react";
import { PlaylistCard, Playlist, playlistsState, CreatePlaylistDialog } from "@/features/playlists";
import { useRecoilState } from "recoil";
import { SxProps } from "@mui/material/styles";

const fabStyle = {
	position: 'absolute',
	bottom: 'calc(56px + 18px)',
	right: 0,
	left: 0,
	margin: 'auto'
  };

export default function Playlists() {

	const [playlists, setPlaylists] = useRecoilState<Playlist[]>(playlistsState);
	const [dialogOpen, setDialogOpen] = useState(false)

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

    return (
		<React.Fragment>
			<Grid container flexGrow="1" sx={{ m: 4, pb: 4, width: 'auto', justifyContent: 'center', position: 'relative'}}>
				<Stack spacing={2} sx={{ width: '100%', flexWrap: 'nowrap' }}>
					{playlists.map((playlist) => (
						<PlaylistCard playlist={playlist} key={playlist.name} />
					))}
				</Stack>
			</Grid>
			<Fab color="green400" disabled sx={fabStyle as SxProps} aria-label="add" onClick={handleDialogOpen}>
				<AddIcon htmlColor="white" />
			</Fab>
			<CreatePlaylistDialog isOpen={dialogOpen} onClose={handleDialogClose}></CreatePlaylistDialog>
		</React.Fragment>

    );
}