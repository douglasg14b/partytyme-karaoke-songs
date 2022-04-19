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
const tryGetMigratedStorage = (key: string, previousKeys?: string[]) => {
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


const localStorageEffect = (key: string, previousKeys?: string[]) => ({setSelf, onSet}: any) => {

	const savedValue = tryGetMigratedStorage(key, previousKeys);

	if (savedValue != null) {
	  setSelf(JSON.parse(savedValue));
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