import wretch from 'wretch';

export const getUser = () => {
  return wretch('https://jsonplaceholder.typicode.com/posts')
  .get()
  .notFound(error => { console.log(error)})
  .unauthorized(error => { console.log(error)})
  .error(418, error => { console.log(error) })
  .json(data => console.log(data))
}

