import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';

export default function WeatherInfo({currW}){
    const icon = currW.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    return(
        <View style={styles.wInfo}> 
            <Text>{currW.name}</Text>
            <Image style={styles.wIcon} source={{uri: iconURL}}/>
            <Text>{currW.main.temp}</Text>
            <Text style={styles.wDes}>{currW.weather[0].description}</Text>
            <Text style={styles.wDes}>{currW.weather[0].main}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    wInfo : {
        alignItems:'center',
    },
    wIcon : {
        width : 100,
        height : 100
    },
    wDes:{
        textTransform: 'capitalize'
    }
});