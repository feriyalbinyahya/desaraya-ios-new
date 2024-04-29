import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'
import SignInPage from '../app/signInScreen'
import RegisterScreen from '../app/registerScreen'
import DataDiriScreen from '../app/registerScreen/stepFormRegistration/dataDiri'
import DropDownPage from '../app/dropDownScreen'
import AlamatLengkapScreen from '../app/registerScreen/stepFormRegistration/alamatLengkap'

const Stack = createNativeStackNavigator()

const AppRoute = () => {

    const routeNameRef = useRef()

  return (
    <NavigationContainer ref={navigationRef}
    >
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false, }} name="Login" component={SignInPage} />
            <Stack.Screen options={{headerShown: false,}} name="Register" component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false }} name="DataDiriRegister" component={DataDiriScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AlamatLengkapRegister" component={AlamatLengkapScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="DropDown" component={DropDownPage} />
        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default AppRoute

const styles = StyleSheet.create({})