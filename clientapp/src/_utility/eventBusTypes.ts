import { Playlist } from "@/features/playlists/models";

export interface AddSongToPlayListDialogEvent {
	songTrackId: string
}

export interface PlaylistDeletedEvent {
	playlist: Playlist;
	index: number;
}

export interface DialogEventBusMessages {
    AddSongToPlaylist: AddSongToPlayListDialogEvent;
}
export type DialogEventMessageType = keyof DialogEventBusMessages



export interface ToastEventBusMessages {
    PlaylistDeleted: PlaylistDeletedEvent;
}
export type ToastEventMessageType = keyof ToastEventBusMessages

export declare type Handler<Payload extends any> = (payload: Payload) => void;