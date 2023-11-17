import {
  StyleSheet, Text, View, SafeAreaView,
  Image, KeyboardAvoidingView, TextInput,
  Pressable, TouchableOpacity, Alert
} from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Send a post request to the backEnd 192.168.0.165
    axios.post("http://192.168.0.165:8000/register", user).then((response) => {
      console.log(response);
      Alert.alert("Registration successful", "Your have registered scuccessfully");

      setName("");
      setEmail("");
      setPassword("");

    }
    ).catch((error) => {
      Alert.alert("Registration Error", "An Error occured during registration");
      console.log("Registration failed", error)
    })



  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View>
        <Image
          source={require('../assets/danmart.png')}
          style={{
            margin: 5,
            width: 150,
            height: 100,
          }}
        />
      </View>
      <KeyboardAvoidingView>

        <View style={{ alignItems: "center" }}>
          <Text style={{
            fontSize: 17,
            fontWeight: "bold",
            marginTop: 12,
            color: "#041E42"
          }}>
            Register as New User
          </Text>
        </View>

        <View style={{ marginTop: 60, }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center", gap: 5, paddingVertical: 5,
            backgroundColor: "#d0d0d0d0", borderRadius: 5,
          }}>
            <Ionicons name="person" size={24} color="grey"
              style={{ marginLeft: 5, }}
            />
            <TextInput placeholder='enter your fullNames'
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray", paddingVertical: 5,
                width: 300, margin: 10, fontSize: name ? 16 : 16
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center", gap: 5, paddingVertical: 5,
            backgroundColor: "#d0d0d0d0", borderRadius: 5,
          }}>
            <MaterialIcons name="email" size={24} color="gray"
              style={{ marginLeft: 5, }}
            />
            <TextInput placeholder='enter your email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                paddingVertical: 5, width: 300,
                margin: 10, fontSize: email ? 16 : 16
              }}
            />
          </View>
        </View>




        <View style={{ marginTop: 20, }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center", gap: 5, paddingVertical: 5,
            backgroundColor: "#d0d0d0d0", borderRadius: 5,
          }}>
            <Ionicons name="ios-lock-open" size={24} color="grey"
              style={{ marginLeft: 5, }}
            />
            <TextInput placeholder='enter your password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ color: "gray", paddingVertical: 5, width: 300, margin: 10, fontSize: password ? 16 : 16 }}
            />

          </View>

        </View>

        <View style={{ flexDirection: "row", marginTop: 12, justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "black" }}> Keep me Logged in </Text>
          <Text style={{ color: "red", fontWeight: "bold" }}> Forgot Password? </Text>
        </View>

        <View style={{ marginTop: 80, }} />

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            alignItems: "center",
            backgroundColor: "black",
            width: 140,
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
          }}
        >
          <Text style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: 500,
            color: "gold"
          }}

          > Register </Text>
        </TouchableOpacity>

        <Pressable style={{ marginTop: 15, }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{ color: "grey", fontSize: 16, textAlign: "center" }}
          > Already have an Account? Login</Text>
        </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})