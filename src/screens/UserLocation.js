import React, { useState, useEffect, useRef } from "react";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const UserLocation = ({ navigation }) => {
  //Camera
  const [flashMode, setFlashMode] = useState("off");
  const [type, setType] = useState(Camera.Constants.Type.front);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
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
          <Text style={styles.prevBtnText}>Date Time : {fullDate} {hours}:{min}:{sec}</Text>
           <Text style={styles.prevBtnText}>Location : {gps.latitude} / {gps.longitude} </Text>
        </View>
      ) : (
        <View>
          <Text>Waiting...</Text>
        </View>
      )}
      <AntDesign onPress={() => navigation.navigate('Dashboard')} name="back" size={36} color="white" />
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
        <Camera
l          style={styles.container}
          type={type}
          ref={camera}
          flashMode={flashMode}
        >
          <View style={styles.top}></View>
          <View style={styles.middle}>{gpsComponent}</View>
          <View style={styles.bottom}>
          <TouchableOpacity
              onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
              style={{
                position: "absolute",
                left: 50,
                top: 30,
                backgroundColor: type === Camera.Constants.Type.back ? "#0f0f0f" : "#f0f0f0",
                color: type === Camera.Constants.Type.back ? "white" : "#fff",
                borderRadius: 70,
                height: 60,
                width: 60,
              }}
            >
              <Text style={{ fontSize: 20, left: 10, top:15, color: type === Camera.Constants.Type.back ? "white" : "black"}}> {type === Camera.Constants.Type.back
                  ? <AntDesign name="retweet" size={24} color="white" />
                  : <AntDesign name="retweet" size={24} color="black" />
              }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <FontAwesome name="camera" style={{ color: "#fff", fontSize: 40}}  />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={__handleFlashMode}
              style={{
                position: "absolute",
                right: 40,
                top: 30,
                borderRadius: 70,
                height: 60,
                width: 60,
              }}
            >
              <Text style={{ fontSize: 30, right: -10, top:5}}>
                <Ionicons  name= { flashMode === "off" ? "flash":"flash-off"} style={{ color: "#fff", fontSize: 40}} />
              </Text>
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
    height: 125,
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
    width: 105,
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
    bottom: 15,
    left: 15,
  },
});

export default UserLocation;
