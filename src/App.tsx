import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurrcyBtn from './Components/CurrcyBtn';
import {currencyByRupee} from './constants';
import Snackbar from 'react-native-snackbar';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '115124193463-7hg7c2jtqteb1tt0q0vgiidvnf12sfcl.apps.googleusercontent.com',
    });
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Alert.alert('SignIN Success');
      console.log('User Info', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // Remember to remove the user from your app's state as well
      Alert.alert('Logout Success');

      console.log('Signed out successfully');
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={GoogleLogin}
        />
        <TouchableOpacity
          onPress={signOut}
          style={{
            backgroundColor: '#FFF',
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={{color: '#000000', fontWeight: '700', fontSize: 20}}>
            Sign Out
          </Text>
        </TouchableOpacity>
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
    flex: 2,
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
