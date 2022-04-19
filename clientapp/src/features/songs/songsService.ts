import { Song } from './song';
import dataJson from './songs.json';

const collator = new Intl.Collator();
const songsArray: Song[] = (dataJson as unknown as Song[]).sort((a, b) => {
	return collator.compare(a.artist, b.artist)
})
const songsHash = new Map(songsArray.map((song) => [song.trackId, song]))

export class SongsService {
	private resultSetSize = 25;
	private searchResults: Song[] = [];

	get totalSongCount() {
		return songsArray.length;
	}

	public getSong(trackId: string) {
		return songsHash.get(trackId);
	}

	public search(term: string) {
		term = term?.toLowerCase() || '';
		const matches = [];

		for(let i = 0; i < songsArray.length; i++) {
			if(matches.length >= this.resultSetSize) break;

			if(this.isMatch(term, songsArray[i])) {
				matches.push(songsArray[i]);
			}
		}

		this.searchResults = matches;

		return matches;
	}

	private isMatch(term: string, song: Song) {
		

		try {
			// const parts = term.trim().split(' ');

			// const artist = song.artist.toString().toLowerCase();
			// const title = song.title.toString().toLowerCase();


			// for(let i = 0; i < parts.length; i++){
			// 	if(artist.includes(parts[i]) || title.includes(parts[i])) {
			// 		return true;
			// 	}
			// }

			// return false;
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