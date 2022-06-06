const getAltitude = async (lat: number, lng: number): Promise<number> => {
	// const req = await fetch(
	// 	`https://api.opentopodata.org/v1/aster30m?locations=${lat},${lng}`
	// );
	// const res = await req.json();
	// console.log(res);
	return Math.floor(Math.random() * 50000000) / 10000;
};

export { getAltitude };
