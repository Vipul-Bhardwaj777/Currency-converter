import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import CurrcyBtn from './Components/CurrcyBtn';
import {currencyByRupee} from './constants';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const btnPress = (item: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);

    if (!isNaN(inputAmount)) {
      const conversion = inputAmount * item?.value;
      const result = `${item?.symbol} ${conversion.toFixed(2)}`;
      setResultValue(result);
    } else {
      return Snackbar.show({
        text: 'Enter a valid number to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
  };

  const reset = () => {
    console.log('Resetting...');
    setInputValue('');
    setResultValue('');
    console.log('Reset complete.');
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rupeesContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            style={styles.textInput}
            maxLength={14}
            value={inputValue}
            onChangeText={setInputValue}
            clearButtonMode="always"
            keyboardType="number-pad"
            placeholder="Enter amount in rupees"
          />
        </View>
        {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={currencyByRupee}
          keyExtractor={item => item?.name}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.button,
                targetValue === item?.name && styles.selected,
              ]}
              onPress={() => btnPress(item)}>
              <CurrcyBtn {...item} />
            </TouchableOpacity>
          )}
          numColumns={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#616161',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
