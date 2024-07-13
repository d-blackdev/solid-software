import { Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { loadDataFromStorage, saveDataToStorage } from "../utils/asyncStorage";
import { useRandomColorGenerator } from "../hooks/useRandomColorGenerator";
import { DEFAULT_BACKGROUND_COLOR } from "../constants/constants";

const AppLayout = () => {
	const [defaultBackgroundColor, setDefaultBackgroundColor] = useState("white");

	const { colorGenerator } = useRandomColorGenerator();

	const getDefaultBackgroundColor = useCallback(() => {
		loadDataFromStorage(DEFAULT_BACKGROUND_COLOR)
			.then((value) => {
				if (value && value !== null && value !== undefined) {
					setDefaultBackgroundColor(value);
				}
			})
			.catch(() => {});
	}, []);

	useEffect(() => {
		getDefaultBackgroundColor();
	}, [getDefaultBackgroundColor]);

	//  To ensure the text shows on white background
	const textColor = useMemo(() => {
		if (
			defaultBackgroundColor &&
			(defaultBackgroundColor === "white" ||
				defaultBackgroundColor === "#fff" ||
				defaultBackgroundColor === "#ffffff")
		) {
			return "#000";
		}
		return "#fff";
	}, [defaultBackgroundColor]);

	return (
		<SafeAreaProvider>
			<StatusBar style="auto" />
			<SafeAreaView
				style={[styles.container, { backgroundColor: defaultBackgroundColor }]}
			>
				<Pressable
					style={[styles.container]}
					onPress={() => {
						const color = colorGenerator();
						setDefaultBackgroundColor(color);
						saveDataToStorage(DEFAULT_BACKGROUND_COLOR, color).then(() => {});
					}}
				>
					<Text style={[{ color: textColor }, styles.textStyles]}>
						Hello There
					</Text>
				</Pressable>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default AppLayout;

export const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		height: "100%",
		width: "100%",
	},
	textStyles: {
		fontSize: 24,
		fontWeight: "700",
	},
});
