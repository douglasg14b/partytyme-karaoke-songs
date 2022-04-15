import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';

import { green } from '@mui/material/colors';

import { Song } from './song';
import React from 'react';

import { red } from '@mui/material/colors';

import styles from './songCard.module.css'

type Props = {
    song: Song
}

export default function SongCard({ song }: Props) {
    return (
        <Card elevation={3}>
            <CardContent sx={{ py: 2, pb: 0 }} className={styles['pad-bottom']}>
				<Grid container>
					<Grid item xs={10}>
						<div>
							<Typography variant="body2" color="text.primary">
								{song.title}
							</Typography>
						</div>
						<div>
							<Typography variant="caption" color="text.secondary">
								{song.artist}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="caption" color={red[700]}>
							<code>{song.trackId}</code>
						</Typography>
					</Grid>
				</Grid>
            </CardContent>
            {/* <CardActions disableSpacing sx={{ pt: 1 }}>
                <Box sx={{display: 'flex'}} >
                    <IconButton sx={{ color: green[500] }} aria-label="complete">
                        <CheckIcon />
                    </IconButton>
                </Box>

            </CardActions> */}
        </Card>
    )
}