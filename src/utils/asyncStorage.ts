import AsyncStorage from "@react-native-async-storage/async-storage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataToStorage = async (name: string, value: any) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(name, jsonValue);
	} catch (e) {
		return e;
	}
	return null;
};
export const loadDataFromStorage = async (val: string) => {
	try {
		const data = await AsyncStorage.getItem(val);
		const parsedData = data != null ? JSON.parse(data) : null;
		return parsedData;
	} catch (e) {
		// console.log('Error loading data', e);
		return e;
	}
};
