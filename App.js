import React, { useState, useEffect, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, SafeAreaView, Dimensions, FlatList } from 'react-native';
import Camera from "./Camera";
import Located from './Location'
import Users from './Users'
import * as Notifications from 'expo-notifications';
import Notificacion from './Notificacion';




const hp = Dimensions.get('window').height;
const wp = Dimensions.get('window').width;
const Message2 =() =>{
  Alert.alert("Notificaciones activadas","Exitosamente!");
}




export default function App() {

  const [camera, setCamera] = useState(false);
  const [location, setLocation] = useState(false);
  const [userState, setUserState] = useState(false);
  const [photo, setPhoto] = useState({});
  const [notificacion,setNotificacion] = useState(false);
 
  const allowsNotificationsAsync= async() => {
    const settings = await Notifications.getPermissionsAsync();
    console.log("settings",settings); 
    Message()
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  }
  const Message =() =>{
    Alert.alert("Desea habilitar las notificaciones?","SI o NO?",[
      {text: "si", onPress:()=>
        Message2()
      },
      {text: "no", onPress:()=>{setNotificacion(false)}}
    ])
  }

  useEffect(() => {
   
  }, [camera, location, userState]);

  const CameraPreview = ({ photo }) => {

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          width: 200,
          height: 200,
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        />
      </View>
    )
  }

  return (

    <View >

      {camera === false && userState === false && location === false && notificacion ==false&& (
        <View style={styles.container}>
          <View style={styles.head3}></View>
          <View style={styles.head}>
            <TouchableOpacity style={styles.button} title='Camera' onPress={() => {
              setCamera(true);
            }} ><Text style={styles.text}>Camara</Text></TouchableOpacity>


          </View>
          <View style={styles.head}>

            <TouchableOpacity style={styles.button} title='Ubicacion' onPress={() => {
              setLocation(true);
            }} ><Text style={styles.text}>Ubicacion</Text></TouchableOpacity>

          </View>

          <View style={styles.head}>
            <TouchableOpacity style={styles.button} title='Notificaciones' onPress={() => {
           allowsNotificationsAsync();
           setNotificacion(true);
            }} ><Text style={styles.text} >Notificaciones</Text></TouchableOpacity>

          </View>
          <View style={styles.head}>

            <TouchableOpacity style={styles.button} title='gitHub users' onPress={() => {
              setUserState(true);
            }} ><Text style={styles.text}>Api nombres</Text></TouchableOpacity>

          </View>
          <View style={styles.head2}>

            {photo?.preview === true && (<CameraPreview photo={photo.capturedImage} />)}
          </View>

        </View>
      )}
      {(camera === true && (<Camera setCamera={setCamera} setPhoto={setPhoto} />))}
      {userState === true && (<Users setUserState={setUserState} userState={userState} />)}
      {location === true && (<Located setLocation={setLocation} location={location} />)}
      {notificacion === true &&(<Notificacion setNotificacion={setNotificacion} notificacion={notificacion}/>)}
    </View>
  );


}

const styles = StyleSheet.create({
  container1: { flex: 0.2, },

  container: {
    height: '100%',
    width: "100%",
    flex: 1,

  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  head: {
    flex: 0.2,
    marginVertical: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: "4%",

  },
  head3: {
    flex: 0.1,
    padding: "5%",

  },
  head2: {
    flex: 1,
    marginVertical: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 40,
    backgroundColor: '#418998',
  }
});

