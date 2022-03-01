import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Container from '../Container';
import { Card } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../constants';

const Index = ({ mysongs, songs, style = {} }) => {
	const { navigate } = useNavigation();
	const [audios, setAudios] = useState([]);

	const handlePress = (song, index) => {
		navigate(SCREENS.PLAYING, {
			forcePlay: true,
			song,
			index,
		});
	};

	useEffect(() => {
		setAudios(mysongs);
	}, [mysongs]);

	return (
		audios &&
		audios.length > 0 && (
			<Container style={style} title="My Songs">
				{audios.map((song, key) => (
					<Card.MySong
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={song?.img}
						title={song?.title}
						author={song?.author}
						onPress={() => handlePress(song, songs.findIndex((i) => i?.id === song?.id))}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state) => ({ songs: state?.player?.songs, mysongs: state?.storage?.mysongs });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({});
