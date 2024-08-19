import axios from "axios";
import { BASE_URL_CSR_API } from "../utils/environment";

const TestRequest = axios.create({ baseURL: 'https://dog.ceo/' });

export default TestRequest