import { AddSongToPlayListDialogEvent, DialogEventBusMessages, DialogEventMessageType } from "@/_utility";
import { useEffect, useState } from "react";

import useEventBus from '@jeyz/event-bus'

type UseDialogReturn<TEventType extends DialogEventMessageType> = [
	boolean, 
	DialogEventBusMessages[TEventType] | null, 
	() => void
]

export function useDialog<TEventType extends DialogEventMessageType>(eventType: DialogEventMessageType): UseDialogReturn<TEventType> {
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