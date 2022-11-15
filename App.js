import { Alert, StyleSheet, Button, Text, TextInput, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from "expo-location";

export default function App() {
  let [posicao, setPosicao] = useState();

  let [origem, setOrigem] = useState(null);
  let [destino, setDestino] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ops!", "Não foi possível acessar localização atual, setamos a localização padrão.");
        setPosicao({
          latitude: -23.51258725474799,
          longitude: -46.60913812329917,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      }

      let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      setPosicao({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })()
  }, []);

  return (
    <View style={styles.container}>

      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        styles={
          {
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              position: 'absolute',
              width: "97%",
              marginLeft: "1.5%",
              backgroundColor: "white",
              elevation: 4,
              padding: 0,
              top: 50,
              height: 44,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 15,

            },
            textInput: {
              backgroundColor: '#FFFFFF',
              height: 44,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 15,

            }
          }
        }
        onPress={(data, details = null) => {
          setOrigem({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          });
        }}
        query={{
          key: '',
          language: 'pt-BR',
        }}

      />

      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        styles={
          {
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              position: 'absolute',
              width: "97%",
              marginLeft: "1.5%",
              backgroundColor: "white",
              elevation: 4,
              padding: 0,
              top: 100,
              height: 44,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 15,

            },
            textInput: {
              backgroundColor: '#FFFFFF',
              height: 44,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 15,

            }
          }
        }
        onPress={(data, details = null) => {
          setDestino({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          });
        }}
        query={{
          key: '',
          language: 'pt-BR',
        }}

      />

      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={posicao} showsTraffic={true}>

        <MapViewDirections
          origin={origem}
          destination={destino}
          apikey={''}
        />

        <Marker
          coordinate={{
            latitude: -23.51258725474799,
            longitude: -46.60913812329917
          }}
          title={"title"}
          description={"description"}
        />

        <Marker
          coordinate={{
            latitude: -23.51258725474899,
            longitude: -46.60913812339917
          }}
          title={"title"}
          description={"description"}
        />
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    position: 'absolute',
    width: "90%",
    backgroundColor: "white",
    elevation: 4,
    padding: 0,
    top: 0,
    height: 44,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 15,

  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 15,

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});
