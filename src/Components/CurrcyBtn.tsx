import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type currencyBtnProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrcyBtn = (props: currencyBtnProps) => {
  return (
    <View style={styles.btnContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

export default CurrcyBtn;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: '#000000',
  },
});
