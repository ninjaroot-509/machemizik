import React, { useState, useRef } from 'react';
import { Dimensions, ScrollView, Image, StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import { Icon, Request } from '../../components';
import { SCREENS } from '../../constants';
import { Storage } from '../../helpers';
const {width, height} = Dimensions.get('window');

const Index = ({ style = {}, navigation }) => {
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [load, setLoad] = useState(false);
	const phoneInput = useRef(null);
	const [formattedValue, setFormattedValue] = useState('');
	const tel = formattedValue;

	const handleLoginSubmit = async () => {
		if (phone != '' && password != '') {
		  if (load === false) {
			setLoad(true);
			const dataBody = { phone: formattedValue, password: password };
			try {
			  const result = await Request.postHandleLogin(dataBody)
			  await Storage.store('token', result.token, false)
			  await Storage.store('user', result.user, true)
			  navigation.replace(SCREENS.LOADING)
			  setLoad(false);
			} catch (e) {
			  alert("The error is : " + Object.values(e?.response?.data).flat())
			  setLoad(false);
			}
		   
		  }
		} else {
		  alert('veuillez remplir tout les champs!!');
		}
	  };

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<View style={{
					alignItems: 'center',
					paddingVertical: 10
				}}>
					<Image
						source={require('../../assets/logo.png')}
						style={{
							width: 100, 
							height: 100,
						}}
					/>
                </View>
				<View style={{alignItems: 'center'}}>
					<Text style={{fontSize: 25, color:'#000', fontWeight: '700'}}>Content de te revoir</Text>
					<Text style={{fontSize: 17, color:'#cacaca', fontWeight: '700'}}>Connecter pour continuer</Text>
				</View>
			</View>
			<View style={{alignItems: 'center'}}>
			<View style={{ padding: 5 }}>
				<Text style={{ fontSize: 14, fontWeight: '500', color: '#f24160', padding: 7 }}>
					Téléphoner
				</Text>
				<PhoneInput
					containerStyle={{
						width: width / 1.2,
						height: 50,
						backgroundColor: '#ffffff',
						borderRadius: 7
					}}
					textContainerStyle={{ backgroundColor: '#ffffff', color: '#8E8F92', borderRadius: 7 }}
					textInputStyle={{ color: '#000000' }}
					codeTextStyle={{ color: '#000000' }}
					flagButtonStyle={{ color: '#8E8F92' }}
					withShadow
					placeholder={'Entrer votre numero'}
					ref={phoneInput}
					defaultValue={phone}
					defaultCode="HT"
					layout="first"
					onChangeText={(text) => {
						setPhone(text);
					}}
					onChangeFormattedText={(text) => {
						setFormattedValue(text);
					}}
					autoFocus
					/>
			</View>
			<View style={{ padding: 5 }}>
				<Text style={{ fontSize: 14, fontWeight: '500', color: '#f24160', padding: 7 }}>
					Mot de passe
				</Text>
				<TextInput
				onChangeText={(password) => setPassword(password)}
				value={password}
				placeholder={'Entrer votre mot de passe'}
				placeholderTextColor={'#8E8F92'}
				secureTextEntry={true}
				style={styles.input}
				returnKeyType="next"
				/>
				<View style={{ alignSelf: 'flex-end', paddingVertical: 5 }}>
				<Text
					style={{
					fontSize: 13,
					color: '#f24160',
					textAlign: 'right',
					textDecorationLine: 'underline',
					}}>
					Mot de passe oublié
				</Text>
				</View>
			</View>
			<View style={{ paddingVertical: 20 }}>
				{load === false ? (
				<TouchableOpacity
					style={styles.button}
					onPress={handleLoginSubmit}>
					<Text style={{ color: 'white', fontWeight: 'bold' }}>
					Connecter
					</Text>
				</TouchableOpacity>
				) : (
				<View style={styles.button}>
					<ActivityIndicator size="small" color="#ffffff" />
				</View>
				)}
			</View>
			<View style={{ padding: 7 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text
					style={{
						fontSize: 15,
						color: '#111214',
						textAlign: 'center',
						fontWeight: '700'
					}}>
					Vous n'avez pas de compte?
					</Text>
					<TouchableOpacity onPress={() => navigation.replace(SCREENS.SIGNUP)}>
						<Text
						style={{
							fontSize: 15,
							color: '#f24160',
							textDecorationLine: 'underline',
							textAlign: 'center',
							marginHorizontal: 3
						}}>
						Inscrivez-vous
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			</View>
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		paddingVertical: 30,
		backgroundColor: '#ffffff'
	},
	input: {
	  width: width / 1.2,
	  height: 50,
	  color: '#000000',
	  padding: 12,
	  borderRadius: 7,
	  backgroundColor: '#ffffff',
	  alignItems: 'center',
	  justifyContent: 'center',
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 1,
	  },
	  shadowOpacity: 0.22,
	  shadowRadius: 2.22,
  
	  elevation: 3,
	},
	button: {
	  width: width / 1.2,
	  height: 50,
	  padding: 7,
	  borderRadius: 8,
	  backgroundColor: '#f24160',
	  alignItems: 'center',
	  justifyContent: 'center',
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 1,
	  },
	  shadowOpacity: 0.22,
	  shadowRadius: 2.22,
  
	  elevation: 2,
	},
});
