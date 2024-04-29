import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../assets/images/icon/Hara_Logo.png'
import CustomInput from '../../components/customInput';
import {useDispatch} from 'react-redux'
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'
import { Color, FontConfig } from '../../theme';
import CustomButton from '../../components/customButton';

const SignInPage = ({navigation}) => {
  const welcomeText = 'Selamat datang di HARA Foundation';
  const informationText = 'Kata sandi minimal 8 karakter yang terdiri dari huruf kapital dan angka.';

  const [emailphone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
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
  }

  const handleLogin = () => {

  }
  return (
    <SafeAreaView style={{backgroundColor: Color.neutralZeroOne, flex:1}}>
      <View style={{height: 20}}></View>
      <View style={{alignItems: 'center'}}><Image source={Logo} style={{height: 85, width: 54}} /></View>
      <View style={styles.container}>
        <Text style={{...FontConfig.titleOne, color: Color.grayTen}}>Masuk</Text>
        <Text style={{...FontConfig.bodyTwo, color: Color.graySeven}}>{welcomeText}</Text>
        <Text style={{...FontConfig.bodyTwo, marginTop: 10}}>Nomor Telepon</Text>
        <CustomInput value={emailphone} setValue={setEmailPhone}
        placeholder={'08'} type='text'/>
        <Text style={{...FontConfig.bodyTwo, marginTop: 10}}>Password</Text>
        <CustomInput rightPress={()=>setShow(!show)} iconRight={show ? "eye" : "eye-off"} iconRightColor={Color.lightBorder} value={password} setValue={setPassword}
         type={show? 'text' : 'password'}/>

         <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{informationText}</Text>
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
    </SafeAreaView>
  )
}

export default SignInPage

const styles = StyleSheet.create({
  container: {
    padding: 20,
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