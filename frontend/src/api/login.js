const apiUrl = 'http://localhost:5000/api/'


async function loginUser(requestBody) {
  const response = await fetch(apiUrl+'v1/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    return response.json()
  }

export {loginUser}