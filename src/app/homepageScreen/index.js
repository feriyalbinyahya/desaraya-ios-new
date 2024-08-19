import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, Dimensions, ScrollView, RefreshControl, Linking, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import AppBarRelawan from '../../components/appBar'
import { Color, FontConfig } from '../../theme'
import Skeleton from '../../components/skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCredentials, setCredentials, setKeaktifan, setPrivacyPolicy } from '../../redux/credentials'
import IconWaiting from '../../assets/images/icon/waiting.png'
import IconNonAktif from '../../assets/images/icon/nonaktif.png'
import { useFocusEffect } from '@react-navigation/native';
import ProfileServices from '../../services/profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AwesomeAlert from 'react-native-awesome-alerts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginServices from '../../services/login'
import { VERSION } from '../../utils/environment'
import CardProgram from '../../components/cardProgram'
import ProgramServices from '../../services/program'


const HomepageScreen = ({navigation}) => {
    const [dataProgram, setDataProgram] = useState([]);
    const [programIsLoading, setProgramIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [showAlertPrivacyPolicy, setShowAlertPrivacyPolicy] = useState(false);
    const [privacyPolicyDisabled, setPrivacyPolicyDisabled] = useState(true);
    const [showAlertVersionWrong,setShowAlertVersionWrong] = useState(false);
    const [statusAktif, setStatusAktif] = useState('Active');
    const dispatch = useDispatch();
    var status = useSelector((state)=>{
        return state.credential.status;
    })

    const isReferalOrganization = useSelector((state)=>{
        return state.credential.isReferalOrganization;
    })
    const statusPolicy = useSelector((state)=>{
        return state.credential.statusPolicy;
    })

    handleLogout = () => {
        resetCredentials();
    }

    const resetCredentials = () => {
        dispatch(
          deleteCredentials()
        );
    }

    const openGooglePlay = () => {
        Linking.openURL(
          'http://play.google.com/store/apps/details?id=com.gensatset'
        );
    };


    handleRefreshToken = () => {
        ProfileServices.refreshToken({})
        .then(res=> {
          if(res.data.message == "Refresh token berhasil."){
            status = res.data.data.status_persetujuan;
            saveCredentials(res.data.data);
            saveKeaktifan(res.data.data.status);
            setStatusAktif(res.data.data.status);
          }
        })
        .catch(err=> {
          console.log(err);
        })
      }

    const saveCredentials = (data) => {
        console.log("update credential");
        console.log(data);
        dispatch(
          setCredentials({fotoOrganisasi: data.foto_organisasi, namaOrganisasi: data.nama_organisasi, idOrganisasi: data.id_organisasi, idUser: data.id_user, idRelawan: data.id_relawan,
          isNoHpVerified: data.is_no_hp_verified, fullname: data.nama_user, noHp: data.no_hp, 
          status: data.status_persetujuan, token: data.token, fotoProfil: data.foto_profil, isReferalOrganization: data.is_referal_organization, statusPolicy: data.status_policy})
        );
        AsyncStorage.setItem('token', data.token);
    }

    const saveKeaktifan = (data) => {
        dispatch(
          setKeaktifan({keaktifan: data})
        );
    }

    const getProgramTerbaru = () => {
        setProgramIsLoading(true);
        ProgramServices.getProgramHomepage()
        .then(res=>{
            setDataProgram(res.data.data.data);
            setProgramIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
            setProgramIsLoading(false);
        })
    }


    const [selectedMenuBeritaTerkini, setSelectedMenuBeritaTerkini] = useState("Terbaru");
    const [selectedMenuBeritaOrganisasi, setSelectedMenuBeritaOrganisasi] = useState("Terbaru");

    const menus = ["Terbaru", "Kesehatan", "Pendidikan", "Politik", "Olahraga"];
    const width = Dimensions.get('window').width;


    const savePrivacyPolicy = () => {
        dispatch(
            setPrivacyPolicy()
        );
    }

    const onRefresh = React.useCallback(async () => {
        handleRefreshToken();
        setRefreshing(true);
        if(status == "Diterima"){
            //fetchAllDataHomepage();
            getProgramTerbaru();
        }
        setRefreshing(false);
      }, [refreshing]);

    useFocusEffect(
        React.useCallback(() => {
            handleRefreshToken();
            if(status == "Diterima"){
                //fetchAllDataHomepage();
                getProgramTerbaru();
            }
        }, [])
    );
    const skeletonProgram = ["1", "2", "3"];

    const handlePrivacyDisabled = () => {
        ProfileServices.privacyPolicy()
        .then(res=>{
            savePrivacyPolicy();
        })
        .catch(err=>{
            console.log(err.response);
        })
    }


    useEffect(()=>{
        if(statusPolicy == 1 || statusPolicy == "1"){

        }else{
            setShowAlertPrivacyPolicy(true);
        }
    }, [])
  return (
    <SafeAreaView style={{backgroundColor: Color.neutralZeroOne, flex: 1}}>
        <AppBarRelawan navigation={navigation} isReferal={isReferalOrganization} />
        

        <ScrollView style={styles.scrollView} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
            {
                status != "Diterima" ? 
                <><View style={styles.waitingStatus}>
                    <Image source={IconWaiting} style={{width: 34, height: 34}} />
                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{...FontConfig.buttonThree, color: Color.neutralTen}}>Akun berhasil dibuat!</Text>
                        <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Silahkan tunggu persetujuan akunmu untuk dapat menggunakan fitur.</Text>
                    </View>
                </View>
                <View style={{height: 80}}></View>
                </>
                : statusAktif != 'Active' ? 
                <><View style={styles.waitingStatus}>
                    <Image source={IconNonAktif} style={{width: 33.41, height: 34.95}} />
                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{...FontConfig.buttonThree, color: Color.neutralTen}}>Akun anda dinonaktifkan!</Text>
                        <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Akunmu telah dinonaktifkan, silahkan hubungi organisasimu untuk informasi selengkapnya.</Text>
                    </View>
                </View>
                <View style={{height: 100}}></View>
                </> : <></>
            }
            <View style={{height: 20}}></View>
            {status == "Diterima" && statusAktif == 'Active' ? !programIsLoading ? <View style={{paddingHorizontal: 20}}>
                <Text style={{...FontConfig.buttonFour, color: "#111111"}}>Program Sedang Berjalan</Text>
                {dataProgram.map((item, index)=>{
                    return(
                        <CardProgram key={index} berita={item.judul} baru={false} tanggal={item.tanggal_dibuat} id={item.id_csr_program} image={item.cover} navigation={navigation}/>
                    )
                })}

            </View> :
            <View style={{paddingHorizontal: 20}}>
            <Text style={{...FontConfig.buttonFour, color: "#111111"}}>Program Sedang Berjalan</Text>
            {skeletonProgram.map((item, index)=>{
                return(
                    <Skeleton key={index} width={width-40} height={160} style={{borderRadius: 10, marginVertical: 10}} />
                )
            })}

            </View>
             :
             <></>
             }
            
            
            <View style={{height: 10}}></View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomepageScreen

const styles = StyleSheet.create({
    laporanSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#EEEEEE',
    },
    imageNoData : {
        width:120,
        height: 88
    },
    checkboxOff: {
        borderWidth: 1.5,
        borderColor: Color.secondaryText,
        width: 16,
        height: 16,
        backgroundColor: Color.neutralZeroOne,
        marginHorizontal: 3
    },
    scrollView: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Color.neutralZeroOne
    }, 
    beritaSection: {
        paddingVertical: 22,
        borderColor: '#EEEEEE',
        borderBottomWidth: 6
    },
    beritaDaerahSection: {
        paddingHorizontal: 20,
        paddingVertical: 22,
    },
    surveiSection: {
        paddingHorizontal: 0,
        paddingVertical: 22,
        borderColor: '#EEEEEE',
        borderBottomWidth: 6
    },
    carouselSection: {
        paddingVertical: 20
    },
    menuLaporan: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 10,
        paddingVertical: 20,
        rowGap: 20
    },
    dataKawan: {
        height: 60,
        marginHorizontal: 20,
        borderRadius: 6,
        paddingVertical: 5,
        backgroundColor: Color.purple
    },
    dataKawanDisable: {
        height: 60,
        marginHorizontal: 20,
        borderRadius: 6,
        paddingVertical: 5,
        backgroundColor: Color.neutralZeroThree
    },
    iconLaporan: {
        width: 45,
        height: 45,
    },
    itemMenu: {
        alignItems: 'center',
        width: '22%',
    },
    textMenu: {
        ...FontConfig.bodyFive,
        color: Color.title,
        marginTop: 10,
        textAlign: 'center'
    },
    textLihatSelengkapnya:{
        ...FontConfig.buttonThree,
        color: Color.primaryMain,
        
    },
    waitingStatus: {
        padding: 15,
        backgroundColor: '#FFFBE6',
        flexDirection: 'row',
        marginBottom: 15,
        width: '90%',
        position: 'absolute',
        zIndex: 1, top: 10, left: '5%' ,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#FFFBE6'
    }
})