import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';

export default function App(props) {

    const [startCamera, setStartCamera] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const CameraPreview = ({photo}) => {
        return (
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              width: '100%',
              height: '100%'
            }}
          >
            <ImageBackground
              source={{uri: photo && photo.uri}}
              style={{
                flex: 1
              }}
            />
          </View>
        )
      }

    const __startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true);
        } else {
            Alert.alert("Access denied");
        };
        // props.setCamera(false);
    }
    const takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync();
        console.log(photo);
        setPreviewImage(false);
        setCapturedImage(photo);
        props.setPhoto({
            preview: true,
            capturedImage: photo,
        });
        props.setCamera(false);

    };

    return (
        <View style={styles.container}>
    
                    <View style={styles.buttonContainer}>
                        {startCamera ? (<Camera
                            style={styles.camera}
                            ref={(r) => {
                                camera = r;
                            }}

                        ><View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                padding: 20,
                                justifyContent: 'space-between'
                            }}
                        >
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        flex: 1,
                                        alignItems: 'center'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={takePicture}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            bottom: 0,
                                            borderRadius: 50,
                                            backgroundColor: '#fff'
                                        }}
                                    />
                                </View>
                            </View></Camera>) : (<View
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={__startCamera}
                                    style={styles.button}
                                >
                                    <Text style={styles.text}>
                                        Take picture
                           </Text>
                                </TouchableOpacity>
                            </View>)}
                    </View>

            </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        width: '100%',
    },
    button: {
        width: 130,
        borderRadius: 4,
        backgroundColor: '#14274e',

        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',

    },
});