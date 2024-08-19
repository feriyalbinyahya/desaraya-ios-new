import { StyleSheet, Text, View, Image, Pressable, TextInput, Linking, SafeAreaView } from 'react-native'
import React , {useEffect, useState} from 'react'
import iconBack from '../../assets/images/icon/icon_back.png'
import { Color, FontConfig } from '../../theme'
import CustomInput from '../../components/customInput'
import CustomButton from "../../components/customButton";
import FormErrorMessage from '../../components/alert/formErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDataRegistration, setAuthRegistration } from '../../redux/registration'
import RegistrationServices from '../../services/registration'
import AwesomeAlert from 'react-native-awesome-alerts';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'

const RegisterScreen = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [isPhone, setIsPhone] = useState(true);
    const [phoneNotEmpty, setPhoneNotEmpty] = useState(true);
    const [phoneIsFocused, setPhoneIsFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [phoneExist, setPhoneExist] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const containsUpperCase = (str) => {
      return /[A-Z]/.test(str);
    }

    const containsNumber = (str) => {
      return /[0-9]/.test(str);
    }

    phoneValidation = (phone) => {
      const reg = /^[0]?[789]\d{8,11}$/;
      if (reg.test(phone) === false) {
        setIsPhone(false);
      }else{
        setIsPhone(true);
      }
    }

    passwordValidation = (password) => {
      if(!(containsUpperCase(password) && password.length>7 && containsNumber(password))){
        setIsPassword(false);
      }else{
        setIsPassword(true);
      }
    }

    confirmPasswordValidation = (password, confirmPassword) => {
      if(password != confirmPassword){
        setIsPasswordMatch(false);
      }else{
        setIsPasswordMatch(true);
      }
    }

    handleDevelopButton = () => {
      navigation.navigate("DataDiriRegister");
    }

    handleDaftarButton = () => {
      if(phone){
        setPhoneNotEmpty(true);
        phoneValidation(phone);
      }else{
        setPhoneNotEmpty(false);
        setIsPhone(false);
      }
      if(password){
        passwordValidation(password);
      }else{
        setIsPassword(false);
      }
      if(confirmPassword){
        confirmPasswordValidation(password, confirmPassword);
      }else{
        setIsPasswordMatch(false);
      }

      if(phone && password && confirmPassword && isPhone && isPassword && isPasswordMatch){
        setLoading(true);
        RegistrationServices.checkPhone({"no_hp": phone})
        .then(res=>{
          console.log(res.data.message);
          if(res.data.message == "No seluler sudah dipakai."){
            setPhoneExist(true);
          }else if(res.data.message == "No seluler belum dipakai."){
            saveAuthRegistration(phone, password, confirmPassword);
            navigation.navigate("DataDiriRegister");
          }
          setLoading(false);
        })
        .catch(err=>{
          console.log(err.response);
          setLoading(false);
        })
      }
    }

    useEffect(()=>{
      if(phone){
        phoneValidation(phone);
      }
    }, [phone]);

    useEffect(()=>{
      if(confirmPassword){
        confirmPasswordValidation(password, confirmPassword);
      }
    }, [confirmPassword]);

    useEffect(() => {
      if(password){
        passwordValidation(password);
        confirmPasswordValidation(password, confirmPassword);
      }
    }, [password]);

    useEffect(()=>{
      if(isPhone && isPassword && isPasswordMatch && phone && password && confirmPassword){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }, [isPhone, isPassword, isPasswordMatch])

    const saveAuthRegistration = (phone, password, confirmPassword) => {
      dispatch(
        setAuthRegistration({phone: phone, password: password})
      );
    }

    const subtitleText = 'Yuk jadi bagain dari HARA Foundation';
  return (
    <SafeAreaView style={styles.registerPage}>
      <View style={styles.section}>
        <View style={{height: 20}}></View>
        <View><Text style={styles.textHeading}>Daftar</Text></View>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.graySeven}}>{subtitleText}</Text>
        <Text style={styles.titleFormInput}>{`Nomor Telepon (terdaftar di whatsapp)`}</Text>
        <TextInput value={phone} onChangeText={setPhone} onBlur={() => setPhoneIsFocused(false)} onFocus={() => setPhoneIsFocused(true)} 
        style={{...styles.phoneInput, borderColor: !isPhone? Color.danger : ((phoneIsFocused)? Color.primaryMain : Color.lightBorder)}} 
        keyboardType='number-pad' placeholder='08' placeholderTextColor={Color.disable} />
        {phoneNotEmpty?(isPhone? <></> : <FormErrorMessage text="Nomor ponsel yang dimasukkan tidak valid." />): 
        <FormErrorMessage text="Kolom wajib diisi." />}
        <Text style={styles.titleFormInput}>Kata Sandi</Text>
        <CustomInput inputNotWrong={isPassword} rightPress={()=>setShow(!show)} iconRight={show ? "eye" : "eye-off"} iconRightColor={Color.lightBorder} value={password} setValue={setPassword}
         type={show? 'text' : 'password'}/>
        <Text style={{...styles.textInfoPassword, color: isPassword? Color.neutralZeroSeven: Color.danger}}>Kata sandi minimal 8 karakter, terdiri dari huruf kapital dan angka.</Text>
        <Text style={styles.titleFormInput}>Konfirmasi Kata Sandi</Text>
        <CustomInput inputNotWrong={isPasswordMatch} rightPress={()=>setShowConfirm(!showConfirm)} iconRight={showConfirm ? "eye" : "eye-off"} iconRightColor={Color.lightBorder} value={confirmPassword} setValue={setConfirmPassword}
         type={showConfirm? 'text' : 'password'}/>
        {isPasswordMatch? <></>: <FormErrorMessage text="Kata sandi yang dimasukkan tidak sama dengan yang kamu buat." />}

        <View style={{height: 20}}></View>
        <CustomButton disabled={false} onPress={handleDevelopButton} fontStyles={{...FontConfig.buttonOne, color: 'white'}} 
            text="Daftar" backgroundColor={Color.primaryMain} height={44} />
        <View style={styles.tidakPunyaAkun}>
            <Text style={styles.textBelumPunyaAkun}>Belum punya akun?</Text>
            <Pressable onPress={()=> navigation.pop()}><Text style={styles.textDaftar}>Masuk</Text></Pressable>
        </View>
      </View>
      <AwesomeAlert
          show={phoneExist || isLoading}
          showProgress={phoneExist ? false : isLoading}
          progressColor={Color.graySeven}
          title={phoneExist ? "Nomer ponsel sudah dipakai" : ""}
          message={phoneExist?  "Silakan masukkan nomer ponsel yang belum pernah didaftarkan" : isLoading ? "Loading..." : ""}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={phoneExist ? true : false}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyTwo, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setPhoneExist(false);
          }}
        />
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    atau: {
        alignItems: 'center',
        marginVertical: 15
    },
    buttonBack: {
        width: 32,
        height: 32
    },
    checkboxOff: {
      borderWidth: 1.5,
      borderColor: Color.secondaryText,
      width: 16,
      height: 16,
      backgroundColor: Color.neutralZeroOne,
      marginHorizontal: 3
    },
    daftarGoogle: {
        flexDirection:'row',
      },
    registerPage: {
        overflow: "hidden",
        height: 800,
        width: "100%",
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    section:{
        margin:20
    },
    textHeading: {
        ...FontConfig.titleOne,
        color: Color.grayTen,
        width: '70%'
    },
    textInfoPassword: {
        ...FontConfig.bodyThree,
        width: '80%',
        marginTop: 3
    },
    titleFormInput:{
        color: Color.neutralEleven,
        ...FontConfig.bodyThree,
        marginTop: 10,
        marginBottom: 1
    },
    textDaftarGoogle: {
        ...FontConfig.buttonZeroTwo,
        color: Color.grayThirteen,
        marginHorizontal: 15
      },
    phoneInput: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        ...FontConfig.bodyOne,
        color: Color.primaryText
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