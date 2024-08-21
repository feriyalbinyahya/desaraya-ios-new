import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import UbahLaporanScreen from '../app/laporanScreen/ubahLaporan'
import LaporanDiubahScreen from '../app/laporanScreen/ubahLaporan/laporanDiubah'
import UbahProfileScreen from '../app/profileScreen/ubahProfile'
import UbahDataDiriScreen from '../app/profileScreen/ubahProfile/ubahDataDiri'
import UbahAkunScreen from '../app/profileScreen/ubahProfile/ubahAkun'
import InfoAkunScreen from '../app/profileScreen/infoAkun'
import UbahKataSandiScreen from '../app/profileScreen/ubahProfile/UbahKataSandi'
import OrganisasiTerpilihScreen from '../app/registerScreen/organisasiTerpilih'
import KodeOTPScreen from '../app/registerScreen/stepFormRegistration/kodeOTP'
import SplashScreen from '../app/splashScreen'
import LupaPasswordScreen from '../app/lupaPasswordScreen'
import BuatKataSandiScreen from '../app/lupaPasswordScreen/buatKataSandi'

const Stack = createNativeStackNavigator()

const AppRoute = () => {
    const [splashLoading, setSplashLoading] = useState(true);
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
    <>{splashLoading ? 
      <SplashScreen setIsLoading={setSplashLoading} /> :
    <NavigationContainer ref={navigationRef}
    >
    { token == ''?
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false, }} name="Login" component={SignInPage} />
            <Stack.Screen options={{headerShown: false,}} name="Register" component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false}} name="LupaPassword" component={LupaPasswordScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BuatKataSandi" component={BuatKataSandiScreen} />
            <Stack.Screen options={{ headerShown: false }} name="DataDiriRegister" component={DataDiriScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AlamatLengkapRegister" component={AlamatLengkapScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AmbilSelfieRegister" component={AmbilSelfieScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="AmbilFotoRegister" component={AmbilFotoScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="HasilFotoRegister" component={HasilFotoScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeReferralRegister" component={KodeReferralScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'simple_push' }} name="OrganisasiTerpilihRegister" component={OrganisasiTerpilihScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeOTPRegister" component={KodeOTPScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="DropDown" component={DropDownPage} />
        </Stack.Navigator> :

      <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Homepage" component={HomepageScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListCSR" component={CSRScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ProgramBerjalan" component={ProgramBerjalanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BuatLaporan" component={BuatLaporanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahLaporan" component={UbahLaporanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="UploadPhotoLaporan" component={UploadPhotoScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Lokasi" component={LokasiScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="LaporanTerkirim" component={LaporanTerkirimScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailLaporan" component={DetailLaporanScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="LaporanDiubah" component={LaporanDiubahScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Profile" component={ProfileScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="UbahProfile" component={UbahProfileScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahDataDiriProfile" component={UbahDataDiriScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahAkunProfile" component={UbahAkunScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="InfoAkunProfile" component={InfoAkunScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahKataSandiProfile" component={UbahKataSandiScreen} />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeOTPRegister" component={KodeOTPScreen} />
            
      </Stack.Navigator>
    }

    </NavigationContainer>}</>
  )
}

export default AppRoute

const styles = StyleSheet.create({})