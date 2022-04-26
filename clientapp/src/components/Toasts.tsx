import { PlaylistDeletedToast } from "@/features/playlists/components";
import { useToast } from "@/hooks";
import React from "react";

export function Toasts() {
	const [playlistDeletedOpen, deletedEvent, handlePlaylistDeletedClose] = useToast('PlaylistDeleted');

	return (
		<React.Fragment>
			<PlaylistDeletedToast
				deleteEvent={deletedEvent}
				isOpen={playlistDeletedOpen}
				onClose={handlePlaylistDeletedClose}
				 />
		</React.Fragment>
	)
}