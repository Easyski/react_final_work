const getAltitude = async (lat: number, lng: number): Promise<number> => {
	// const req = await fetch(
	// 	`https://api.opentopodata.org/v1/aster30m?locations=${lat},${lng}`
	// );
	// const res = await req.json();
	// console.log(res);
	return (Math.random() * 5000000) / 1000;
};

export { getAltitude };
