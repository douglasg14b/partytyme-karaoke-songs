import React, { useEffect } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import useMediaQuery from '@mui/material/useMediaQuery';


export function DesktopWarningSnackbar() {
	const matches = useMediaQuery('(min-width:600px)');
	const [isOpen, setIsOpen] = React.useState(false);

	useEffect(() => {
		if(matches) {
			setIsOpen(true)
		}
	}, []);

	const handleClose = (event: Event | React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
		if(reason === 'clickaway') return;
		
		setIsOpen(false)
	}

	const action = (
		<React.Fragment>
		  <IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		  >
			<CloseIcon fontSize="small" />
		  </IconButton>
		</React.Fragment>
	  );

	return (
		<Snackbar
		open={isOpen}
		onClose={handleClose}
		anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
		action={action}>
			<Alert onClose={handleClose} severity="error" variant="filled"  sx={{ width: '100%' }}>
				<Typography variant='body1' sx={{fontWeight: 'medium'}}>
					Site best viewed on mobile
				</Typography>
				
			</Alert>
		</Snackbar>
	)
}