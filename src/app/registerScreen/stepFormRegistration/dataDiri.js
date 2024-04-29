import { StyleSheet, Text, View, ScrollView, Button, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderRegistration from '../../../components/headerRegistration'
import { Color, FontConfig } from '../../../theme'
import CustomInput from '../../../components/customInput'
import DropDownButton from '../../../components/buttonDropdown'
import CustomBottomSheet from '../../../components/bottomSheet'
import GenderChoice from '../../../components/bottomSheet/genderChoice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTemporary, setDataDiriRegistration } from '../../../redux/registration'
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../../components/customButton'
import InterestChoice from '../../../components/bottomSheet/InterestChoice'
import RegistrationService from '../../../services/registration'
import DatePicker from 'react-native-date-picker'
import JobChoice from '../../../components/bottomSheet/jobChoice'

const DataDiriScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isFirstname, setIsFirstname] = useState(true);
    const [isLastname, setIsLastname] = useState(true);
    const [username, setUsername] = useState('');
    const [job, setJob] = useState('');
    const [idJob, setIdJob] = useState(0);
    const [jobData, setJobData] = useState([]);
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
  
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [bio, setBio] = useState(""); 
    const [instagram, setInstagram] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [isModalJobVisible, setIsModalJobVisible] = useState(false);
    const [interest, setInterest] = useState("");
    const [interestData, setInterestData] = useState([]);
    const [idInterest, setIdInterest] = useState("");
  
  
  
    const setOldJob = (data, id) => {
      setJob(data);
      setIdJob(id);
    }
  
    handleJobButton = () => {
      setIsModalJobVisible(true);
    }
  
    handleGenderButton = () => {
      setModalVisible(true);
    }
  
    handleDateButton = () => {
      setIsCalendarVisible(!isCalendarVisible);
    }
  
    handleValidation = () => {
      if(firstname && lastname && job && gender && dateOfBirth ){
        setIsContinue(true);
      }else{
        setIsContinue(false);
      }
    }

    const getJobData = () =>{
        RegistrationService.getAllPekerjaan()
        .then(res=>{
          console.log(res.data.data);
          setJobData(res.data.data);
        })
        .catch(err=>{
          console.log(err);
        })
      }
  
  
    const saveDataDiriRegistration = () => {
      console.log({fullname: `${firstname} ${lastname}`, username: username, job: idJob, bio: bio, gender: gender, dateOfBirth: dateOfBirth})
      dispatch(
        setDataDiriRegistration({fullname:`${firstname} ${lastname}`, username: username, job: idJob, bio: bio, interest: [parseInt(idInterest)], 
        facebook: facebook, instagram: instagram, tiktok: tiktok, twitter: twitter, gender: gender, dateOfBirth: dateOfBirth})
      );
    }
  
    handleLanjutkan = () => {
        saveDataDiriRegistration();
        navigation.navigate("AlamatLengkapRegister");
    }

    useEffect(()=>{
        getJobData();
    },[])
  
    useEffect(()=> {
      handleValidation();
    }, [dateOfBirth, job, gender, firstname, lastname]);
  
    const handleDateChange = (currentDate) => {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth()+1;
      let date = currentDate.getDate();
      if(month < 10){
        month = `0${currentDate.getMonth()+1}`;
      }
  
      if (date < 10){
        date = `0${currentDate.getDate()}`
      }
      console.log(`${year}/${month}/${date}`);
      setDateOfBirth(`${year}/${month}/${date}`);
    }
  
    return (
      <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet children={<GenderChoice gender={gender} setModalVisible={setModalVisible} setGender={setGender} />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} title="Pilih Jenis Kelamin" />
        <CustomBottomSheet children={<JobChoice id={idJob} setId={setIdJob} data={jobData} item={job} setModalVisible={setIsModalJobVisible} setItem={setJob} />} 
        isModalVisible={isModalJobVisible} setModalVisible={setIsModalJobVisible} title="Pilih Pekerjaan" />
        <HeaderRegistration navigation={navigation} numberStep={1} />
        <ScrollView>
          <View style={styles.topSection}>
            <Text style={styles.textIsiData}>Isi data diri</Text>
            <Text style={styles.textLengkapi}>Lengkapi data dirimu dan pastikan data yang dimasukkan sudah benar</Text>
            <View style={styles.boxForm}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '45%'}}>
                  <Text style={styles.titleFormInput}>Nama Depan</Text>
                  <CustomInput inputNotWrong={isFirstname} value={firstname} setValue={setFirstname} placeholder="Nama depan" />
                </View>
                <View style={{width: '5%'}}></View>
                <View style={{width: '45%'}}>
                  <Text style={styles.titleFormInput}>Nama Belakang</Text>
                  <CustomInput inputNotWrong={isLastname} value={lastname} setValue={setLastname} placeholder="Nama belakang" />
                </View>
              </View>
              <Text style={styles.titleFormInput}>Pekerjaan</Text>
              <DropDownButton placeholder='Pilih pekerjaan' text={job} onPress={handleJobButton} />
              <Text style={styles.titleFormInput}>Jenis Kelamin</Text>
              <DropDownButton placeholder='Pilih' text={gender} onPress={handleGenderButton} />
              <Text style={styles.titleFormInput}>Tanggal Lahir</Text>
              <DropDownButton placeholder='Pilih' text={dateOfBirth} onPress={handleDateButton} />
              <DatePicker 
              modal
              mode='date'
              open={isCalendarVisible}
              date={new Date('2020-04-28T12:18:48.002Z')}
              onConfirm={(date)=>{
                setIsCalendarVisible(false);
                handleDateChange(date);
              }}
              onCancel={()=>{
                setIsCalendarVisible(false);
              }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomSection}>
          <View style={styles.buttonContinue}>
            <CustomButton
                onPress={handleLanjutkan} 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='100%' height={44} text="Lanjutkan"
                disabled={!isContinue}
                backgroundColor={Color.primaryMain}
                />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  
  export default DataDiriScreen
  
  const styles = StyleSheet.create({
      boxForm: {
        marginTop: 10
      },
      buttonContinue: {
        borderRadius: 20, 
        width: '80%',
      },
      topSection: {
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#FFFF'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      mediaSosial: {
        paddingTop: 20
      },
      textIsiData: {
          ...FontConfig.titleOne,
          color: Color.grayThirteen,
      },
      textLengkapi: {
          ...FontConfig.bodyTwo,
          color: Color.graySeven,
          marginTop: 5
      },
      titleFormInput:{
        color: Color.secondaryText,
        ...FontConfig.bodyTwo,
        marginTop: 10,
        marginBottom: 1
      },
      textMasukanDeskripsi: {
        ...FontConfig.bodyThree,
        marginVertical: 5
      },
      boxDate: {
        borderRadius: 10 , 
        shadowOffset: {width: 2, height: 2},
      },
      bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10
      },
  })