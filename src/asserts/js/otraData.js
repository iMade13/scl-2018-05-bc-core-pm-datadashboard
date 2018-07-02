let users;
let progress;
let cohorts ;

let percentGral;

let exercises;
let exercisesCompleted;
let exercisesPercent;

let quiz;
let quizCompleted;
let quizPercent;

let reads;
let readsCompleted;
let readsPercent;

// archivo para experimentar con js
Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')
]).then((responses) => { // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json())));
}).then((data) => { // Arreglo de respuestas en json.
  users = data[0];
  progress = Object.values(data[1]);
  cohorts = Object.entries(data[2]);

  console.log(cohorts);
  console.log(progress);
  console.log(users);

}).catch(
  () => {
    console.log('fallo fetch');
  }
);

window.computeUsersStats (users, progress, courses); {

  let User = []; 

  for (let i = 0; i < users.length; i++){

    let idUser = users[i].id;

  }
}



