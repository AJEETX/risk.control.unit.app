import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import UserTracker from "./UserTracker";
import UserLocation from "./UserLocation";
import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      {/* <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph> */}
      {/* <View style={styles.container}>
          <UserTracker />
      </View> */}
      <UserTracker />
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('UserLocation')
        }
      >
        <AntDesign name="camerao" size={28} color="green" /> Photo 
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      >
        <AntDesign name="logout" size={24} color="green" /> Logout
      </Button>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
