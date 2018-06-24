Promise.all([ // Ejecuta todas las llamadas de manera paralela
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')

]).then((responses)=>{ // Responde a todas las promesas
  return Promise.all(responses.map((response => response.json()))); // crea un nuevo array

}).then((responseJsons)=>{ // Arreglo de respuestas en json
  const users = responseJsons[0];


  console.log(users);


  users.forEach(element => { // muestra la data de users en la consola del navegador
    console.log(element.name);
    console.log(element.role);
    console.log(element.id);
    console.log(element.timezone);

  })

  }).then((responseJsons2)=>{ // Arreglo de respuestas en json

  const progress = responseJsons2[1];



  console.log(progress);


  progress.forEach(element2 => { // muestra la data de users en la consola del navegador
    console.log(element2.intro)

  })

}).catch(
  (error)=>{ // Al menos una llamada falló
  }
);




