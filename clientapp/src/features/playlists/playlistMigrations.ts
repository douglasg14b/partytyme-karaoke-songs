import { uuidv4 } from "@/_utility";
import { Playlist } from "./models";


const migrations: Record<string, (items: any[]) => Playlist[]> = {
	'v0-v1': (items: any[]) => {
		const output: Playlist[] = [];

		items.forEach((item) => {
			output.push({
				id: item.id || uuidv4(),
				name: item.name,
				default: item.default,
				deleted: item.deleted,
				songs: item.songs
			})
		})

		return output;
	}
}

class PlaylistMigrator {
	public static migrate(fromVersion: number, toVersion: number, models: any[]) {
		const migration = migrations[`v${fromVersion}-v${toVersion}`];

		if(!migration) {
			console.error(`Invalid Playlist migration attempted. No migrator found. From version ${fromVersion} to ${toVersion}`);
		}

		return migration(models);
	}
}

export {
	PlaylistMigrator
}