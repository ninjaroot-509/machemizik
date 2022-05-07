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

	const handlePress = (song) => {
		navigate(SCREENS.SONGDETAIL, {
			song,
		});
	};

	useEffect(() => {
		setAudios(songs);
	}, [songs]);

	return (
		audios &&
		audios.length > 0 && (
			<Container style={style} title="Recommandé pour vous">
				{audios.map((index, key) => (
					<Card.Recomend
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={index?.img}
						title={index?.title}
						author={index?.author}
						onPress={() => handlePress(index)}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state) => ({ songs: state?.storage?.songs });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({});
