import { PlaylistDeletedEvent, ToastEventBusMessages, ToastEventMessageType } from "@/_utility";
import { useEffect, useState } from "react";

import useEventBus from '@jeyz/event-bus'

type UseToastReturn<TEventType extends ToastEventMessageType> = [
	boolean, 
	ToastEventBusMessages[TEventType] | null, 
	() => void
]

export function useToast<TEventType extends ToastEventMessageType>(eventType: ToastEventMessageType): UseToastReturn<TEventType> {
	const eventBus = useEventBus<ToastEventBusMessages>();
	const [isOpen, setIsOpen] = useState(false);
	const [event, setEvent] = useState<ToastEventBusMessages[ToastEventMessageType] | null>(null)

	useEffect(() => {
        const listener = eventBus.subscribe(eventType, toastEventHandler);
        return () => {
            listener.unsubscribe();
        };
    }, []);

	const toastEventHandler = (event: PlaylistDeletedEvent) => {
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