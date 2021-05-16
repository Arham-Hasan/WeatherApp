import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'

const WAPIKEY = "d42297f73e0bdf0fdab4e10d40fc4051";

export default function App() {

  const [errorMsg, setErrorMsg] = useState('Loading...');
  const [currW, setCurrW] = useState(null);
  const [units, setUnits] = useState('metric');

  useEffect(() => {
    load();
  },[]);

  async function load(){
    try{
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted'){
        setErrorMsg('Access to location denied')
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const wURL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=${units}&appid=${WAPIKEY}`;

      const res = await fetch(wURL);
      const result = await res.json();
      if (res.ok){
        setCurrW(result);
      }
    } catch(error){
      setErrorMsg(error.message);
    }
  }
if (currW){
  return (
    <View style={styles.container}>
      <WeatherInfo currW={currW}/>
      <StatusBar style="auto" />
    </View>
  );
}
else{
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <StatusBar style="auto" />
    </View>
  );
}
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
