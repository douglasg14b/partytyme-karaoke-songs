import React from "react";

import { AddSongToPlaylistDialog } from "@/features/playlists/components";
import { useDialog } from "@/hooks";

export function Dialogs() {
	const [addSongOpen, addSongEvent, handleAddSongClose] = useDialog('AddSongToPlaylist');

	return (
		<React.Fragment>
			{(addSongOpen && addSongEvent) && <AddSongToPlaylistDialog trackId={addSongEvent.songTrackId} isOpen={addSongOpen} onClose={handleAddSongClose} />}
		</React.Fragment>
	)
}