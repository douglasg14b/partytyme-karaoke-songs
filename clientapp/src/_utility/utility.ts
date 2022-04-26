function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
	return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function moveItem(arr: any[], itemIndex: number, targetIndex: number){
	let itemRemoved = arr.splice(itemIndex, 1);
	arr.splice(targetIndex, 0, itemRemoved[0]);
	return arr;
  }

export {
	replaceItemAtIndex,
	removeItemAtIndex,
	moveItem
}