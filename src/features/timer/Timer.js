import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Vibration,
  Platform,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { Timing } from './Timing';
import { colors } from '../../utils/colors';
import { fontSizes, paddingSizes } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

const Separator = () => <View style={styles.separator} />;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const interval = React.useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(2000);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <Separator />
      <View style={{ paddingTop: paddingSizes.xl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar progress={progress} color="teal" style={{ height: 10 }} />
      <View style={{ marginTop: 20 }}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <Button
            color="grey"
            title="pause"
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <Button
            color="green"
            title="start"
            onPress={() => setIsStarted(true)}
          />
        )}
        <Button
          color={colors.warning}
          title="clear"
          onPress={() => clearSubject()}
        />
      </View>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: paddingSizes.lg,
  },
  buttonWrapper: {
    flexDirection: 'row',
    padding: paddingSizes.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.appTextColor,
    textAlign: 'center',
    margin: 20,
    fontSize: fontSizes.md,
  },
  task: {
    backgroundColor: colors.appBackground,
    padding: paddingSizes.sm,
    color: colors.appTextColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
  },
  countdown: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.timerTextColor,
    backgroundColor: colors.appBackground,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
