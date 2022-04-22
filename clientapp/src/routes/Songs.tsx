import Grid from "@mui/material/Grid";
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";

import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";


import React, { } from "react";
import { Song, songsService, songsArray } from "../features/songs";
import SongCard from "../features/songs/components/songCard";
import { useRecoilValue } from "recoil";
import { songSearchResults } from "../features/songs/songState";
import SongCardCheap from "@/features/songs/components/songCardCheap";

export default function Songs() {
	const songs = songsArray.slice(0, 500);
	// const songs = useRecoilValue(songSearchResults);
	const totalSongs = songsService.totalSongCount.toLocaleString();

	return (
		<React.Fragment>
			<Grid flexGrow="1" sx={{ my: 4, mx: 0, py: 4, display: 'flex', width: 'auto', flexDirection: 'column', justifyContent: 'start', alignContent: 'center', position: 'relative' }}>
				<Grid item sx={{ mt: -2, mb: 1, flex: 0, position: 'absolute', top: '2px', width: '100%', textAlign: 'center'}}>
					Showing {songs.length}/{totalSongs} songs
				</Grid>
				{/* <Grid item sx={{flex: 1, width: '100%'}}> */}
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