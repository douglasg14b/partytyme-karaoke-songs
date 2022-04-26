import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';

import React, { TouchEvent, useRef, useState } from 'react';

interface Props {
	open: boolean;
	autoHideDuration: number;
	onClose: () => void;
	message: React.ReactNode;
	action: React.ReactNode;
}

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="left" enter={false} />;
}

function TransitionGrow(props: TransitionProps) {
	return <Grow {...props} />;
  }
  

/** A snackbar that id dismissable by swiping */
export function SwipeableSnackbar({ open, autoHideDuration, onClose, message, action }: Props) {
	const [dragX, setDragX] = useState(0)
	const [positionX, setPositionX] = useState(0)
	//const transition = useRef<React.ComponentType<TransitionProps>>(TransitionGrow);
	const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps>>(() => TransitionRight);
  
	const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
	  const startDragX = event.changedTouches[0].clientX
	  setDragX(startDragX)
	}
  
	const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
	  const endDragX = event.changedTouches[0].clientX
	  if (Math.abs(dragX - endDragX) > 50) {
		onClose()
	  }
	  setTimeout(() => {
		setPositionX(0)
	  }, 500)
	}
  
	const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
	  const positionX = event.changedTouches[0].clientX
	  setPositionX(positionX - dragX)
	}

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			message={message}
			action={action}
			TransitionComponent={transition}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		/>
	)
}