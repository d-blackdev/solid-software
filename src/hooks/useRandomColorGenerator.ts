import { colors } from "../data/colors";

export const useRandomColorGenerator = () => {
	const colorGenerator = () => {
		// Generate a random within the length of 0 to the length of colors array
		const randomNumber = Math.floor(Math.random() * colors.length);

		return colors[randomNumber];
	};

	return {
		colorGenerator,
	};
};
