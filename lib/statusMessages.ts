import {FetchStatuses} from '@/types/types';
const statusMessages = {
  // Schools
  fetchingSchools: 'Incarcarea scolilor...',
  schoolsFetched: 'Scolile au fost incarcate cu succes',
  errorFetchingSchools: 'Eroare la incarcarea scolilor',
  creatingSchool: 'Crearea scolii...',
  schoolCreated: 'Scoala a fost creata cu succes',
  errorCreatingSchool: 'Eroare la crearea scolii',
  errorDeletingSchool: 'Eroare la stergerea scolii',
  deletingSchool: 'Stergerea scolii...',
  schoolDeleted: 'Scoala a fost stearsa cu succes',


  // Classes
  fetchingClasses: 'Incarcarea claselor...',
  classesFetched: 'Clasele au fost incarcate cu succes',
  errorFetchingClasses: 'Eroare la incarcarea claselor',
  creatingClass: 'Crearea clasei...',
  classCreated: 'Clasa a fost creata cu succes',
  errorCreatingClass: 'Eroare la crearea clasei',
  errorDeletingClass: 'Eroare la stergerea clasei',
  deletingClass: 'Stergerea clasei...',
  classDeleted: 'Clasa a fost stearsa cu succes',

  // Years
  fetchingYears: 'Incarcarea anilor...',
  yearsFetched: 'Anii au fost incarcati cu succes',
  errorFetchingYears: 'Eroare la incarcarea anilor',
  creatingYear: 'Crearea anului...',
  yearCreated: 'Anul a fost creat cu succes',
  errorCreatingYear: 'Eroare la crearea anului',
  errorDeletingYear: 'Eroare la stergerea anului',
  deletingYear: 'Stergerea anului...',
  yearDeleted: 'Anul a fost stearsa cu succes',

  // Students
  fetchingStudents: 'Incarcarc elevii...',
  studentsFetched: 'Elevii au fost incarcati cu succes',
  errorFetchingStudents: 'Eroare la incarcarea elevilor',
  creatingStudent: 'Crearea studentului...',
  studentCreated: 'Elevul a fost creat cu succes',
  errorCreatingStudent: 'Eroare la crearea elevului',
  errorDeletingStudent: 'Eroare la stergerea elevului',
  deletingStudent: 'Stergerea elevului...',
  studentDeleted: 'Elevul a fost stears cu succes',

  // Disciplines
  fetchingDisciplines: 'Incarcarea disciplinelor...',
  disciplinesFetched: 'Disciplinele au fost incarcate cu succes',
  errorFetchingDisciplines: 'Eroare la incarcarea disciplinelor',
  creatingDiscipline: 'Crearea disciplinei...',
  disciplineCreated: 'Disciplina a fost creata cu succes',
  errorCreatingDiscipline: 'Eroare la crearea disciplinei',
  errorDeletingDiscipline: 'Eroare la stergerea disciplinei',
  deletingDiscipline: 'Stergerea disciplinei...',

  // Tests
  fetchingTests: 'Incarcarea testelor...',
  testsFetched: 'Testele au fost incarcate cu succes',
  errorFetchingTests: 'Eroare la incarcarea testelor',
  creatingTest: 'Crearea testului...',
  testCreated: 'Testul a fost creat cu succes',
  errorCreatingTest: 'Eroare la crearea testului',
  errorDeletingTest: 'Eroare la stergerea testului',
  deletingTest: 'Stergerea testului...',
  testDeleted: 'Testul a fost sters cu succes',

  // Intervals
  fetchingIntervals: 'Incarcarea intervalelor...',
  intervalsFetched: 'Intervalele au fost incarcate cu succes',
  errorFetchingIntervals: 'Eroare la incarcarea intervalelor',
  creatingInterval: 'Crearea intervalului...',
  intervalCreated: 'Intervalul a fost creat cu succes',
  errorCreatingInterval: 'Eroare la crearea intervalului',
  errorDeletingInterval: "Eroare la stergerea intervalului",
  deletingInterval: 'Stergerea intervalului...',
  intervalDeleted: 'Intervalul a fost sters cu succes',


  // Records
  fetchingRecords: 'Incarcarea notelor...',
  recordsFetched: 'Notele au fost incarcate cu succes',
  errorFetchingRecords: 'Eroare la incarcarea notelor',
  creatingRecord: 'Crearea notei...',
  recordCreated: 'Nota a fost creata cu succes',
  errorCreatingRecord: 'Eroare la crearea notei',
  errorDeletingRecord: 'Eroare la stergerea notei',
  deletingRecord: 'Stergerea notei...',
  recordDeleted: 'Nota a fost stearsa cu succes',

  // Documents
  errorFetchingDocuments: "Eroare la incarcarea documentelor",
  documentCreated: "Documentul a fost creat",
  errorCreatingDocument: "Eroare la crearea documentului",
  errorDeletingDocument: "Eroare la stergerea documentului",

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
