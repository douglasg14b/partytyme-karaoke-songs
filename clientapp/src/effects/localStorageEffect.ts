import { PlaylistMigrator } from "@/features/playlists/playlistMigrations";
import { VERSION } from "@/_globals/globals";



const tryMigrateModels = (key: string) => {
	let modelVersionJson = localStorage.getItem(`${key}-version`);
	const modelVersion = modelVersionJson ? JSON.parse(modelVersionJson) as number : 0;

	// No need to migrate
	if(modelVersion === VERSION) {
		return;
	}

	let currentModels = getLocalStorageItem(key);
	let newModels = null;
	if(!currentModels) {
		return;
	}

	switch(key) {
		case 'atomPlaylists':
			newModels = PlaylistMigrator.migrate(modelVersion, VERSION, currentModels);
			break;
		default:
			return;
	}

	localStorage.setItem(key, JSON.stringify(newModels));
	localStorage.setItem(`${key}-version`, `${VERSION}`);
}

const getLocalStorageItem = (key: string) => {
	const json = localStorage.getItem(key);

	if(json === null) return null;

	return JSON.parse(json);
}

const getExistingStorage = (keys: string[]) => {
	for(let i = 0; i < keys.length; i++) {
		const existing = localStorage.getItem(keys[i]);
		if(existing) {
			return {key: keys[i], value: existing};
		}
	}

	return null
}

/** Will safely retrieve the localStorage value when the key has changed */
const tryGetKeyedStorage = (key: string, previousKeys?: string[]) => {
	// 1. Try and get expected value
	// 2. If it exists, return early
	// 3. Otherwise, try and get previous keys
	// 4. If previous key is retrieved, remove that key and set as new key
	let existing = localStorage.getItem(key);
	if(existing) return existing;
	
	// No existing, no previous keys
	if(!previousKeys) return null;

	// try get previous key value
	const previousItem = getExistingStorage(previousKeys);
	if(!previousItem) return null;

	// previous item found, remove old key, set value to current key
	localStorage.removeItem(previousItem.key);
	localStorage.setItem(key, previousItem.value);

	return previousItem.value;
}

/** Gets the localstorage value by migrating the key, and migrating the model schema*/
const tryGetMigratedStorage = (key: string, previousKeys?: string[]) => {
	// Redundant, but that's okay, this call will setup the correct storage key
	const existing = tryGetKeyedStorage(key, previousKeys);

	if(existing) {
		tryMigrateModels(key);
	} else {
		return existing
	}

	// We already have a new key set here, so we can use this
	return getLocalStorageItem(key)
}


const localStorageEffect = <TItem>(key: string, previousKeys?: string[]) => ({setSelf, onSet}: any) => {

	const savedValue = tryGetMigratedStorage(key, previousKeys);

	if (savedValue != null) {
	  setSelf(savedValue);
	}

	// Handle on set for the atom
	onSet((newValue: any, _: any, isReset: boolean) => {
	  isReset
		? localStorage.removeItem(key)
		: localStorage.setItem(key, JSON.stringify(newValue));
	});
};

export {
	localStorageEffect
}