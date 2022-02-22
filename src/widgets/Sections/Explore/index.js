import React from 'react';
import { StyleSheet } from 'react-native';

import Container from '../Container';
import * as Card from '../../../components/Cards';

const Index = ({ style = {} }) => {
	return (
		<Container style={style} title="Explore">
			<Card.Explore imageURL={'https://res.cloudinary.com/jsxclan/image/upload/v1623895065/GitHub/Projects/Musicont/mock/images/butterfly_effect_oimlry.png'} style={{ marginLeft: 20 }} />
			<Card.Explore />
			<Card.Explore />
		</Container>
	);
};

export default Index;

const styles = StyleSheet.create({});
