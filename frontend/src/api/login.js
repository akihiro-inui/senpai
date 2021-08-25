const apiUrl = 'http://localhost:5000/api/'


function loginUser(requestBody) {
    fetch(apiUrl+'v1/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  
export {loginUser}