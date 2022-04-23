import Grid from "@mui/material/Grid";
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";

import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import ClearIcon from '@mui/icons-material/Clear';

import React, { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import { Song, songsService, songsArray, artists } from "../features/songs";
import SongCard from "../features/songs/components/songCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedArtistState, songSearchResults } from "../features/songs/songState";
import SongCardCheap from "@/features/songs/components/songCardCheap";

interface ArtistsSearchProps {
	onChange: (value: string) => void
}

function ArtistsSearch({ value, onChange }: ArtistsSearchProps) {
	const artistsArray = ['', ...Array.from(artists.keys())];

	const handleChange = (event: any, value: any) => {
		onChange(value)
	}

	const filterOptions = createFilterOptions({
		limit: 25
	});

	const getOptionLabel = (option: unknown) => {
		return `${option}`;
	}

	const checkEquality = (option: unknown, value: unknown) => {
		// eslint-disable-next-line eqeqeq
		return option == value;
	}

	return (
		<Autocomplete
			value={value}
			onChange={handleChange}
			size="small"
			blurOnSelect
			filterOptions={filterOptions}
			isOptionEqualToValue={checkEquality}
			options={artistsArray}
			getOptionLabel={getOptionLabel}
			clearIcon={<ClearIcon sx={{visibility: 'visible'}} />}
			renderInput={(params) => <TextField {...params} color="primary" variant="outlined" label="Artist" sx={{ background: 'white' }} />} />
	)
}

export default function Songs() {
	// const songs = songsArray.slice(0, 500);
	const [selectedArtist, setSelectedArtist] = useRecoilState(selectedArtistState);
	const songs = useRecoilValue(songSearchResults);
	const visibleSongs = songs.length.toLocaleString();
	const totalSongs = songsService.totalSongCount.toLocaleString();

	return (
		<React.Fragment>
			<Grid flexGrow="1" sx={{ my: 3, mx: 0, py: 4, display: 'flex', width: 'auto', flexDirection: 'column', justifyContent: 'start', alignContent: 'center', position: 'relative' }}>
				<Grid item sx={{ mt: -2, mb: 1, flex: 0, position: 'absolute', top: '2px', width: '100%', textAlign: 'center' }}>
					Showing {visibleSongs}/{totalSongs} songs
				</Grid>
				<Grid item sx={{ mx: 6, px: 2, my: 2 }}>
					<ArtistsSearch value={selectedArtist} onChange={setSelectedArtist} />
				</Grid>
				<Divider/>
				<Grid item sx={{flex: 1}}>
					<AutoSizer>
						{({ height, width }) => (
							<List
								height={height}
								itemCount={songs.length}
								itemSize={56 + 16}
								width={width}
								useIsScrolling
							>
								{({ index, isScrolling, style }) =>
									<Grid item sx={{ my: 2 }} style={{
										...style,
										left: (style.left as number) + 16,
										width: `calc(${style.width} - 36px)`,
									}}>
										{isScrolling
											? <SongCardCheap song={songs[index]} key={songs[index].trackId} />
											: <SongCard song={songs[index]} key={songs[index].trackId} />
										}
									</Grid>
								}
							</List>
						)}
					</AutoSizer>
				</Grid>
				{/* <Grid item sx={{flex: 1, width: '100%'}}> */}

				{/* </Grid> */}


				{/* <Stack spacing={2} sx={{ width: '100%', flexWrap: 'nowrap', height: '100%' }}>
					{songs.map((song) => (
						<SongCard song={song} key={song.trackId} />
					))}
				</Stack> */}
			</Grid>
		</React.Fragment>

	);
}