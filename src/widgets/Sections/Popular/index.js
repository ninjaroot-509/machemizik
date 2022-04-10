import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Container from '../Container';
import { Card } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../constants';

const Index = ({ songs, style = {} }) => {
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
		setAudios(songs);
	}, [songs]);

	return (
		audios &&
		audios.length > 0 && (
			<Container style={style} title="Les plus populaire">
				{audios.map((index, key) => (
					<Card.Popular
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={index?.img}
						title={index?.title}
						author={index?.author}
						onPress={() => handlePress(index, key)}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state) => ({ songs: state?.storage?.songs });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({});
