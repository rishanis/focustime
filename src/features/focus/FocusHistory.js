import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';

import { fontSizes, paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item, index }) => {
  return (
    <View style={styles.items}>
      <>
        {item.status > 1 ? (
          <Text style={styles.itemCxld}>{item.subject}</Text>
        ) : (
          <Text style={styles.itemCmpl}>{item.subject}</Text>
        )}
      </>
    </View>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5 }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.fixToText}>
              <Button
                color={colors.warning}
                title="CLEAR"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.md,
    color: colors.appTextColor,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  itemCxld: {
    fontSize: fontSizes.md,
    color: colors.appBackground,
    backgroundColor: colors.warning,
    padding: 2,
    paddingHorizontal: 10,
  },
  itemCmpl: {
    fontSize: fontSizes.md,
    color: colors.appBackground,
    backgroundColor: colors.appTextColor,
    padding: 2,
    paddingHorizontal: 10,
  },
  fixToText: {
    alignItems: 'center',
    textAlign: 'center',
  },
});
