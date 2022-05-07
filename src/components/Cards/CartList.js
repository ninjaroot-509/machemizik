import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from '../Icon';

const CartList = ({ style = {}, imageURL, title = 'Song Title', price = 50, author = `Author Name`, load = false, onPress = () => {} }) => (
		<>
			<View style={[styles.container, style]} activeOpacity={0.8}>
				<View style={styles.left}>
					<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={6} />
				</View>
				<View style={styles.middle}>
					<View>
						<Text style={styles.title} numberOfLines={2}>
							{title}
						</Text>
						<Text style={styles.author}>{author}</Text>
						<Text style={styles.price}>HTG {price}</Text>
					</View>
				</View>
				<View style={styles.right}>
					<TouchableOpacity onPress={onPress}>
						<View style={styles.delBtn}>
							{load == true ?
								<ActivityIndicator size="small" color="#f24160" />
								:
								<Icon family='EvilIcons' name="trash" color="#f24160" size={32} />
							}
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</>
);

export default CartList;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	left: {},
	middle: {
		flex: 1,
		height: 65,
		marginLeft: 10,
		marginRight: 20,
		justifyContent: 'space-between',
	},
	right: {},
	coverArt: {
		width: 60,
		height: 60,
	},
	title: {
		fontSize: 19,
		fontWeight: 'bold',
		// letterSpacing: 1,
	},
	price: {
		color: '#f24160',
	},
	author: {
		color: '#888',
	},
	delBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		borderRadius: 100,
		borderWidth: 0.50,
		borderColor: '#f2416090',
	},
});
