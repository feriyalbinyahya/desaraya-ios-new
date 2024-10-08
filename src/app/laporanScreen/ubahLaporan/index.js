import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable, Image, TextInput } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/customInput'
import DropDownButton from '../../../components/buttonDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setPhotos, setTeman } from '../../../redux/laporan'
import CustomBottomSheet from '../../../components/bottomSheet'
import LaporanServices from '../../../services/laporan'
import DocumentPicker from 'react-native-document-picker'
import CapresChoice from '../../../components/bottomSheet/CapresChoice'
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../../../components/customButton'
import SelectView from '../../../components/bottomSheet/select'
import Utils from '../../../utils/Utils'
import { launchImageLibrary } from 'react-native-image-picker'
import ChildrenButton from '../../../components/customButtonChildren'

const UbahLaporanScreen = ({navigation, route}) => {
  const {
    jenisLaporan, typeLaporan, id,
    alamat, long,
    lat, title, nama_dokumen,
    umpan_balik, desc, tahapan, file_dokumen,
    foto_kegiatan } = route.params;
  const [photoKegiatan, setPhotoKegiatan] = useState(foto_kegiatan);
  const [tagTeman, setTagTeman] = useState([]);
  const [tagNamaTeman, setTagNamaTeman] = useState([]);
  const [judul, setJudul] = useState(title);
  const [deskripsi, setDeskripsi] = useState(desc);
  const [saran, setSaran] = useState(umpan_balik);
  const [capres, setCapres] = useState(tahapan);
  const [idCapres, setIdCapres] = useState("");
  const [tag, setTag] = useState("");
  const [idTag, setIdTag] = useState(0);
  const [lokasi, setLokasi] = useState(alamat);
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long);
  const [isContinue, setIsContinue] = useState(false);
  const [countPhoto, setCountPhoto] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [capresLoading, setCapresLoading] = useState(false);
  const [capresData, setCapresData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [isDeskripsi, setIsDeskripsi] = useState(true);
  const [fileSize, setFileSize] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalPhotoVisible, setModalPhotoVisible] = useState(false);
  const [perkiraanPartisipan, setPerkiraanPartisipan] = useState("");
  const [isModalTemanVisible, setIsModalTemanVisible] = useState(false);
  const [showAlertPhotoMoreSize, setShowAlertPhotoMoreSize] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [namaFile, setNamaFile] = useState(nama_dokumen);
  const [hapusDoc, setHapusDoc] = useState(false);
  const [filePdf, setFilePdf] = useState(file_dokumen);
  const [showAlertYakinKirim, setShowAlertYakinKirim] = useState(false);
  const [showAlertFileBig, setShowAlertFileBig] = useState(false);
  const desc_required = useSelector((state)=>{
    return state.laporan.jenisLaporan.desc_required;
  });

  const is_tag_kawan = useSelector((state)=>{
    return state.laporan.jenisLaporan.is_tag_kawan;
  });

  const is_estimasi_partisipan = useSelector((state)=>{
    return state.laporan.jenisLaporan.is_estimasi_partisipan_required;
  });

  const dispatch = useDispatch();

  const setOldTag = (data, id) => {
    setTag(data);
    setIdTag(id);
  }

  const handlePilihDariFileDocument = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        readContent: true
      });
      console.log(results);
      if(results.size <= 10000000){
        setNamaFile(results.name);
        let filePdfBase64 = await Utils.readFileBase64(results.uri);
        let fileAtribut = {
          uri: results.uri,
          type: results.type,
          name: results.name,
        };
        setFilePdf(filePdfBase64);
      }else{
        setShowAlertFileBig(true);
      }
      
          
    }catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
}

  const handleHapusDocument = () =>{
    setFilePdf("");
    setNamaFile("");
    setHapusDoc(true);
  }

  handleLanjutkan = () => {
    setIsLoading(true);
    console.log({
        "tipe_laporan": `Laporan ${typeLaporan}`,
        "judul": judul,
        "tahapan": capres,
        "deskripsi": deskripsi,
        "geotagging_alamat": lokasi,
        "geotagging_longlat": `${longitude}, ${latitude}`,
        "foto_kegiatan": photoKegiatan,
        "file_dokumen": filePdf,
        "nama_dokumen": namaFile,
        "saran": saran
    })
    LaporanServices.updateLaporan(id ,{
      "tipe_laporan": `Laporan ${typeLaporan}`,
      "judul": judul,
      "tahapan": capres,
      "deskripsi": deskripsi,
      "geotagging_alamat": lokasi,
      "geotagging_longlat": `${longitude}, ${latitude}`,
      "foto_kegiatan": photoKegiatan,
      "file_dokumen": filePdf,
      "nama_dokumen": namaFile,
      "saran": saran
  })
  .then(res=>{
    console.log(res.data.message);
    if(res.data.message == "Berhasil memperbarui laporan."){
      navigation.navigate('LaporanDiubah');
    }else{
      setShowAlert(true);
      setMessage(res.data.message);
    }
    setIsLoading(false);
  })
  .catch(err=>{
    console.log(err);
  })
  }

  handleTagButton = () => {
    navigation.navigate('PilihTagLaporan', {title: 'Tag Kegiatan', item: tag, id_tag: idTag, onGoBack: setOldTag, jenisLaporan: jenisLaporan});
  }

  handleLokasiButton = () => {
    navigation.navigate('Lokasi');
  }

  handleAmbilFoto = () => {
    setModalPhotoVisible(false);
    navigation.navigate("AmbilFotoRegister", {path: 'UploadPhotoLaporan', type: 'noholes'});
  }

  const savePhotosLaporan = () =>{
    dispatch(
      setPhotos({photos: photoKegiatan, setPhoto: setPhotoKegiatan, size: fileSize, setFileSize: setFileSize})
    );
  }

  const saveTemanLaporan = () =>{
    dispatch(
      setTeman({teman: tagTeman, namaTeman: tagNamaTeman, setNamaTeman: setTagNamaTeman, setTeman: setTagTeman})
    );
  }

  const saveLocationLaporan = () =>{
    dispatch(
      setLocation({lokasi: lokasi, setLokasi: setLokasi, lat: latitude, long: longitude, 
        setLat: setLatitude, setLong: setLongitude})
    );
  }

  const handleRemovePhotoButton = (index) => {
    setPhotoKegiatan(photos => photos.filter((s,i)=>(i != index)));
  }

  const getCapresData = () =>{
    setCapresLoading(true);
    LaporanServices.getTahapan()
    .then(res=>{
      console.log("list tahapn")
      console.log(res.data.data);
      setCapresData(res.data.data);
      setCapresLoading(false);
    })
    .catch(err=>{
      console.log(err.response);
    })
  }

  handlePilihDariGaleri = async () => {
    setModalPhotoVisible(false);
    let pathImage = '';
    let imageBase64;
    let filesize;
    const options= {
        storageOptions: {
            mediaType: 'photo',
            quality: 0.6,
        },
        includeBase64: true
    };
    await launchImageLibrary(options, (response)=> {
      if(response.assets){
        filesize = parseInt(response.assets[0].fileSize);

        pathImage = {uri: 'data:image/jpeg;base64,' + response.assets[0].base64}
        imageBase64 = response.assets[0].base64;
      }
    });
    if(pathImage){
      navigation.navigate("UploadPhotoLaporan", {imageSource: pathImage, imageBase64: imageBase64, filesize: filesize});
    }
  }

  const UbahPhotoModal = () => {
    return(
    <View style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-evenly'}}>
        <ChildrenButton onPress={handleAmbilFoto} height='95%' width='45%' children={<View style={{alignItems: 'center'}}>
            <Text style={styles.textModal}>Ambil Foto</Text>
            <Ionicons name="camera" size={20} color={Color.primaryMain} />
        </View>} borderColor={Color.primaryMain} />
        <ChildrenButton onPress={handlePilihDariGaleri} width='45%' height='95%' children={<View style={{alignItems: 'center'}}>
            <Text style={styles.textModal}>Pilih Dari Galeri</Text>
            <Ionicons name="folder" size={20} color={Color.primaryMain} />
        </View>} borderColor={Color.primaryMain} />
    </View>
    );
  }

  useEffect(()=> {
    savePhotosLaporan();
  }, [photoKegiatan])

  useEffect(()=> {
    saveTemanLaporan();
  }, [tagTeman])

  useEffect(()=>{
    saveLocationLaporan();
  }, [lokasi])

  useEffect(()=>{
    getCapresData();
  },[])

  useEffect(()=>{
    if(photoKegiatan.length > 0 && judul && (deskripsi || !desc_required) && deskripsi.length < 351 && capres && lokasi){
      setIsContinue(true);
    }else{
      setIsContinue(false);
    }
  }, [photoKegiatan, judul, deskripsi, capres, lokasi])

  useEffect(()=>{
    let jumlahSize = 0;
    for(var i=0; i<fileSize.length; i++){
      jumlahSize = jumlahSize + fileSize[i];
    }
    console.log(jumlahSize);
    if(jumlahSize > 10000000){
      setPhotoKegiatan([]);
      setFileSize([]);
      setShowAlertPhotoMoreSize(true);
    }
  }, [fileSize])

  useEffect(()=>{
    if(deskripsi.length > 350){
      setIsDeskripsi(false);
    }else{
      setIsDeskripsi(true);
    }
  }, [deskripsi])
  return (
    <SafeAreaView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <CustomBottomSheet 
      isModalVisible={isModalVisible}
      setModalVisible={setIsModalVisible}
      title="Tahapan"
      children={<CapresChoice data={capresData} item={capres} setItem={setCapres} idCapres={idCapres} setIdCapres={setIdCapres} setModalVisible={setIsModalVisible} />}
      />
      <CustomBottomSheet 
      isModalVisible={isModalTemanVisible}
      setModalVisible={setIsModalTemanVisible}
      title={`Tandai Kawan`}
      children={<SelectView isModalVisible={isModalTemanVisible} setIsModalVisible={setIsModalTemanVisible} jumlah={tagTeman.length} />}
      />
      <CustomBottomSheet children={<UbahPhotoModal />} 
        isModalVisible={isModalPhotoVisible} setModalVisible={setModalPhotoVisible} 
        title="Unggah foto laporan" />
      <HeaderWhite navigation={navigation} title="Ubah Laporan" />
      <ScrollView nestedScrollEnabled={true} style={{padding: 20}}>
      {
        photoKegiatan.length == 0 ? 
        <View style={styles.uploadSection}>
            <Pressable onPress={()=>setModalPhotoVisible(true)} style={styles.boxAddPhoto}><Ionicons name="add-circle-outline" color={Color.title}
            size={24} /></Pressable> 
            <View style={{padding: 20}}>
              <Text style={styles.textUploadFoto}>{`Upload foto ${typeLaporan.toLowerCase()}`}</Text>
              <View style={{height: 5}}></View>
              <Text style={styles.textPastikan}>Pastikan foto yang kamu kirimkan terlihat jelas</Text>
            </View>
        </View> :
        <View style={styles.moreUploadSection}>
          <ScrollView horizontal 
          showsHorizontalScrollIndicator={false} 
          decelerationRate='normal'
          style={styles.caraoselPhoto}>
            {photoKegiatan.map((item, index)=> {
              return(
                <View key={index}>
                  <Image source={{uri: `data:image/png;base64,${item}`}} style={styles.imageKegiatan}/>
                  <Pressable onPress={()=> handleRemovePhotoButton(index)} style={styles.removePhotoButton}>
                    <Ionicons style={{marginTop: -2, marginLeft: -1.5}} color={Color.grayTen} name="close-circle-outline" size={20}></Ionicons>
                  </Pressable>
                </View>
              )
            })}
          </ScrollView>
          {
            photoKegiatan.length <3?
            <Pressable onPress={()=>setModalPhotoVisible(true)}><Ionicons name="add-circle-outline" color={Color.title}
            size={24} /></Pressable> :
            <></>
          }
        </View>
      }
        <View style={{height: 30}}></View>
        <Text style={styles.textDetailLaporan}>Detail Laporan</Text>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Tahapan</Text>
        <DropDownButton onPress={()=>setIsModalVisible(true)} placeholder='Tahapan' text={capres} />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Judul Laporan</Text>
        <CustomInput value={judul} setValue={setJudul} placeholder="Judul Kegiatan" />
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>{`Deskripsi ${typeLaporan}`}</Text>
        <CustomInput value={deskripsi} setValue={setDeskripsi} placeholder="Deskripsi"
        width='100%' height={100} />
        <Text style={{...styles.textMasukanDeskripsi, color: isDeskripsi ? Color.secondaryText : Color.danger}}>
          {desc_required ? `Masukan deskripsi maksimal 350 karakter.` : `Masukan deskripsi maksimal 350 karakter. (Opsional)`}
        </Text>
        {typeLaporan != "Kendala" ? <><View style={{height: 5}}></View>
        <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, marginVertical: 5}}>{`Dokumen (opsional)`}</Text>
        <View style={{flexDirection: 'row', borderColor: !namaFile ? Color.lightBorder : Color.primaryMain, borderWidth: 1,
        borderRadius: 4, justifyContent: 'space-between'}}>
            <View style={{paddingHorizontal: 10, paddingVertical: 5, maxWidth: '70%'}}>
                <Text style={{ ...FontConfig.bodyFour, marginTop: 7,
                    color: !namaFile ? Color.disable : Color.blue
                }}>{!namaFile  ? `Belum ada file terpilih` : namaFile}</Text>
            </View>
            {!namaFile ? <CustomButton onPress={handlePilihDariFileDocument} marginVertical={0} text="Unggah" height={40} width='30%'  borderRadius={2} backgroundColor={Color.primaryMain}
                fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}} /> : 
                <Pressable onPress={handleHapusDocument} style={{marginVertical: 10, marginRight: 5}}><Ionicons name="trash-outline" color={Color.danger} size={22} /></Pressable>
            }
        </View>
          <View style={{height: 5}}></View>
          <Text style={{...FontConfig.bodyThree, color: Color.secondaryText}}>Hanya menerima format pdf dan ukuran file maksimal 10mb</Text></>: <></>}
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>Lokasi</Text>
        <DropDownButton onPress={handleLokasiButton} placeholder='Lokasi' text={lokasi} 
        childLeft={<Ionicons name="locate-outline" color={Color.secondaryText} size={16} style={{paddingRight: 5}} />} />
        <View style={{height: 10}}></View>
        {typeLaporan != "Kendala" ? <><Text style={{...FontConfig.bodyTwo, color:Color.secondaryText, paddingBottom: 10}}>{`Saran/Umpan Balik (opsional)`}</Text>
        <CustomInput value={saran} setValue={setSaran} placeholder="Tulis saran atau umpan balikmu disini..."
        width='100%' height={100} /></> : <></>}
        <View style={{height: 30}}></View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}>
        <CustomButton
            onPress={handleLanjutkan} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height={44} text="Simpan Perubahan"
            disabled={!isContinue}
            backgroundColor={Color.primaryMain}
            />
        </View>
      </View>
      <AwesomeAlert
          show={isLoading}
          showProgress={true}
          progressColor={Color.graySeven}
          message="Loading"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        />
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Laporan gagal dibuat"
          message={message}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Coba Lagi"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
      <AwesomeAlert
        show={showAlertPhotoMoreSize}
        showProgress={false}
        title="Ukuran file foto terlalu besar"
        message="Jumlah ukuran foto tidak boleh melebihi 10 Mb. Silakan upload foto kembali"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Mengerti"
        titleStyle={{...FontConfig.titleTwo, color: Color.title}}
        messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
        confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '40%', alignItems: 'center'}}
        confirmButtonTextStyle={{...FontConfig.buttonThree}}
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlertPhotoMoreSize(false);
        }}
      />
    </SafeAreaView>
  )
}

export default UbahLaporanScreen

const styles = StyleSheet.create({
  uploadSection: {
    flexDirection: 'row',
  },
  moreUploadSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
  buttonContinue: {
    borderRadius: 20, 
    width: '80%',
  },
  boxAddPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grayFour,
    padding: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.lightBorder
  },
  textUploadFoto: {
    ...FontConfig.titleThree,
    color: '#000000'
  },
  textPastikan: {
    ...FontConfig.captionOne,
    color: Color.neutralZeroSeven,
    width: '80%'
  },
  textDetailLaporan: {
    ...FontConfig.titleThree,
    color: '#000000'
  },
  textMasukanDeskripsi: {
    ...FontConfig.bodyThree,
    marginVertical: 5
  },
  caraoselPhoto: {

  },
  imageKegiatan: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 4
  },
  removePhotoButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 16,
    width: 17,
    height: 17,
    right: 3,
    top: 0
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
})