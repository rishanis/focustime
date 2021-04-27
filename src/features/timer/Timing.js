import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import { colors } from '../../utils/colors';

export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.fixToText}>
      <Button
        color={colors.buttonColor}
        title="10 min"
        onPress={() => onChangeTime(10)}
      />
      <Button
        color={colors.buttonColor}
        title="20 min"
        onPress={() => onChangeTime(20)}
      />
      <Button
        color={colors.buttonColor}
        title="30 min"
        onPress={() => onChangeTime(30)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
