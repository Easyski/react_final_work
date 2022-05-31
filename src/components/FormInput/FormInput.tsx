import { forwardRef, useEffect, useState } from "react";
import cn from "classnames";

import { IFormInput } from "./FormInput.types";

const FormInput = forwardRef<HTMLInputElement, IFormInput>(
	({ type, title, required, extraStyle, value }, ref) => {
		const [inputValue, setInputValue] = useState<string>("");
		const [typing, setTyping] = useState<boolean>(false);

		const handleOnChange = (e: any) => {
			!typing && setTyping(true);
			setInputValue(e.target.value);
		};

		useEffect(() => {
			value && setInputValue(value);
		}, [value]);

		return (
			<input
				type={type}
				placeholder={title}
				className={cn("input input-form", extraStyle, {
					invalid: typing && !inputValue,
				})}
				ref={ref}
				required={required}
				onChange={handleOnChange}
				value={inputValue}
			/>
		);
	}
);

export default FormInput;
