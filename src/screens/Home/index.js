import React, { useState } from 'react';
import { Dimensions, ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Footer, Header, Section, Drawer } from '../../widgets';
import { Icon } from '../../components';
const { width, height } = Dimensions.get('window');

const Index = ({ recents, style = {} }) => {
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]);
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="home" onItemPressed={() => setDrawer(false)}>
			<SafeAreaView style={styles.container}>
				<Header
					options={{
						left: {
							children: drawer ? <Icon name="x" color="#C4C4C4" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
							onPress: () => setDrawer(!drawer),
						},
						middle: {
							show: true,
						},
					}}
				/>
				<View style={styles.sections}>
					<ScrollView showsVerticalScrollIndicator={true}>
						<Section.Recent style={{ marginBottom: 20 }} />
						<Section.Recomend style={{ marginBottom: 20 }} />
						<Section.MySong style={{ marginBottom: 20 }} />
						<Section.Popular style={{ marginBottom: 20 }} />
						<Section.Playlist style={{ marginBottom: 20 }} />
						<View style={{height: width / 5}} />
					</ScrollView>
				</View>
				<View style={{position: 'absolute', bottom: recents?.length > 0 ? width / 3.6 : 20, right: 20, alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity activeOpacity={0.7} style={{width: 70, height: 50, backgroundColor: '#f24160', borderRadius: 50, alignItems:'center', justifyContent: 'center'}}>
						<View style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#ffffff', width: 22, height: 22, borderRadius: 50, elevation: 2, alignItems:'center', justifyContent: 'center'}}>
							<Text>0</Text>
						</View>
						<Icon family='Ionicons' name="cart" size={24} color="#ffffff" />
					</TouchableOpacity>
				</View>
				{(recents?.length > 0 &&
					<Footer />
				)}
			</SafeAreaView>
		</Drawer>
	);
};

const mapStateToProps = (state) => ({ recents: state?.storage?.recents });
export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
