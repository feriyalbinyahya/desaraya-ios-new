import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo_desaraya.png'
import CustomInput from '../../components/customInput';
import {useDispatch} from 'react-redux'
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'
import { Color, FontConfig } from '../../theme';
import CustomButton from '../../components/customButton';
import LoginServices from '../../services/login';
import { setCredentials } from '../../redux/credentials';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/loader';

const SignInPage = ({navigation}) => {
  const welcomeText = 'Masukan nomor ponsel dan kata sandi yang sudah terdaftar.';
  const informationText = 'Kata sandi minimal 8 karakter yang terdiri dari huruf kapital dan angka.';
  const dispatch = useDispatch();
  const [emailphone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [dataLogin, setDataLogin] = useState([]);
  const [show, setShow] = useState(false);
  const [isContinue, setIsContinue] = useState(true);
  const [showAlertWrongPassword, setShowAlertWrongPassword] = useState(false);
  const [showAlertWrongPhone, setShowAlertWrongPhone] = useState(false);
  const [showAlertStatusAccount, setShowStatusAccount] = useState(false);
  const [showAlertPhoneNotVerified, setShowAlertPhoneNotVerified] = useState(false);
  const [showAlertSomethingWrong, setShowAlertSomethingWrong] = useState(false);
  const [showAlertNoWhatsapp, setShowAlertNoWhatsapp] = useState(false);
  const [showAlertVersionWrong, setShowAlertVersionWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLupaKatSandi = () => {
    navigation.navigate("LupaPassword");
  }

  const handleLogin = () => {
    setIsLoading(true);
    LoginServices.login({"no_hp": emailphone, "password": password})
    .then(async(res)=> {
      setDataLogin(res.data.data);
      setMessage(res.data.message);
      setIsLoading(false);
    })
    .catch(err=> {
      console.log(err.response);
      setIsLoading(false);
    })
  }

  const saveCredentials = (data) => {
    console.log(data);
    if(!isLoading){
      dispatch(
        setCredentials({fotoOrganisasi: data.foto_organisasi, namaOrganisasi: data.nama_organisasi, idOrganisasi: data.id_organisasi, idUser: data.id_user, idRelawan: data.id_relawan,
        isNoHpVerified: data.is_no_hp_verified, fullname: data.nama_user, noHp: data.no_hp, 
        status: data.status_persetujuan, token: data.token, fotoProfil: data.foto_profil, isReferalOrganization: data.is_referal_organization, statusPolicy: data.status_policy})
      );
      AsyncStorage.setItem('token', data.token);
    }
  }

  const testAPI = () => {
    LoginServices.testAja()
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    testAPI();
  },[])

  useEffect(()=>{
    if(!isLoading && message){
      if(message == "Login sukses."){
        saveCredentials(dataLogin);
      }else if(message == 'Kata sandi yang anda masukan salah.'){
        setShowAlertWrongPassword(true);
      }else if(message == 'Nomor ponsel tidak terdaftar.'){
        setShowAlertWrongPhone(true);
      }else if(message == "Akunmu telah dinonaktifkan, silahkan hubungi organisasimu untuk detail selengkapnya."){
        setShowStatusAccount(true);
      }else if(message == "No HP belum diverifikasi."){
        setShowAlertPhoneNotVerified(true);
      }else{
        setShowAlertSomethingWrong(true);
      }
    }
  }, [isLoading])


  return (
    <SafeAreaView style={{backgroundColor: Color.neutralZeroOne, flex:1}}>
      <View style={{height: 20}}></View>
      <View style={{alignItems: 'center'}}><Image source={Logo} style={styles.logoDashboard} /></View>
      <View style={styles.container}>
        <Text style={{...FontConfig.titleOne, color: Color.grayTen}}>Selamat Bergabung!</Text>
        <Text style={{...FontConfig.bodyTwo, color: Color.graySeven}}>{welcomeText}</Text>
        <Text style={{...FontConfig.bodyTwo, marginTop: 10}}>Nomor Ponsel</Text>
        <CustomInput value={emailphone} setValue={setEmailPhone}
        placeholder={'08'} type='text'/>
        <Text style={{...FontConfig.bodyTwo, marginTop: 10}}>Password</Text>
        <CustomInput rightPress={()=>setShow(!show)} iconRight={show ? "eye" : "eye-off"} iconRightColor={Color.lightBorder} value={password} setValue={setPassword}
         type={show? 'text' : 'password'}/>
         <View style={{alignItems: 'flex-end', marginVertical:20}}>
            <Pressable onPress={handleLupaKatSandi}><Text style={{...FontConfig.buttonThree, color: Color.primaryMain}}>Lupa Kata Sandi</Text></Pressable>
          </View>
          <CustomButton disabled={!isContinue} onPress={handleLogin} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} 
          text="Masuk" backgroundColor={Color.primaryMain} height={44} />
          <View style={styles.tidakPunyaAkun}>
            <Text style={styles.textBelumPunyaAkun}>Belum punya akun?</Text>
            <Pressable onPress={()=> navigation.navigate('Register')}><Text style={styles.textDaftar}>Daftar disini</Text></Pressable>
          </View>
      </View>

      <Loader isLoading={isLoading} />
        <AwesomeAlert
          show={showAlertWrongPassword}
          showProgress={false}
          title="Kata sandi salah"
          message="Kata sandi yang Anda masukkan salah. Silakan coba lagi."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertWrongPassword(false);
          }}
        />
        <AwesomeAlert
          show={showAlertWrongPhone}
          showProgress={false}
          title="Nomor ponsel tidak terdaftar"
          message="Nomer ponsel yang Anda masukkan belum terdaftar. Periksa nomer ponsel dan coba lagi."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertWrongPhone(false);
          }}
        />
        <AwesomeAlert
          show={showAlertNoWhatsapp}
          showProgress={false}
          title="Tidak dapat menghubungi"
          message="Aplikasi whatsapp belum terinstall di perangkat Anda"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Oke, mengerti"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertNoWhatsapp(false);
          }}
        />
        <AwesomeAlert
          show={showAlertPhoneNotVerified}
          showProgress={false}
          title="Nomor ponsel belum diverifikasi"
          message="Nomer ponsel yang Anda masukkan belum terverifikasi. Verifikasi terlebih dahulu untuk dapat melanjutkan."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Pergi Verifikasi"
          cancelText="Batal"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '50%', height: '80%',  alignItems: 'center'}}
          cancelButtonStyle={{width: '40%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            navigation.navigate('KodeOTPRegister', {onPress: "homepage", phone: emailphone});
          }}
          onCancelPressed={()=>{
            setShowAlertPhoneNotVerified(false);
          }}
        />
        <AwesomeAlert
          show={showAlertSomethingWrong}
          showProgress={false}
          title="Tidak bisa masuk"
          message="Ada yang salah. Anda tidak dapat masuk ke aplikasi."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '80%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlertSomethingWrong(false);
          }}
        />
    </SafeAreaView>
  )
}

export default SignInPage

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logoDashboard:{
    width: 60.95,
    height: 56,
    marginVertical: 20
  },
  textBelumPunyaAkun: {
    ...FontConfig.bodyThree,
    color: Color.neutralColorGrayEight
  },
  textDaftar: {
    ...FontConfig.buttonThree,
    color: Color.primaryMain,
    marginHorizontal: 5,
  },
  tidakPunyaAkun: {
    flexDirection: 'row',
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
})