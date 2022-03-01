import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Container from '../Container';
import { Card } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../constants';

const Index = ({ songs, populars, style = {} }) => {
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
		setAudios(populars);
	}, [populars]);

	return (
		audios &&
		audios.length > 0 && (
			<Container style={style} title="Most popular">
				{audios.map((index, key) => (
					<Card.Popular
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={songs[key]?.img}
						title={songs[key]?.title}
						author={songs[key]?.author}
						onPress={() => handlePress(songs[key], key)}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state) => ({ songs: state?.player?.songs, populars: state?.popular?.popular });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({});
