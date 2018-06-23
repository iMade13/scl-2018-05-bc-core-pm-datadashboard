 /*document.getElementById('jsonBtn').addEventListener('click', cargarJSON);

function cargarJSON() {
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then((usersResponse) => {// es una función
      return usersResponse.json(); // hace la conexión y lo definimos como queremos que nos devuelvan los datos
    })
    .then(function(data) { // otra función
      let html = '';
      data.forEach(function(users) {
        html += 
        `
        <tr>
        <th scope="row">${users.name}</th>
        <td>${users.signupCohort}</td>
        <td>${users.timezone}</td>
        <td>${users.id}</td>
        </tr>`


        ;
        console.log(data);
      });
      document.getElementById('resultado').innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
};
*/

Promise.all([ // Ejecuta todas las llamadas de manera paralela
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')
]).then((responses)=>{ // Responde a todas las promesas
  return Promise.all(responses.map((response => response.json())));

}).then((responseJsons)=>{ // Arreglo de respuestas en json
  const users = responseJsons[0];
  const progress = responseJsons[1];
  const cohorts = responseJsons[2];
  console.log(users);
  console.log(progress);
  console.log(cohorts);
  users.forEach(element => {
    console.log(element.name);
    console.log(element.role);
    console.log(element.id);


  

  })
  
  
  progress.forEach(element2 => {
    console.log(element2.intro);
    console.log(element2.role);
    console.log(element2.id);


  

  });


// hacer for o forEach para seleccionar un id o name, lo que sea...
 
        
  //
  // Código que ocupa los jsons...
  //
}).catch(
  (error)=>{ // Al menos una llamada falló
  }
);

