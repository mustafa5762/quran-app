import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useGlobalState } from '../GlobalStateContext';

const AudioPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(null);

  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    if (state.name && isValidURL(state.name)) {
      // Load audio only when state.name is available and valid
      handleLoadAudio();
    } else {
      // Clear any existing sound when the URL is not valid
      sound && sound.unloadAsync();
      setSound(null);
      setIsError(false);
      setDuration(null);
      setIsPlaying(false); // Pause playback when changing the source
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
      // Unload the previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }
  
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: state.name },
        { shouldPlay: isPlaying }
      );
  
      if (status.isLoaded) {
        setSound(newSound);
        setDuration(status.durationMillis);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setIsLoading(false);
  
        // Start playing when audio is loaded and state.isPlaying is true
        if (isPlaying) {
          await newSound.playAsync();
        }
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

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!state.name || !isValidURL(state.name)) {
    return null; // Render nothing if the name is empty or not a valid URL
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text style={styles.errorText}>Error loading audio</Text>
      ) : (
        <>
          <Text style={styles.playbackStatus}>{isPlaying ? 'Playing' : 'Paused'}</Text>
          <Text style={styles.timeText}>
            {formatTime(position)} / {formatTime(duration)}
          </Text>
          <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
            <Text style={styles.playPauseButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </>
      )}
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  playbackStatus: {
    fontSize: 18,
  },
  timeText: {
    fontSize: 16,
  },
  playPauseButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  playPauseButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AudioPlayer;


