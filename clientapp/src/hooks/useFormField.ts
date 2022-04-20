import { useEffect, useState } from "react";
import { useDidMount } from "./useDidMount";

type FieldRuleCallback = (val: string) => string | boolean

type UseFormFieldReturn = [
	string,
	string | boolean,
	(event: React.ChangeEvent<HTMLInputElement>) => void
]

export function useFormField(initialValue: string, rules: FieldRuleCallback[]): UseFormFieldReturn {
	const didMount = useDidMount()
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState<string | boolean>('');

	useEffect(() => {
		if(!didMount) {
			return
		}
		
		let effectError: string | boolean = false;
		for (let i = 0; i < rules.length; i++) {
			const ruleResult = rules[i](value)
			if(ruleResult !== true) {
				effectError = ruleResult || true;
				break;
			}
		}

		// true means no error, so set to blank
		setError(effectError === true ? '' : effectError);
	}, [value, didMount, rules])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}

	return [
		value,
		error,
		handleChange
	]
}