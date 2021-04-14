import wretch from 'wretch';
import { User } from '../components/interfaces/User';
import { sendGetRequest } from './http.service';
import { isUser } from './type-guards/user';

export const getUser = () => {
  return wretch('https://jsonplaceholder.typicode.com/posts')
  .get()
  .notFound(error => { console.log(error)})
  .unauthorized(error => { console.log(error)})
  .error(418, error => { console.log(error) })
  .json(data => console.log(data))
}

export const test = async () => {
    //const data = await sendGetRequest<User>('user/1', isUser);

}

