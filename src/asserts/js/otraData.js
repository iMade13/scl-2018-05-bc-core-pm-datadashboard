let users;
let progress;
let cohorts;

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
  progress = data[1];
  cohorts = data[2];
  let result = computeUsersStats(users, cohorts, progress);
  //console.log(result);
}).catch(
  (err) => {
    console.log('fallo fetch', err);
  }
);

function computeUsersStats(users, cohorts, progress) {
  let result = [];
  for (user of users) { // toma la lista users y haz lo que está dentro del for a cada elemento de users (user)
    try { // es como un catch
      user.cohort = getCohorts(user.signupCohort, cohorts); // funcion busqueda de cohorts
      user.prog = getProgress(user.id, progress);// busqueda de progress
      if (user.cohort && user.prog) { // cuando tenemos ambos valores creamos los stats
        user.stats = {
          'percent': user.prog.intro.percent, // Número entero entre 0 y 100 que indica el porcentaje de completitud general del usuario con respecto a todos los cursos asignados a su cohort.
          'exercises': {// Objeto con tres propiedades:
            'total': 0, // Número total de ejercicios autocorregidos presentes en cursos del cohort.
            'completed': 0, // Número de ejercicios autocorregidos completados por el usuario.
            'percent': 0
          }, // Porcentaje de ejercicios autocorregidos completados.
          'reads': {
            'total': 0, // Número total de lecturas presentes en cursos del cohort.
            'completed': 0, // Número de lecturas completadas por el usuario.
            'percent': 0, // Porcentaje de lecturas completadas.
          }, // Objeto con tres propiedades:
          'quizzes': {
            'total': 0, // Número total de lecturas presentes en cursos del cohort.
            'completed': 0, // Número de lecturas completadas por el usuario.
            'percent': 0, // Porcentaje de lecturas completadas.}//Objeto con cinco propiedades:
          },
          'scoreSum': 0, // Suma de todas las puntuaciones (score) de los quizzes completados.
          'scoreAvg': 0, // Promedio de puntuaciones en quizzes completados.
        };// ahora debemos llenar los stats del user y para eso tenemos cohort y el progress del user
        for (unit in user.prog.intro.units) {
          let calcUnit = user.prog.intro.units[unit];
  
          let parts = calcUnit.parts; // lista de unidades dentro del unit
          let partsKeys = Object.keys(parts); // se convierte a arreglo para obtener data (porque era un objeto)
          for (u of partsKeys) {
          // iterar por cada variable para obtener data
            // console.log(parts[u]);

            switch (parts[u].type) {
            case 'read': 
              user.stats.reads.total++;
              if (user.stats.reads.completed === 1) {
                user.stats.reads.completed++;
              }
              break;
            case 'quiz': 
              user.stats.quizzes.total++;
              if (user.stats.quizzes.completed === 1) {
                user.stats.quizzes.completed++;
              }
              break;
            case 'practice':
              user.stats.exercises.total++;
              if (user.stats.exercises.completed === 1) {
                user.stats.exercises.completed++;
              }
              break;
            }
          }
        }

        //calcular porcentaje con total y completado.
      } else {
        user.stats = {};
      }
      result.push(user);// guarda user en la lista de arriba (result)
    } catch (e) {
      console.log('error en user:', user);
      console.log(e);
    }
  }
  return result;
}
function getCohorts(id, cohorts) {
  for (c of cohorts) {
    if (c.id === id) {
      return c;
    }
  }
  return null;
}

function getProgress(id, progress) {
  if (progress[id]) {
    return progress[id];
  }
  return null;
}
