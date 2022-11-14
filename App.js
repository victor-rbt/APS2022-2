import {Alert, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from "react";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";

export default function App() {
  let [posicao, setPosicao] = useState({
    latitude: -23.51258725474799,
    longitude: -46.60913812329917,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if(status !== "granted"){
        Alert.alert("Ops!", "Não foi possível acessar localização atual, setamos a localização padrão.");
      }
  
      let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      setPosicao({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })()}, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} style={styles.map} region={{
          latitude: -23.51258725474799,
          longitude: -46.60913812329917,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421}} showsTraffic={true}>
          {/* <MapViewDirections
            origin={{
              latitude: -23.51258725474799,
              longitude: -46.60913812329917,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421}}
            destination={{
              latitude: -23.47439933934972,
              longitude: -46.542634688577536,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421}}
            apikey={''} mode={'transit'}
          /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
