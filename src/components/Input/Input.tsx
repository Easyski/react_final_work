import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { IInput } from "./Input.types";

const Input: FC<IInput> = ({
	value,
	label,
	readOnly,
	type,
	extraStyle,
	onSubmit,
}) => {
	const [inputValue, setInputValue] = useState<string>("");

	useEffect(() => {
		value && setInputValue(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e: any) => {
		if (onSubmit) onSubmit(inputValue);
	};

	const handleOnChange = (e: any) => {
		!readOnly && setInputValue(e.target.value);
	};

	return (
		<label htmlFor={label} className="label font-sm color-grey">
			{label} <br />
			<input
				id={label}
				className={cn(
					"input profile-input",
					{ underline: !readOnly },
					{ extraStyle }
				)}
				value={inputValue}
				readOnly={readOnly}
				onChange={handleOnChange}
				type={type}
				onSubmit={handleSubmit}
			/>
		</label>
	);
};

export default Input;
