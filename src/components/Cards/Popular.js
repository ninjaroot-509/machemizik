import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Played = ({ style = {}, imageURL, title = 'Song Title', author = `Artist Name`, onPress = () => {} }) => (
	<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
		<View>
			<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={10} />
		</View>
		<View style={styles.content}>
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
		</View>
	</TouchableOpacity>
);

export default Played;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	coverArt: {
		width: 165,
		height: 165,
		borderRadius: 10,
	},
	content: {
		width: 155,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},
	title: {
		color: '#000000',
		fontSize: 14,
		fontWeight: '700',
		letterSpacing: 1,
	},
	author: {
		color: '#555555',
	},
});
