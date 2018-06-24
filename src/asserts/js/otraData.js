Promise.all([ // Ejecuta todas las llamadas de manera paralela
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')

]).then((responses)=>{ // Responde a todas las promesas
  return Promise.all(responses.map((response => response.json()))); // crea un nuevo array
}).then((responseJsons)=>{ // Arreglo de respuestas en json
  const users = responseJsons[0];
  const cohorts = responseJsons[1];
  const progress = responseJsons[2];

 /* console.log(users);
  console.log(progress);
  console.log(cohorts);*/

  users.forEach(element => { // muestra la data de users en la consola del navegador
    console.log(element.name);
    console.log(element.role);
    console.log(element.id);
    console.log(element.timezone);

    cohorts.forEach(element2 => { // muestra la data de users en la consola del navegador
        console.log(element2.id);
        console.log(element2.start);
        console.log(element2.coursesIndex);
        console.log(element2.end);
  })



console.log(result);
}).catch(
  (error)=>{ // Al menos una llamada falló
  }
);
})

