const apiUrl = 'http://localhost:5000/api/'
const originUrl = 'http://localhost:3000'

interface UserCreate { 
  name: string;
  email: string;
  password: string;
 }

function createUser(userToCreate: UserCreate) {
  fetch(apiUrl+'v1/user', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': originUrl
    },
    body: JSON.stringify(userToCreate),
  })
    .then(res => res.json())
    .then(res => console.log(res));
}

export {createUser}
