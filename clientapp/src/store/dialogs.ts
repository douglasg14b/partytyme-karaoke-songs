import { atom, selector } from "recoil";

const addToPlaylistDialog = {
	dialogOpenState: atom({
		key: 'addToPlaylistDialogOpen', // unique ID (with respect to other atoms/selectors)
		default: false, // default value (aka initial value)
	})
}

export {
	addToPlaylistDialog
}
