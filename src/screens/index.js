import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Loading, Search, Playing, Home, Songs, SongDetail, Cart, Favourite, Recent, Playlists, Playlist, MySong, OnBoard, Signup, Login } from './screens';
import { SCREENS } from '../constants';

const Stack = createStackNavigator();
const StackNavigation = () => (
	<Stack.Navigator headerMode="none" initialRouteName={SCREENS.LOADING}>
		<Stack.Screen name={SCREENS.LOADING} component={Loading} />
		<Stack.Screen name={SCREENS.SEARCH} component={Search} />
		<Stack.Screen name={SCREENS.PLAYING} component={Playing} />
		<Stack.Screen name={SCREENS.HOME} component={Home} />
		<Stack.Screen name={SCREENS.ONBOARD} component={OnBoard} />
		<Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
		<Stack.Screen name={SCREENS.LOGIN} component={Login} />
		<Stack.Screen name={SCREENS.SONGS} component={Songs} />
		<Stack.Screen name={SCREENS.SONGDETAIL} component={SongDetail} />
		<Stack.Screen name={SCREENS.CART} component={Cart} />
		<Stack.Screen name={SCREENS.FAVOURITE} component={Favourite} />
		<Stack.Screen name={SCREENS.MYSONG} component={MySong} />
		<Stack.Screen name={SCREENS.RECENT} component={Recent} />
		<Stack.Screen name={SCREENS.PLAYLISTS} component={Playlists} />
		<Stack.Screen name={SCREENS.PLAYLIST} component={Playlist} />
	</Stack.Navigator>
);

const Index = () => {
	return (
		<NavigationContainer>
			<StackNavigation />
		</NavigationContainer>
	);
};

export default Index;
