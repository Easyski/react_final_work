import { FC, useState } from "react";
import cn from "classnames";

import { IFormInput } from "./FormInput.types";

const FormInput: FC<IFormInput> = ({
	type,
	title,
	required,
	extraStyle,
	value,
	onChange,
}) => {
	const [typing, setTyping] = useState<boolean>(false);

	const handleOnChange = (e: any) => {
		!typing && setTyping(true);
		onChange(e.target.value);
	};

	return (
		<input
			type={type}
			placeholder={title}
			className={cn("input input-form", extraStyle, {
				invalid: typing && !value,
			})}
			required={required}
			onChange={handleOnChange}
			value={value}
		/>
	);
};

export default FormInput;
