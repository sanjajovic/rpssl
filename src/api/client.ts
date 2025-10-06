import axios from "axios";
import { environment } from "../environments/environment";

export const client = axios.create({
  baseURL: environment.baseUrl
});