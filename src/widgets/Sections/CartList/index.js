import React, { memo, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Card, Request } from '../../../components';
import { DISPATCHES, SCREENS } from '../../../constants';
import { Storage } from '../../../helpers';

const Index = ({ dispatch, style = {}, carts = [] }) => {
	const { navigate } = useNavigation();
	const [activeItem, setActiveItem] = useState()

	const handlePress = async (id) => {
		if (activeItem != id) {
			setActiveItem(id)
			const token = await Storage.get('token', false);
			const dataBody = {song_id: id}
			await Request.postRemoveToCart(token, dataBody);
	
			const cartsLa = await Request.getMyCart(token);
			await Storage.store('cart', cartsLa, true);
			const cart = await Storage.get('cart', true);
			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					cart,
				},
			});
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{
				...style,
				padding: 20,
			}}
			showsVerticalScrollIndicator={true}
		>
			{carts.map((index, key) => (
				<Card.CartList
					key={key}
					imageURL={index?.img}
					title={index?.title}
					author={index?.author}
					price={index?.get_total_price}
					load={activeItem == index?.id ? true : false }
					onPress={()=> handlePress(index?.id)}
				/>
			))}

		</ScrollView>
	);
};

const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(null, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
});
