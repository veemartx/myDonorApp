import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class RadioButton extends Component {
	state = {
		value: null,
	};

	render() {
		const { PROP } = this.props;
		const { value } = this.state;

		function handleChange(props,key) {
			// Here, we invoke the callback with the new value
			props.onChange(key);

		}


		return (
			<View style={styles.radioContainer}>
				{PROP.map(res => {
					return (
						<View key={res.key} style={styles.container}>
							<Text style={styles.radioText}>{res.text}</Text>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									this.setState({
										value: res.key,
									});

									handleChange(this.props,res.key);
								}}>
								{value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>

						</View>
					);
				})}


				<Text>
					{/* {Se} */}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	radioContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	},
	container: {
		alignItems: 'center',
		// flexDirection: 'row',
		justifyContent: 'space-evenly',

	},
	radioText: {
		marginRight: 35,
		fontSize: 15,
		color: 'gray',
		fontWeight: '700'
	},

	radioCircle: {
		height: 30,
		width: 30,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'crimson',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: 'crimson',
	},
	result: {
		marginTop: 20,
		color: 'white',
		fontWeight: '600',
		backgroundColor: '#F3FBFE',
	},
});