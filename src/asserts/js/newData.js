let users;
let progress;
let cohorts;

let userId ={};
let userName = 0;
let userPercent = 0; 
let userProgress = 0; // tratando de entrar al objeto para sacar % de lecturas y demases

// archivo para experimentar con js
Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')
]).then((responses) => { // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json()))); // traduce el "el texto plano" en JSON
}).then((data) => { // Arreglo de respuestas en json.
  users = Object.values(data[0]);
  progress = Object.values(data[1]);
  cohorts = Object.keys(data[2]);
}).catch(
  () => {
    console.log('fallo fetch');
  }
);

function computeUsersStats() {
  for (i = 0; i < users.length; i++) { // recorrido que reconoce los id
    userId = users[i].id; // obtiene id
    userName = users[i].name; // obtiene nombre
    userCourse=progress[i];
    if (JSON.stringify(userCourse)==='{}') {
     continue
  }
    userPercent = progress[i].intro.percent;
    userProgress = Object.entries(progress[i].intro.units); // tratar de ver como saco la otra data u_u
    userReads=Object.entries(userProgress);
    
    //let tratardenomostrarobjets = JSON.stringify(userProgress); // challa
    
    console.log('id: ' + userId);
    console.log('nombre: ' + userName);
    console.log('porcentaje: ' + userPercent);
    console.log('cursos: ' + userProgress);
    console.log(userReads)

    console.log ('--------------------------------------')
    
    console.log(userCourse)
    
    console.log('---------------------------------------'); // me ayuda a visualizar en consola :)
  };
}


