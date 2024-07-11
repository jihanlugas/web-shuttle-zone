import { isEmpty, isEmptyObject, typeCheck } from '@/utils/validate';


export const convertJsonData = (json) => {
	var datePattern = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d*)?Z/);
	// var moneyPattern = new RegExp(/^\d+\.\d{4}$/);

	Object.keys(json).forEach((jsonKey) => {
		if (typeCheck.isString(json[jsonKey]) && datePattern.test(json[jsonKey])) {
			json[jsonKey] = new Date(json[jsonKey]);
		}
		// else if (typeCheck.isString(json[jsonKey]) && moneyPattern.test(json[jsonKey])) {
		//     json[jsonKey] = toDecimal(json[jsonKey],pagingComposer.currAcct.decimalPlaces).toString();
		// }
		else if (typeCheck.isObject(json[jsonKey])) {
			json[jsonKey] = convertJsonData(json[jsonKey]);
		}

		else if (Array.isArray(json[jsonKey])) {
			json[jsonKey].forEach((v) => {
				convertJsonData(v);
			});
		}

	});

	return json;
};

export const toObjectKeyValue = (data: any[], key: string, value: string) => {
	var res = {};

	data.forEach(dataobeject => {
		res[dataobeject[key]] = dataobeject[value];
	});


	return res;

};

export const getInitialWord = (word: string): string => {
	const split = word.split(' ');
	if (split.length > 1) {
		return split[0].charAt(0) + split[1].charAt(0);
	} else {
		return split[0].charAt(0);
	}
};