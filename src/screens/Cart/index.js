import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets';
import { Icon } from '../../components';
const { width, height } = Dimensions.get('window');

const Index = ({ cart }) => {
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]);
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="mysong" onItemPressed={() => setDrawer(false)}>
			<SafeAreaView style={styles.container}>
				<Header
					options={{
						left: {
							children: drawer ? <Icon name="x" color="#C4C4C4" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
							onPress: () => setDrawer(!drawer),
						},
						middle: {
							show: true,
							text: 'Mon panier',
						},
						right: {
							show: false,
						},
					}}
				/>
				<View style={styles.sections}>
					{cart && cart.length > 0 ? (
						<Section.CartList carts={cart} />
					) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0, 0, 0, .3)' }}>no song yet!</Text>
						</View>
					)}
				</View>
			</SafeAreaView>
			{cart && cart.length > 0 && (
				<View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
					<TouchableOpacity onPress={()=> {}} style={{width: width / 1.2, height: 50, backgroundColor: '#f24160', borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
						<Text style={{fontWeight: '500', color: '#ffffff', fontSize: 18}}>Processus de paiement</Text>
					</TouchableOpacity>
				</View>
			)}
		</Drawer>
	);
};

const mapStateToProps = (state) => ({ cart: state?.storage?.cart });
export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.005,
	},
});
