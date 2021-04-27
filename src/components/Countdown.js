import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, paddingSizes } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
        return timeLeft;
    });
  };

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  useEffect(() => {
    if (isPaused) {
      if(interval.current) clearInterval(interval.current)
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  useEffect(() => {
    onProgress( millis / minutesToMillis(minutes) )
    if (millis === 0) {
      onEnd();
    }
  }, [millis])

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  
  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.text}>
          {formatTime(minute)}:{formatTime(seconds)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.appTextColor,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: paddingSizes.lg,
    backgroundColor: colors.timerTextColor,
  },
});
