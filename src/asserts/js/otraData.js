// archivo para experimentar con js
Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')
]).then((responses)=>{ // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json())));
}).then((data)=>{ // Arreglo de respuestas en json.
  
  let users = data[0];
  let progress = Object.values(data[1]);
  let cohorts = Object.entries(data[2]);

  console.log(cohorts)
  console.log(progress)
  console.log(users)





}).catch(
  (error)=>{ // Al menos una llamada falló.
    console.log('fallo fetch');
  }
);
