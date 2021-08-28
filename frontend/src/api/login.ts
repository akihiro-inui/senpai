const apiUrl = 'http://localhost:5000/api/'
const originUrl = 'http://localhost:3000'

interface UserLogin { 
  email: string;
  password: string;
 }


async function loginUser(userToLogin: UserLogin) {
  const response = await fetch(apiUrl+'v1/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': originUrl
      },
      body: JSON.stringify(userToLogin),
    })
    return response.json()
  }

export {loginUser}