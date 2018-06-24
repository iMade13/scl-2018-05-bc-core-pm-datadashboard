



Promise.all([ // Ejecuta todas las llamadas de manera paralela
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')

]).then((responses)=>{ // Responde a todas las promesas
  return Promise.all(responses.map((response => response.json()))); // crea un nuevo array

}).then((responseJsons)=>{ // Arreglo de respuestas en json
  const users = responseJsons[0];
  const progress = responseJsons[1];
  const cohorts = responseJsons[2];

  console.log(users);
  console.log(progress);
  console.log(cohorts);

  users.forEach(element => { // muestra la data de users en la consola del navegador
    console.log(element.name);
    console.log(element.role);
    console.log(element.id);
    console.log(element.timezone);

    progress.forEach(progressElement => { // muestra la data de progress en la consola del navegador
        console.log(progressElement.intro);
        console.log(progressElement.totalDuration);

  })
  
  .then(function(data) { //esta funcion intenta mostrar parte de la data en html
    let html = '';
    data.forEach(function(users) {
      html += 
      `<tr>
      <th scope="row">${users.name}</th>
      <td>${users.role}</td>
      <td>${users.timezone}</td>
      <td>${users.id}</td>
      </tr>`;   
      console.log(data);
    });
    document.getElementById('resultado').innerHTML = html;
  })

// hacer for o forEach para seleccionar un id o name, lo que sea...
 
        
  //
  // Código que ocupa los jsons...
  //
}).catch(
  (error)=>{ // Al menos una llamada falló
  }
);})

