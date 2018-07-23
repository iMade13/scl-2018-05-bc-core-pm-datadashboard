document.getElementById('jsonBtn').addEventListener('click', cargarJSON);

function cargarJSON() {
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then((usersResponse) => {// es una función
      return usersResponse.json(); // hace la conexión y lo definimos como queremos que nos devuelvan los datos
    })
    .then(function(data) { // otra función
      let html = '';
      data.forEach(function(users) {
        html += 
        `<tr>
        <th scope="row">${users.name}</th>
        <td>${users.signupCohort}</td>
        <td>${users.timezone}</td>
        <td>${users.id}</td>
        </tr>`;   
        console.log(data);
      });
      document.getElementById('resultado').innerHTML = html;
    });
}

