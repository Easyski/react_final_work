const getAltitude = async (lat: number, lng: number): Promise<number> => {
	const req = await fetch(`http://localhost:3001/alt?lat=${lat}&lng=${lng}`);
	const { alt } = await req.json();
	if (alt) return alt as number;
	return -1;
};

export { getAltitude };
