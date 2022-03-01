import React, { useState } from 'react';
import { Dimensions, ScrollView, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';

import { Footer, Header, Section, Drawer } from '../../widgets';
import { Icon } from '../../components';

const Index = ({ style = {} }) => {
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
						<Section.Recent />
						<Section.Recomend style={{ marginTop: 20 }} />
						<Section.Popular style={{ marginTop: 20 }} />
						{/* <Section.Explore style={{ marginTop: 20 }} /> */}
						<Section.Playlist style={{ marginTop: 20 }} />
						<View style={{height: 20}} />
					</ScrollView>
				</View>
				<Footer />
			</SafeAreaView>
		</Drawer>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
