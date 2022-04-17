import Grid from "@mui/material/Grid";
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";


import React, {  } from "react";
import { Song } from "../features/songs";
import SongCard from "../features/songs/components/songCard";
import { useRecoilValue } from "recoil";
import { songSearchResults } from "../features/songs/songState";

export default function Songs() {

	const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
	const songs = useRecoilValue(songSearchResults);

	const handleSelection = (newSelectionModel: GridSelectionModel) => {
		setSelectionModel(newSelectionModel);
	  }

    return (
		<React.Fragment>
			<Grid container flexGrow="1" sx={{ m: 4, pb: 4, width: 'auto', justifyContent: 'center', position: 'relative'}}>
					<Stack spacing={2} sx={{ width: '100%', flexWrap: 'nowrap' }}>
						{songs.map((song) => (
							<SongCard song={song} key={song.trackId} />
						))}
					</Stack>
			</Grid>
		</React.Fragment>

    );
}