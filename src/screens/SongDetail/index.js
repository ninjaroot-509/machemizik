import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Icon, Request } from '../../components';
import { Header } from '../../widgets';
import { DISPATCHES, SCREENS } from '../../constants';
import { Storage } from '../../helpers';
const { width, height } = Dimensions.get('window');

const Index = ({ dispatch, route: { params }, navigation: { goBack, navigate } }) => {
	const songdetail = params?.song
	const [activeItem, setActiveItem] = useState(false)

	const handlePress = async () => {
		if (!activeItem) {
			setActiveItem(true)
			const token = await Storage.get('token', false);
			const dataBody = {song_id: songdetail.id}
			await Request.postAddToCart(token, dataBody);
	
			const cartsLa = await Request.getMyCart(token);
			await Storage.store('cart', cartsLa, true);
			const cart = await Storage.get('cart', true);
			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					cart,
				},
			});
			setActiveItem(false)
			navigate(SCREENS.CART)
		}
	};

	return (
		<>
			<StatusBar style="light" />
			<ImageBackground style={styles.container} source={{ uri: songdetail?.img }} blurRadius={10} resizeMode="cover">
				<View style={[StyleSheet.absoluteFill, styles.overlay]} />
				<Header
					options={{
						left: {
							children: <Icon name="chevron-down" color="#FFF" />,
							onPress: goBack,
						},
						right: {
							show: false,
							children: <Icon name='heart' family="AntDesign" color='#f24160' />,
							onPress: {},
						},
					}}
				/>
				<View style={styles.frame}>
					<View>
						<Image style={styles.clipart} source={{ uri: songdetail?.img }} resizeMode="cover" borderRadius={20} />
						<View style={{position: 'absolute', top: 0, left: 0, backgroundColor: '#f24160', borderRadius: 20, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontWeight: '500', color: '#ffffff', fontSize: 16, marginVertical: 10, marginHorizontal: 15}}>HTG {songdetail.get_total_price}</Text>
						</View>
					</View>
					<View style={styles.details}>
						<View style={{ marginBottom: 25, alignItems: 'center' }}>
							<Text style={styles.songTitle}>{songdetail?.title}</Text>
							<Text style={styles.artistName}>{songdetail?.author}</Text>
						</View>
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity onPress={handlePress} style={{width: width / 1.2, height: 50, backgroundColor: '#f24160', borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
								{activeItem == true?
									<ActivityIndicator size="small" color="#ffffff" />
									:
									<Text style={{fontWeight: '500', color: '#ffffff', fontSize: 18}}>Ajouter au panier</Text>
								}
							</TouchableOpacity>
						</View>
					</View>
					
				</View>
			</ImageBackground>
		</>
	);
};


const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(null, mapDispatchToProps)(Index);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)',
	},
	frame: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	clipart: {
		width: 300,
		height: 300,
	},
	details: {
		width: '85%',
	},
	songTitle: {
		color: '#FFF',
		fontSize: 25,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	artistName: {
		color: 'rgba(255, 255, 255, .6)',
	},
	tracker: {
		backgroundColor: 'rgba(255, 255, 255, .2)',
		borderRadius: 100,
	},
	minMin: {
		color: '#FFF',
	},
	maxMin: {
		color: '#FFF',
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 200,
	},
	playAndPauseBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 1.5,
		borderColor: '#FFF',
		backgroundColor: '#f24160',
	},
});
