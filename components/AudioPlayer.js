import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useGlobalState } from '../GlobalStateContext';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const AudioPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(null);

  const { state, dispatch } = useGlobalState();

  const handleClose = () => {
    dispatch({ type: 'SET_NAME', payload: 'as' });
  };

  useEffect(() => {
    if (state.name && isValidURL(state.name)) {
      handleLoadAudio();
    } else {
      sound && sound.unloadAsync();
      setSound(null);
      setIsError(false);
      setDuration(null);
      setIsPlaying(false);
    }
  }, [state.name]);

  const isValidURL = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadAudio = async () => {
    setIsLoading(true);
    setIsError(false);
  
    try {
      if (sound) {
        await sound.unloadAsync();
      }
  
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: state.name },
        { shouldPlay: true }
      );
  
      if (status.isLoaded) {
        setSound(newSound);
        setDuration(status.durationMillis);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setIsLoading(false);
        setIsPlaying(true);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
    }

    if (status.didJustFinish) {
      // Handle audio playback completion if needed
    }
  };

  const handleSeek = (value) => {
    if (sound) {
      const newPositionMillis = value * duration;
      sound.setPositionAsync(newPositionMillis);
      setPosition(newPositionMillis);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!state.name || !isValidURL(state.name) ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.audioTop}>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
          {isPlaying ? (
            <Ionicons name="pause" size={22} color="white" />
          ) : (
            <Ionicons name="play" size={22} color="white" />
          )}
        </TouchableOpacity>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="#737373" />
      </TouchableOpacity>
      </View>
      <View style={styles.playerControls}>
        <View style={{ marginTop: 7, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.timeText}>
            {formatTime(position)}
          </Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={1}
            value={duration ? position / duration : 0}
            onValueChange={handleSeek}
            minimumTrackTintColor="#22c55e"
            thumbTintColor="#22c55e"
            maximumTrackTintColor="#d4d4d4"
          />
          <Text style={styles.timeText}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 8
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#262626'
  },
  playPauseButton: {
    backgroundColor: '#22c55e',
    height: 40,
    width: 40,
    borderRadius: 100,
    marginTop: 8,
    marginRight: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  audioTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop: 12,
  }
});

export default AudioPlayer;




