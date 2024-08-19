import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'
import SignInPage from '../app/signInScreen'
import RegisterScreen from '../app/registerScreen'
import DataDiriScreen from '../app/registerScreen/stepFormRegistration/dataDiri'
import DropDownPage from '../app/dropDownScreen'
import AlamatLengkapScreen from '../app/registerScreen/stepFormRegistration/alamatLengkap'
import AmbilSelfieScreen from '../app/registerScreen/stepFormRegistration/captureSelfie'
import AmbilFotoScreen from '../app/registerScreen/stepFormRegistration/captureSelfie/ambilFoto'
import HasilFotoScreen from '../app/registerScreen/stepFormRegistration/captureSelfie/hasilFoto'
import KodeReferralScreen from '../app/registerScreen/kodeReferral'
import { setDataPendukung } from '../redux/pendukung'
import LoginServices from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import HomepageScreen from '../app/homepageScreen'
import ProfileScreen from '../app/profileScreen'
import CSRScreen from '../app/csrScreen'
import ProgramBerjalanScreen from '../app/csrScreen/programBerjalan'
import BuatLaporanScreen from '../app/laporanScreen/buatLaporan'
import UploadPhotoScreen from '../app/laporanScreen/buatLaporan/uploadPhoto'
import LokasiScreen from '../app/lokasiScreen'
import LaporanTerkirimScreen from '../app/laporanScreen/buatLaporan/laporanTerkirim'
import DetailLaporanScreen from '../app/laporanScreen/detailLaporan'

const Stack = createNativeStackNavigator()

const AppRoute = () => {

    const routeNameRef = useRef()
    const dispatch = useDispatch();
    const token = useSelector((state)=> {
      return state.credential.token;
    })

    const savePendukung = (data) => {
      dispatch(
        setDataPendukung({google_api_key: data.google_api_key, no_hp_cs: data.no_hp_cs})
      );
    }
  
    const getDataPendukung = () =>{
      LoginServices.pendukung()
      .then(res=>{
        savePendukung(res.data.data);
      })
      .catch(err=>{
        console.log(err.response);
      })
    }
  
    useEffect(()=>{
      getDataPendukung();
      console.log(token);
    },[])

  return (
    <NavigationContainer ref={navigationRef}
    >
    { token == ''?
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false, }} name="Login" component={SignInPage} />
            <Stack.Screen options={{headerShown: false,}} name="Register" component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false }} name="DataDiriRegister" component={DataDiriScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AlamatLengkapRegister" component={AlamatLengkapScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AmbilSelfieRegister" component={AmbilSelfieScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="AmbilFotoRegister" component={AmbilFotoScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="HasilFotoRegister" component={HasilFotoScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeReferralRegister" component={KodeReferralScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="DropDown" component={DropDownPage} />
        </Stack.Navigator> :

      <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Homepage" component={HomepageScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListCSR" component={CSRScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ProgramBerjalan" component={ProgramBerjalanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BuatLaporan" component={BuatLaporanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="UploadPhotoLaporan" component={UploadPhotoScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Lokasi" component={LokasiScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="LaporanTerkirim" component={LaporanTerkirimScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailLaporan" component={DetailLaporanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    }

    </NavigationContainer>
  )
}

export default AppRoute

const styles = StyleSheet.create({})