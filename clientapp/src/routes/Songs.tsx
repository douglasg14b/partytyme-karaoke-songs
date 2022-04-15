import Grid from "@mui/material/Grid";
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";


import React, {  } from "react";
import { Song } from "../features/songs";
import SongCard from "../features/songs/songCard";
import { useRecoilValue } from "recoil";
import { songSearchResults } from "../features/songs/songState";

const columns: GridColDef[] = [
	{ field: 'artist', headerName: 'Artist', filterable: false, hideable: false },
	{ field: 'title', headerName: 'Title', filterable: false, hideable: false },
	{ field: 'trackId', headerName: 'Id', sortable: false, hideable: false, filterable: false },
  ];

const handleGetRowId = (row: Song) => {
	return row.trackId;
}
export default function Tasks() {

	const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
	const songs = useRecoilValue(songSearchResults);

	const handleSelection = (newSelectionModel: GridSelectionModel) => {
		setSelectionModel(newSelectionModel);
	  }

    return (
		<React.Fragment>
			<Grid container flexGrow="1" sx={{ m: 4, mb: 0, pb: 4, width: 'auto', justifyContent: 'center', position: 'relative'}}>
				{/* <DataGrid 
					autoHeight {...songs}
					rows={songs} 
					columns={columns} 
					checkboxSelection
					onSelectionModelChange={handleSelection}
					selectionModel={selectionModel}
					density={'compact'}
					getRowId={handleGetRowId}
					/> */}
					<Stack spacing={2} sx={{ width: '100%', flexWrap: 'nowrap' }}>
						{songs.map((song) => (
							<SongCard song={song} key={song.trackId} />
						))}
					</Stack>
			</Grid>
		</React.Fragment>

    );
}