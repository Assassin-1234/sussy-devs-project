/* eslint-disable no-mixed-spaces-and-tabs */
const array = [];
const charCodeCache = [];

const leven = (left, right) => {
	if (left === right) {
		return 0;
	}

	const swap = left;
	if (left.length > right.length) {
		left = right;
		right = swap;
	}

	let leftLength = left.length;
	let rightLength = right.length;
	while (
		leftLength > 0 &&
    left.charCodeAt(~-leftLength) === right.charCodeAt(~-rightLength)
	) {
		leftLength--;
		rightLength--;
	}
	let start = 0;

	while (
		start < leftLength &&
    left.charCodeAt(start) === right.charCodeAt(start)
	) {
		start++;
	}

	leftLength -= start;
	rightLength -= start;

	if (leftLength === 0) {
		return rightLength;
	}

	let bCharCode;
	let result;
	let temp;
	let temp2;
	let i = 0;
	let j = 0;

	while (i < leftLength) {
		charCodeCache[i] = left.charCodeAt(start + i);
		array[i] = ++i;
	}

	while (j < rightLength) {
		bCharCode = right.charCodeAt(start + j);
		temp = j++;
		result = j;

		for (i = 0; i < leftLength; i++) {
			temp2 = bCharCode === charCodeCache[i] ? temp : temp + 1;
			temp = array[i];
			// eslint-disable-next-line no-multi-assign
			result = array[i] =
        temp > result
        	? temp2 > result
        		? result + 1
        		: temp2
        	: temp2 > temp
        		? temp + 1
        		: temp2;
		}
	}

	return result;
};

module.exports = leven;