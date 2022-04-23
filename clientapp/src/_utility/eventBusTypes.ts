export interface AddSongToPlayListDialogEvent {
	songTrackId: string
}

export interface DialogEventBusMessages {
    AddSongToPlaylist: AddSongToPlayListDialogEvent;
}


export type DialogEventMessageType = keyof DialogEventBusMessages
export declare type Handler<Payload extends any> = (payload: Payload) => void;