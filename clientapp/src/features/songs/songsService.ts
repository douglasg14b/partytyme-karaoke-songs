import { Song } from './song';
import dataJson from './songs.json';

const collator = new Intl.Collator();
const songsArray: Song[] = (dataJson as unknown as Song[]).sort((a, b) => {
	return collator.compare(a.artist, b.artist)
})
const songsHash = new Map(songsArray.map((song) => [song.trackId, song]))
const artists = new Set(songsArray.map((song) => song.artist))

export class SongsService {
	private resultSetSize = 1500;
	private searchResults: Song[] = [];

	get totalSongCount() {
		return songsArray.length;
	}

	public getSong(trackId: string) {
		return songsHash.get(trackId);
	}

	public search(term: string, artist?: string) {
		term = term?.toLowerCase() || '';
		const matches = [];

		for(let i = 0; i < songsArray.length; i++) {
			if(matches.length >= this.resultSetSize) break;

			if(this.isMatch(songsArray[i], term, artist)) {
				matches.push(songsArray[i]);
			}
		}

		this.searchResults = matches;

		return matches;
	}

	private isMatch(song: Song, term: string, artist?: string) {
		try {
			// eslint-disable-next-line eqeqeq
			if(artist && song.artist != artist) return false;
			if(!term) return true;

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
	songsHash,
	artists
}