import { baseUrl } from "../shared/consts";
import wretch from 'wretch';

export const sendGetRequest = async (path:string, token:string) => {
let resObj;
return await wretch (baseUrl + '/' + path)
.auth(`Bearer ${ token }`)
.get()
.notFound(error => { return(error)})
.unauthorized(error => { return(error)})
.error(418, error => { return(error) })
.json(data => {resObj=data; return(resObj)})
};

