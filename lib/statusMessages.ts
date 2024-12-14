import {FetchStatuses} from '@/types/types';
const statusMessages = {
  // Schools
  fetchingSchools: 'Incarcarea scolilor...',
  schoolsFetched: 'Scolile au fost incarcate cu succes',
  errorFetchingSchools: 'Eroare la incarcarea scolilor',
  creatingSchool: 'Crearea scolii...',
  schoolCreated: 'Scoala a fost creata cu succes',
  errorCreatingSchool: 'Eroare la crearea scolii',

  // Classes
  fetchingClasses: 'Incarcarea claselor...',
  classesFetched: 'Clasele au fost incarcate cu succes',
  errorFetchingClasses: 'Eroare la incarcarea claselor',
  creatingClass: 'Crearea clasei...',
  classCreated: 'Clasa a fost creata cu succes',
  errorCreatingClass: 'Eroare la crearea clasei',
  // Years
  fetchingYears: 'Incarcarea anilor...',
  yearsFetched: 'Anii au fost incarcati cu succes',
  errorFetchingYears: 'Eroare la incarcarea anilor',
  creatingYear: 'Crearea anului...',
  yearCreated: 'Anul a fost creat cu succes',
  errorCreatingYear: 'Eroare la crearea anului',

  // Students
  fetchingStudents: 'Incarcarea studentilor...',
  studentsFetched: 'Studentii au fost incarcati cu succes',
  errorFetchingStudents: 'Eroare la incarcarea studentilor',
  creatingStudent: 'Crearea studentului...',
  studentCreated: 'Studentul a fost creat cu succes',
  errorCreatingStudent: 'Eroare la crearea studentului',

  // Disciplines
  fetchingDisciplines: 'Incarcarea disciplinelor...',
  disciplinesFetched: 'Disciplinele au fost incarcate cu succes',
  errorFetchingDisciplines: 'Eroare la incarcarea disciplinelor',
  creatingDiscipline: 'Crearea disciplinei...',
  disciplineCreated: 'Disciplina a fost creata cu succes',
  errorCreatingDiscipline: 'Eroare la crearea disciplinei',

  // Tests
  fetchingTests: 'Incarcarea testelor...',
  testsFetched: 'Testele au fost incarcate cu succes',
  errorFetchingTests: 'Eroare la incarcarea testelor',
  creatingTest: 'Crearea testului...',
  testCreated: 'Testul a fost creat cu succes',
  errorCreatingTest: 'Eroare la crearea testului',

  // Intervals
  fetchingIntervals: 'Incarcarea intervalelor...',
  intervalsFetched: 'Intervalele au fost incarcate cu succes',
  errorFetchingIntervals: 'Eroare la incarcarea intervalelor',
  creatingInterval: 'Crearea intervalului...',
  intervalCreated: 'Intervalul a fost creat cu succes',
  errorCreatingInterval: 'Eroare la crearea intervalului',

  // Records
  fetchingRecords: 'Incarcarea notelor...',
  recordsFetched: 'Notele au fost incarcate cu succes',
  errorFetchingRecords: 'Eroare la incarcarea notelor',
  creatingRecord: 'Crearea notei...',
  recordCreated: 'Nota a fost creata cu succes',
  errorCreatingRecord: 'Eroare la crearea notei',

  // Common
  loading: 'Incarcare...',
  success: 'Operatiunea a fost realizata cu succes',
  error: 'A aparut o eroare',
};


export const fetchStatuses: Record<FetchStatuses, FetchStatuses> = {
  default: 'default',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export default statusMessages;
