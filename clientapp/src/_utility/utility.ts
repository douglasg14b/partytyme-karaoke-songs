function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
	return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export {
	replaceItemAtIndex,
	removeItemAtIndex
}