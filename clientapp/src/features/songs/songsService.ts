import { Song } from './song';
import dataJson from './songs.json';

const songsArray: Song[] = dataJson as unknown as Song[]
const songsHash = new Map(songsArray.map((song) => [song.trackId, song]))

export class SongsService {
	private searchResults: Song[] = [];

	public getSong(trackId: string) {
		return songsHash.get(trackId);
	}

	public search(term: string) {
		term = term?.toLowerCase() || '';
		const matches = [];

		for(let i = 0; i < songsArray.length; i++) {
			if(matches.length >= 25) break;

			if(this.isMatch(term, songsArray[i])) {
				matches.push(songsArray[i]);
			}
		}

		this.searchResults = matches;

		return matches;
	}

	private isMatch(term: string, song: Song) {
		try {
			return song.artist.toString().toLowerCase().includes(term) ||
				song.title.toString().toLowerCase().includes(term);
		} catch(e){
			console.error(e, song)
			return false
		}
	}
}

const songsService = new SongsService();

export {
	songsService,
	songsArray,
	songsHash
}