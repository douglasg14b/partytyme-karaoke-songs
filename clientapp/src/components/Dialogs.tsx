import { AddSongToPlayListDialogEvent, DialogEventBusMessages, DialogEventMessageType, Handler } from "@/_utility";
import React, { useEffect, useState } from "react";

import useEventBus from '@jeyz/event-bus'
import { AddSongToPlaylistDialog } from "@/features/playlists/components";

type UseDialogReturn<TEventType extends DialogEventMessageType> = [
	boolean, 
	DialogEventBusMessages[TEventType] | null, 
	() => void
]

function useDialog<TEventType extends DialogEventMessageType>(eventType: DialogEventMessageType): UseDialogReturn<TEventType> {
	const eventBus = useEventBus<DialogEventBusMessages>();
	const [isOpen, setIsOpen] = useState(false);
	const [event, setEvent] = useState<DialogEventBusMessages[DialogEventMessageType] | null>(null)

	useEffect(() => {
        const listener = eventBus.subscribe(eventType, dialogEventHandler);
        return () => {
            listener.unsubscribe();
        };
    }, []);

	const dialogEventHandler = (event: AddSongToPlayListDialogEvent) => {
		setEvent(event);
		setIsOpen(true);
	}

	const handleClose = () => {
		setEvent(null);
		setIsOpen(false);
	}

	return [
		isOpen,
		event,
		handleClose,
	]
}

export function Dialogs() {
	const [addSongOpen, addSongEvent, handleAddSongClose] = useDialog('AddSongToPlaylist');

	return (
		<React.Fragment>
			{(addSongOpen && addSongEvent) && <AddSongToPlaylistDialog trackId={addSongEvent.songTrackId} isOpen={addSongOpen} onClose={handleAddSongClose} />}
		</React.Fragment>
	)
}