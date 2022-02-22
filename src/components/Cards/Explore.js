import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Explore = ({ style = {}, imageURL, title = 'Explore', subtitle = `Listen to what's trending now`, onPress = () => {} }) => (
	<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
		<View>
			<Image style={styles.coverArt} source={imageURL ? { uri: imageURL } : require('../../assets/explore/default.png')} resizeMode="cover" borderRadius={10} />
		</View>
		<View style={styles.content}>
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
			<Text style={styles.author} numberOfLines={1}>
				{subtitle}
			</Text>
		</View>
	</TouchableOpacity>
);

export default Explore;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	coverArt: {
		width: 200,
		height: 200,
		borderRadius: 10,
	},
	content: {
		width: 190,
		justifyContent: 'center',
		// alignItems: 'center',
		marginTop: 10,
	},
	title: {
		color: '#000000',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: 1,
	},
	author: {
		fontSize: 14,
		color: '#555555',
	},
});
