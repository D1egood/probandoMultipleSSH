import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';

export default function Located(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }else if(errorMsg === null){
    text = "Accepted"
  }

  return (
    <View style={{
      flex: 1,
      marginVertical:80,
      alignItems: "center",
      alignContent: 'center',
    }}>
      <Text style={
        {marginBottom:40,
          fontSize:20,
      }}>Esta es tu ubicacion!</Text>
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
      <TouchableOpacity style={{
        marginVertical:100,
        borderRadius: 10,
        width: 200,
        height: 40,
        backgroundColor: '#418998',
      }} onPress={() => {
        props.setLocation(false);
      }}><Text style={styles.paragraph}>Retroceder</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
