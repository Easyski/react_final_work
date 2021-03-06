const getAltitude = async (lat: number, lng: number): Promise<number> => {
	try {
		const req = await fetch(
			`https://easyski-api-final-work.herokuapp.com/alt?lat=${lat}&lng=${lng}`
		);
		const { alt } = await req.json();
		return alt as number;
	} catch (error: any) {
		return -1;
	}
};

export { getAltitude };
