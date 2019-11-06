import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import React, {Fragment, useRef, useState} from 'react';
import AutocompleteInput from 'react-native-autocomplete-input';

import Styles from './styles';

export const Autocomplete = props => {
	const textInputRef = useRef(null);
	const [hide, setHide] = useState(true);
	const {data, renderItem, onChangeText, value, label} = props;

	return (
		<Fragment>
			<AutocompleteInput
				data={data}
				renderItem={renderItem}
				inputContainerStyle={Styles.noBorder}
				containerStyle={Styles.noBorder}
				listStyle={Styles.list}
				hideResults={hide}
				listContainerStyle={Styles.flexRow(1)}
				renderTextInput={_props => (
					<TextInput
						ref={textInputRef}
						{..._props}
						style={Styles.textInput}
						value={value}
						label={label}
						mode="outlined"
						onFocus={() => setHide(false)}
						onBlur={() => setHide(true)}
						onChangeText={onChangeText}
					/>
				)}
			/>
		</Fragment>
	);
};

Autocomplete.propTypes = {
	data: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
	onChangeText: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};
