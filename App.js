import {Alert, StyleSheet, Text, View, Dimensions, Image, StatusBar, TextInput} from 'react-native';
import React, {useState, useEffect} from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as Location from "expo-location";
import enviroment from './enviroment/enviroment.json';
import rodizio from './rodizio'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'; //to keep it responsive

export default function App() {
  let [posicao, setPosicao] = useState(null);
  let [destino, setDestino] = useState();

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted"){
        Alert.alert("Ops!", "Não foi possível acessar localização atual, setamos a localização padrão.");
        setPosicao({
          latitude: -23.51258725474799,
          longitude: -46.60913812329917,
          latitudeDelta: 0.00930,
          longitudeDelta: 0.00300,
        });
      };

      let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      setPosicao({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.00930,
        longitudeDelta: 0.00300,
      });
    })()
  }, []);

  function obterRodizio(){
    let dataHoje = new Date();
    return rodizio.rodizios[dataHoje.getDay()];
  }

  function obterDestino(){
    return destino ? destino : {latitude: 0, longitude: 0};
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Destino..'
        minLength={1}
        suppressDefaultStyles={true}
        returnKeyType={'default'}
        fetchDetails={true}
        styles={{
          listView: {
            position: 'absolute',
            backgroundColor: '#FFF',
            zIndex: 10,
            marginTop: hp('7%')
          },
        
          separator: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: '#c8c7cc',
          },
          predefinedPlacesDescription: {
            color: '#afaadb'
          },
          row: {
            // backgroundColor: '#FFFFFF',
            padding: 13,
            minHeight: 44,
            flexDirection: 'row',
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
          textInputContainer: {
            width: Dimensions.get('window').width - 20,
            marginBottom: 12,
            backgroundColor: "white",
            elevation: 4,
            height: 45,
            borderRadius: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            marginTop: 12
          },
          textInput: {
            width: "100%",
            backgroundColor: '#FFFFFF',
            height: 45,
            borderRadius: 5,
            paddingHorizontal: 10,
            fontSize: 15
            },
          }
        }
        onPress={(data, details = null) => {
          setDestino({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
          });
        }}
        query={{
          key: enviroment.apiKey,
          language: 'pt-BR',
        }} />
        <MapView
          style={styles.mapContainer}
          provider={PROVIDER_GOOGLE}
          region={posicao}
          showsTraffic={true}
          showsUserLocation={true}>
        <MapViewDirections
          origin={posicao}
          destination={destino}
          apikey={enviroment.apiKey}
          strokeWidth={8}
          strokeColor={'cyan'}
        />
        <Marker
          coordinate={obterDestino()}
          title={"Seu destino."} />
      </MapView>
      <Text style={{marginBottom: 40, marginTop: 22}}>Rodízio hoje: {obterRodizio()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: StatusBar.currentHeight,
  },
  mapContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150
  },
  inputContainer:{
    flexDirection: 'column',
    width: 350,
  },
  // poweredContainer: {
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   borderBottomRightRadius: 5,
  //   borderBottomLeftRadius: 5,
  //   borderColor: '#c8c7cc',
  //   borderTopWidth: 0.5,
  //   top: 700,
  //   fontSize: 18
  // },
  // powered: {

  // },
  // listView: {

  // },
  // row: {
  //   backgroundColor: '#FFFFFF',
  //   padding: 13,
  //   height: 44,
  //   flexDirection: 'row',
  //   fontSize: 18
  // },
  // separator: {
  //   height: 0.5,
  //   backgroundColor: '#c8c7cc',
  // },
  // description: {

  // },
  // loader: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   height: 20,
  // },
});
