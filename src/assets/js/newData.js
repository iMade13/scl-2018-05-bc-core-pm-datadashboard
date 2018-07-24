let users;
let progress;
let cohorts; //  todavía no uso cohorts, ya lo activaré más adelante

let students = [];


let userId = {}; // se declara así porque hay usuarios vacios
let userName = 0;
let userPercent = 0;
let userProgress = 0; // variable que entra a la propiedad intro para sacar % de lecturas y demases

Promise.all([ // Ejecuta todas las llamadas de manera paralela.
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  fetch('../data/cohorts.json')
]).then((responses) => { // Responde a todas las promesas.
  return Promise.all(responses.map((response => response.json()))); // traduce el "el texto plano" en JSON
}).then((data) => { // Arreglo de respuestas en json.
  users = Object.values(data[0]); // se usa values porque id y name son values, si pongo keys sale undefined
  progress = Object.values(data[1]); // se usa values porque la propiedad intro está dentro del key ID
  cohorts = Object.keys(data[2]);
}).catch(
  () => {
    console.log('fallo fetch');
  }
);


// FUNCION 1
function computeUsersStats() {

  let contador = 0; // usé este contador porque tenia problemas con los recorridos, me sirve para controlar la cantidad de bucles

  for (i = 0; i < users.length; i++) { // recorrido que reconoce los id dentro de users
    userId = users[i].id; // obtiene id
    userName = users[i].name; // obtiene nombre
    userError = progress[i]; // para saltarse estudiantes con {} vacio
    if (JSON.stringify(userError) === '{}') { // convierte el json en texto plano
      continue;
    } // fin para saltarse {} vacio, el userError no se muestra en la data, equivale a las estudiantes que solo se registraron, pero no entraron al lms

    userPercent = progress[i].intro.percent; // obtiene porcentaje total, sin objets.values porque llega hasta ahi no más
    userProgress = Object.values(progress[i].intro.units); // aqui entro al objeto units, aplico object values porque tiene que hacer recorrido al interior de intro

    // js no puede leer el 01-nombre unidad, asi que uso foreach para entrar o al progress le pongo  Object.values(progress[i].intro.units.nombreUnidad
    let readsCompleted = 0;
    let quizzCompleted = 0;
    let practiceCompleted = 0;
    let practiceTotal=0;
    let quizzTotal=3;
    let readsTotal=11;
    let percentReads=0;

    userProgress.forEach(course => { // course equivale a la propiedad 01-nombre curso, no puedo entrar de otra forma
      Object.values(course.parts).forEach(parts => { // dentro de course está la propiedad parts
        switch (parts.type) { // dentro de parts está type
        case 'read': // si type equivale a read
        if (course.type === 'read') {
            readsTotal += 1;
            }
          if (parts.completed === 1) { // busca si el valor de completed es = 1 (equivale a leido)
            readsCompleted++; // suma 1 por cada read encontrado
          }
          percentReads=0;
        };
      });
    });

    userProgress.forEach(coursequizz => { // idem al anterior
      Object.values(coursequizz.parts).forEach(parts => {
        switch (parts.type) {
        case 'quiz':
        //  if (coursequizz.type === 'quiz') {
        //    quizzTotal+=1;
           
        //    }
          if (parts.completed === 1) {
            quizzCompleted++;
         
          }
        };
      });
    });

    // para sacar promedios de score de quiz
    let scoreSum = 0;
    let scoreAvg = 0;
    
   
    userProgress.forEach(quizzscore => {
      Object.values(quizzscore.parts).forEach(parts => {
        if (parts.score) {
          scoreSum = scoreSum + parts.score; // scoresum parte en 0, a medida que hace el bucle, agrega el valor de parts.score
          scoreAvg = Math.round(scoreSum / 3); // math.round para eliminar decimales
        }
      });
    });

    userProgress.forEach(coursepractice => { // idem a reads
        
      Object.values(coursepractice.parts).forEach(parts => {
        switch (parts.type) {
        case 'practice':
          if (parts.type === 'practice') {
            practiceTotal += 1;
          }
          if (parts.completed === 1) {
            practiceCompleted++;
          }
          //console.log(coursepractice); 
        };
      });
    });

    users[i] = {
        ...users[i],  /// siempre sale error de codigo aqui
        stats: {
          percent: userPercent,
          exercises: {
            total: practiceTotal,
            completed: practiceCompleted,
            percent: Math.round((practiceCompleted/practiceTotal)*100),
          },
  
          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: Math.round((readsCompleted/readsTotal)*100),
          },
  
          quizzes: {
            total: quizzTotal,
            completed: quizzCompleted,
            percent: Math.round((quizzCompleted/quizzTotal)*100),
            scoreSum: scoreSum,
            scoreAvg: scoreAvg,
          },
        }
  
      };

    // para visualizar en consola

    // console.log(contador + ' // id: ' + userId);
    // console.log('nombre: ' + userName);
    // console.log('Lecturas Completadas: ' + readsCompleted + '/11');
    // console.log('Ejecicios Completados: ' + practiceCompleted + '/2');
    // console.log('Quizzes Completados: ' + quizCompleted + '/3');
    // console.log('Promedio Quizes: ' + scoreAvg + '%');
    // console.log('Completitud: ' + userPercent + '%');
    // console.log('---------------------------------------');
  }
   console.log(users);
}


// FUNCION 2
// window.sortUsers = (users, orderBy, orderDirection) => {

// }

function filterUsers(filtro) {
   filtro = users.filter(element => {
    filtro1= element.name;
  });

    console.log(filtro1)
  };
