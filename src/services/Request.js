import axios from "axios";
import { BASE_URL_API } from "../utils/environment";

const Request = axios.create({ baseURL: BASE_URL_API });

export default Request;
