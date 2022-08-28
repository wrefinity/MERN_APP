import axios from "axios";
const BASE_URL = "";
const Axioss = axios.create({
  baseURL: BASE_URL,
});
export default Axioss;
