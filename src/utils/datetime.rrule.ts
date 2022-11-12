export const datetime = function (y: number, m: number, d: number, h = 0, i = 0, s = 0) {
	return new Date(Date.UTC(y, m - 1, d, h, i, s));
};
