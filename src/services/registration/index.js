import Request from '../Request'

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


getAllPekerjaan = () => {
    return Request.get("api-aplikasi-relawan/v1/user/daftar-pekerjaan", {headers: headers});
}

getInterest = async ()=> {
    return Request.get(`api-aplikasi-relawan/v1/user/interest`, {headers: headers});
}

getAllProvinsi = () => {
    return Request.get("api-aplikasi-relawan/v1/daerah/provinsi", {headers: headers});
}

getAllKota = (idProvinsi) => {
    return Request.get(`api-aplikasi-relawan/v1/daerah/kabkot/${idProvinsi}`, {headers: headers});
}

getAllKecamatan = (idKota) => {
    return Request.get(`api-aplikasi-relawan/v1/daerah/kecamatan/${idKota}`, {headers: headers});
}

getAllKelurahan = (idKecamatan) => {
    return Request.get(`api-aplikasi-relawan/v1/daerah/kelurahan/${idKecamatan}`, {headers: headers});
}

getIdOrganisasi = (data) => {
    return Request.post("api-aplikasi-relawan/v1/organisasi/kode-referal", data, {headers});
}

getOrganisasiByProvinsi = (data) => {
    return Request.post("api-aplikasi-relawan/v1/organisasi/get-all-by-provinsi", data, {headers});
}

getDataOrganisasi = (idOrganisasi) => {
    return Request.post(`api-aplikasi-relawan/v1/organisasi/details/${idOrganisasi}`, {headers});
}

getOtp = (data) => {
    return Request.post("api-aplikasi-relawan/v1/user/generate-otp", data, {headers: headers});
}

registration = (data) => {
      console.log(data);
    return Request.post("api-aplikasi-relawan/v1/user/registrasi", data, {timeout: 8000,});
}

verifyOtp = (data) => {
    return Request.post("api-aplikasi-relawan/v1/user/verifikasi-otp", data, {headers: headers, timeout: 8000,});
}

checkUsername = (data) => {
    return Request.post("api-aplikasi-relawan/v1/user/cek-username", data, {headers: headers});
}

checkPhone = (data) => {
    return Request.post("api-aplikasi-relawan/v1/user/cek-no-hp", data, {headers: headers});
}

const RegistrationService = {
    getAllPekerjaan,
    getAllProvinsi,
    getAllKota,
    getAllKecamatan,
    getAllKelurahan,
    getOtp,
    getIdOrganisasi,
    getDataOrganisasi,
    getOrganisasiByProvinsi,
    registration,
    verifyOtp,
    checkUsername,
    checkPhone,
    getInterest
  };
  
  export default RegistrationService;
