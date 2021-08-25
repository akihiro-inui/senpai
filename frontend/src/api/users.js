const apiUrl = 'http://localhost:5000/api/'


function createUser(requestBody) {
  fetch(apiUrl+'v1/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(res => res.json())
    .then(res => console.log(res));
}

export {createUser}