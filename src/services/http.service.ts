import { baseUrl } from "../shared/consts";
import wretch from 'wretch';
import { getToken } from "./auth.service";

export const sendGetRequest = async <T>(path:string)=> {
  return await wretch(baseUrl + '/' + path)
  .auth(`Bearer ${ getToken() }`)
  .get()
  .notFound(error => { console.log(error)})
  .unauthorized(error => { console.log(error)})
  .error(418, error => { console.log(error) })
    .json(data => {
      return (data as T);
    })
};