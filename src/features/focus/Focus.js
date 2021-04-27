import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

import { fontSizes, paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>What whould you like to focus on?</Text>
          <View>
            <TextInput
              autoCapitalize="words"
              style={styles.input}
              onSubmitEditing={({ nativeEvent }) => {
                setSubject(nativeEvent.text);
              }}
            />
            <Button
              color={colors.buttonColor}
              title="ADD"
              onPress={() => {
                addSubject(subject);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: .4,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    color: colors.appTextColor,
    fontSize: fontSizes.md,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    height: 50,
    fontSize: fontSizes.lg,
  },
});
