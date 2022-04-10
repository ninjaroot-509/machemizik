import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { DISPATCHES, SCREENS } from '../constants';
import { Storage } from '../helpers';
import { Request } from '../components';

const Loading = ({ songs, dispatch, navigation: { replace } }) => {
	const [assets] = useAssets([require('../../assets/splash.png')]);

	const getStorage = () => {
		return new Promise(async (resolve) => {
			const token = await Storage.get('token', false);
			// console.log(token)
			const favourites = await Storage.get('favourites', true);
			const user = await Storage.get('user', true);

			try {
				const songsLa = await Request.getAllSong(token);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						songs: songsLa,
					},
				});
			} catch (e) {
				if (e.response.status === 401) {
					await Storage.clear()
					replace(SCREENS.LOGIN)
				}
				console.log("The error is : " + Object.values(e.response.data).flat())
			}

			try {
				const albumsLa = await Request.getAllAlbum(token);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						albums: albumsLa,
					},
				});
			} catch (e) {
				console.log("The error is : " + Object.values(e.response.data).flat())
			}

			try {
				const genresLa = await Request.getAllGenre(token);
				await Storage.store('genres', genresLa, true);
				const genres = await Storage.get('genres', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						genres,
					},
				});
			} catch (e) {
				console.log("The error is : " + Object.values(e.response.data).flat())
				const genres = await Storage.get('genres', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						genres,
					},
				});
			}

			try {
				const mysongsLa = await Request.getMySong(token);
				await Storage.store('mysongs', mysongsLa, true);
				const mysongs = await Storage.get('mysongs', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						mysongs,
					},
				});
			} catch (e) {
				console.log("The error is : " + Object.values(e.response.data).flat())
				const mysongs = await Storage.get('mysongs', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						mysongs,
					},
				});
			}


			try {
				const myalbumsLa = await Request.getMyAlbum(token);
				await Storage.store('myalbums', myalbumsLa, true);
				const myalbums = await Storage.get('myalbums', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						myalbums,
					},
				});
			} catch (e) {
				console.log("The error is : " + Object.values(e.response.data).flat())
				const myalbums = await Storage.get('myalbums', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						myalbums,
					},
				});
			}

			try {
				const mydownloadsLa = await Request.getMySongDownload(token);
				await Storage.store('mydownloads', mydownloadsLa, true);
				const mydownloads = await Storage.get('mydownloads', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						mydownloads,
					},
				});
			} catch (e) {
				console.log("The error is : " + Object.values(e.response.data).flat())
				const mydownloads = await Storage.get('mydownloads', true);
				dispatch({
					type: DISPATCHES.STORAGE,
					payload: {
						mydownloads,
					},
				});
			}

			const recents = await Storage.get('recents', true);
			const playlists = await Storage.get('playlists', true);

			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					favourites,
					recents,
					playlists,
				},
			});

			if (songs && recents && recents.length > 0) {
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

	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff'}}>
			<ActivityIndicator size="large" color={'red'} />
		</View>
	)
};

const mapStateToProps = (state) => ({ songs: state?.storage?.songs });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
