import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen name="HomeScreen" component={HomeScreen}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})