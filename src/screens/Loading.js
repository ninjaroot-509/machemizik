import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { DISPATCHES, SCREENS } from '../constants';
import { Storage } from '../helpers';

const { width, height } = Dimensions.get('screen');

const mySongs = [
	{
		id: 9,
		title: 'Butterfly Effect',
		author: 'Travis Scott',
		img: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895065/GitHub/Projects/Musicont/mock/images/butterfly_effect_oimlry.png',
		uri: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895068/GitHub/Projects/Musicont/mock/audios/butterfly_effect_yti55d.mp3',
		durationMillis: 212793,
	},
	{
		id: 8,
		title: 'Bank Account',
		author: '21 Savage',
		img: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895067/GitHub/Projects/Musicont/mock/images/bank_account_s7vfq5.jpg',
		uri: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895057/GitHub/Projects/Musicont/mock/audios/bank_account_ivbmrg.mp3',
		durationMillis: 220395,
	},
	{
		id: 10,
		title: 'Check',
		author: 'Young Thug',
		img: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895063/GitHub/Projects/Musicont/mock/images/check_vwxgvl.jpg',
		uri: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895098/GitHub/Projects/Musicont/mock/audios/check_mmwzqi.mp3',
		durationMillis: 229773,
	}
]

const Loading = ({ songs, dispatch, navigation: { replace } }) => {
	const [assets] = useAssets([require('../../assets/splash.png')]);

	const getStorage = () => {
		return new Promise(async (resolve) => {
			const favourites = await Storage.get('favourites', true);
			const recents = await Storage.get('recents', true);
			const playlists = await Storage.get('playlists', true);
			await Storage.store('mysongs', mySongs, true);
			const mysongs = await Storage.get('mysongs', true);

			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					favourites,
					recents,
					playlists,
					mysongs
				},
			});

			if (recents && recents.length > 0) {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						detail: songs[recents[0]],
					},
				});
			}

			resolve();
		});
	};

	const init = async () => {
		const token = await Storage.get('token', false);
		if (token) {
			await getStorage();
			replace(SCREENS.HOME);
		} else {
			replace(SCREENS.ONBOARD);
		}
	};

	useEffect(() => {
		init();
	}, []);

	return <Image style={styles.img} source={require('../../assets/splash.png')} resizeMode="cover" />;
};

const mapStateToProps = (state) => ({ songs: state?.player?.songs });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Loading);

const styles = StyleSheet.create({
	img: {
		width,
		height,
	},
});
