import { Request } from "..";
import { prefixApp } from "../../utils/environment";
import TestRequest from "../TestRequest";

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


login = (data) => {
    return Request.post(`${prefixApp}user/login`, data, {headers: headers});
}

forgetPassword = (data) => {
    return Request.post(`${prefixApp}user/lupa-password`, data, {headers: headers});
}

appVersion = (version) => {
    return Request.get(`${prefixApp}app-version?app_version=${version}`, {headers: headers});
}

pendukung = () => {
    return Request.get(`${prefixApp}pendukung`, {headers: headers});
}

testAja = () => {
    return TestRequest.get(`api/breeds/image/random`, {headers: headers});
}


const LoginServices = {
    login,
    forgetPassword,
    appVersion,
    pendukung,
    testAja
  };
  
  export default LoginServices;
