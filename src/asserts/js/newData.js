let users;
let progress;
let cohorts ;

let userId= 0;
let userName=0;
let userProgress =0;
let userPercent= {}; // aqui no sé que onda, help!
let userExercises=0;
let quiz;
let userData=0;
let userData2=0;

// archivo para experimentar con js
Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')
]).then((responses) => { // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json())));
}).then((data) => { // Arreglo de respuestas en json.
  users = Object.values(data[0]);
  progress = Object.values(data[1]);
  cohorts = Object.keys(data[2]);

  console.log(cohorts);
  console.log(progress);
  console.log(users);

  }).catch(
    () => {
      console.log('fallo fetch');
    }
  );

function computeUsersStats() {



  for (i = 0; i < users.length; i++) { // recorrido que reconoce los id
    userId = users[i].id;
    userName = users[i].name;
    userProgress =Object.entries(progress[i].intro.units);
    userData0= Object.entries(userProgress[0]);
    userData1= Object.entries(userProgress[1]);
    userData2= Object.entries(userProgress[2]);

    userData3=Object.values(userData0[1]);
    userData4=Object.entries(userData3);

    userPercent = progress[i].intro.percent;
    

   


    console.log("nombre: "  + userName)
    console.log("porcentaje: "+userPercent)
    console.log("cursos: "+userProgress)
    console.log("asd " + userData4);
   
   
  
    

    console.log("---------------------------------------")

    
    document.write(userName+'.....')
    document.write(userPercent+'.....')


   

    
   

  };

  
 

  }


