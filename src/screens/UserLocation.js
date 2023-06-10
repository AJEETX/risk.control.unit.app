import React, { useState, useEffect, useRef } from "react";
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { LogBox } from 'react-native';


const UserLocation = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  //Camera
  const [flashMode, setFlashMode] = useState('off')
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoData, setPhotoData] = useState();

  //GPS
  const [gps, setGps] = useState(null);

  useEffect(() => {
    permission();
  }, []);
  //Camera
  const permission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    setHasPermission(status);
  };

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }

  }
  const takePhoto = async () => {
    const data = await camera.current.takePictureAsync();
    setPhotoData(data);
  };
  let camera = useRef(null);

  // Camera Preview // SAVE Photo
  let savedPhoto = useRef(null);
  const savePhoto = async () => {
    const photo = await captureRef(savedPhoto, {
      result: "tmpfile",
      height: 1980, // these can be adjusted to fit the photo size you like
      width: 1180, // these can be adjusted to fit the photo size you like
      quality: 0.7,
      format: "jpg",
    });

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      MediaLibrary.createAssetAsync(photo);
      Alert.alert("Photo Saved");
      setPhotoData();
    }

    MediaLibrary.requestPermissionsAsync();
  };

  // GPS // DATE
  const date = new Date();
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const fullDate = `${day} - ${month} - ${year}`;

  const gpsComponent = (
    <View style={styles.gps}>
      {gps ? (
        <View>
          <Text style={styles.prevBtnText}>Date : {fullDate}</Text>
          <Text style={styles.prevBtnText}>Time : {hours}:{min}:{sec}</Text>
          <Text style={styles.prevBtnText}>LAT: {gps.latitude} </Text>
          <Text style={styles.prevBtnText}>LNG: {gps.longitude} </Text>
        </View>
      ) : (
        <View>
          <Text>Waiting...</Text>
        </View>
      )}
    </View>
  );

  useEffect(() => {
    getLocation();
  }, [gps, getLocation]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    // we get the last known location because it populates much quicker
    let location = await Location.getLastKnownPositionAsync({});
    if (!gps) {
      setGps(location.coords);
    }

    let currentLocation = await Location.getCurrentPositionAsync({});

    if (gps && currentLocation.coords.latitude !== gps.latitude) {
      setGps(currentLocation.coords);
    }
  };

  if (!photoData) {
    return (
      <View style={styles.container}>
      <Camera style={styles.container} type={type} ref={camera} flashMode={flashMode}>
        <View style={styles.top}></View>
        <View style={styles.middle}>{gpsComponent}</View>
        <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
        <View style={styles.bottom}>
        <TouchableOpacity
            onPress={__handleFlashMode}
            style={{
            position: 'absolute',
            left: 35,
            top: 35,
            backgroundColor: flashMode === 'off' ? '#000' : '#ddd',
            borderRadius: 70,
            height: 60,
            width: 60
        }}
        >
            <Text style={{ fontSize: 37, left:5 }}>⚡️ </Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <View style={styles.insideButton} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.middlePhoto} ref={savedPhoto}>
        <Image source={{ uri: photoData.uri }} style={{ flex: 1 }} />
        {gpsComponent}
      </View>

      <View style={[styles.bottomPrev]}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => setPhotoData(null)}
        >
          <Text style={styles.prevBtnText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.prevBtn, { marginLeft: 25 }]}
          onPress={savePhoto}
        >
          <Text style={styles.prevBtnText}>Save Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map_container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  top: {
    height: 50,
    backgroundColor: "black",
    opacity: 0.6,
  },
  middle: {
    flex: 1,
    position: "relative",
  },
  middlePhoto: {
    flex: 1,
    position: "relative",
  },
  bottom: {
    height: 135,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomPrev: {
    height: 135,
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    height: 65,
    width: 65,
    borderRadius: 1000,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  insideButton: {
    height: 45,
    width: 45,
    backgroundColor: "white",
    borderRadius: 100,
  },
  prevBtn: {
    height: 65,
    width: 145,
    backgroundColor: "#4a4a4a",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    marginTop: 20,
  },
  prevBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  gps: {
    position: "absolute",
    bottom: 45,
    left: 77,
  },
});

export default UserLocation;
