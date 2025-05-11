import {FetchStatuses} from '@/types/types';
const statusMessages = {
  //Auth
  errorSigningOut: 'Eroare la deconectare',

  // Schools
  fetchingSchools: 'Încărcarea școlilor...',
  schoolsFetched: 'Școlile au fost încărcate cu succes',
  errorFetchingSchools: 'Eroare la încărcarea școlilor',
  creatingSchool: 'Crearea școlii...',
  schoolCreated: 'Școala a fost creată cu succes',
  errorCreatingSchool: 'Eroare la crearea școlii',
  errorDeletingSchool: 'Eroare la ștergerea școlii',
  deletingSchool: 'Ștergerea școlii...',
  schoolDeleted: 'Școala a fost ștearsă cu succes',

  // Classes
  fetchingClasses: 'Încărcarea claselor...',
  classesFetched: 'Clasele au fost încărcate cu succes',
  errorFetchingClasses: 'Eroare la încărcarea claselor',
  creatingClass: 'Crearea clasei...',
  classCreated: 'Clasa a fost creată cu succes',
  errorCreatingClass: 'Eroare la crearea clasei',
  errorDeletingClass: 'Eroare la ștergerea clasei',
  deletingClass: 'Ștergerea clasei...',
  classDeleted: 'Clasa a fost ștearsă cu succes',

  // Years
  fetchingYears: 'Încărcarea anilor...',
  yearsFetched: 'Anii au fost încărcați cu succes',
  errorFetchingYears: 'Eroare la încărcarea anilor',
  creatingYear: 'Crearea anului...',
  yearCreated: 'Anul a fost creat cu succes',
  errorCreatingYear: 'Eroare la crearea anului',
  errorDeletingYear: 'Eroare la ștergerea anului',
  deletingYear: 'Ștergerea anului...',
  yearDeleted: 'Anul a fost șters cu succes',

  // Students
  fetchingStudents: 'Încărcarea elevilor...',
  studentsFetched: 'Elevii au fost încărcați cu succes',
  errorFetchingStudents: 'Eroare la încărcarea elevilor',
  creatingStudent: 'Crearea elevului...',
  studentCreated: 'Elevul a fost creat cu succes',
  errorCreatingStudent: 'Eroare la crearea elevului',
  errorDeletingStudent: 'Eroare la ștergerea elevului',
  deletingStudent: 'Ștergerea elevului...',
  studentDeleted: 'Elevul a fost șters cu succes',
  updatingStudent: 'Actualizarea elevului...',
  studentUpdated: 'Elevul a fost actualizat cu succes',
  errorUpdatingStudent: 'Eroare la actualizarea elevului',

  // Disciplines
  fetchingDisciplines: 'Încărcarea disciplinelor...',
  disciplinesFetched: 'Disciplinele au fost încărcate cu succes',
  errorFetchingDisciplines: 'Eroare la încărcarea disciplinelor',
  creatingDiscipline: 'Crearea disciplinei...',
  disciplineCreated: 'Disciplina a fost creată cu succes',
  errorCreatingDiscipline: 'Eroare la crearea disciplinei',
  errorDeletingDiscipline: 'Eroare la ștergerea disciplinei',
  deletingDiscipline: 'Ștergerea disciplinei...',

  // Tests
  fetchingTests: 'Încărcarea testelor...',
  testsFetched: 'Testele au fost încărcate cu succes',
  errorFetchingTests: 'Eroare la încărcarea testelor',
  creatingTest: 'Crearea testului...',
  testCreated: 'Testul a fost creat cu succes',
  errorCreatingTest: 'Eroare la crearea testului',
  errorDeletingTest: 'Eroare la ștergerea testului',
  deletingTest: 'Ștergerea testului...',
  testDeleted: 'Testul a fost șters cu succes',

  // Intervals
  fetchingIntervals: 'Încărcarea intervalelor...',
  intervalsFetched: 'Intervalele au fost încărcate cu succes',
  errorFetchingIntervals: 'Eroare la încărcarea intervalelor',
  creatingInterval: 'Crearea intervalului...',
  intervalCreated: 'Intervalul a fost creat cu succes',
  errorCreatingInterval: 'Eroare la crearea intervalului',
  errorDeletingInterval: "Eroare la ștergerea intervalului",
  deletingInterval: 'Ștergerea intervalului...',
  intervalDeleted: 'Intervalul a fost șters cu succes',

  // Records
  fetchingRecords: 'Încărcarea notelor...',
  recordsFetched: 'Notele au fost încărcate cu succes',
  errorFetchingRecords: 'Eroare la încărcarea notelor',
  creatingRecord: 'Crearea notei...',
  recordCreated: 'Nota a fost creată cu succes',
  errorCreatingRecord: 'Eroare la crearea notei',
  errorDeletingRecord: 'Eroare la ștergerea notei',
  deletingRecord: 'Ștergerea notei...',
  recordDeleted: 'Nota a fost ștearsă cu succes',
  updatingRecord: 'Actualizarea notei...',
  recordUpdated: 'Nota a fost actualizată cu succes',
  errorUpdatingRecord: 'Eroare la actualizarea notei',

  // Documents
  errorFetchingDocuments: 'Eroare la încărcarea documentelor',
  documentCreated: 'Documentul a fost creat',
  errorCreatingDocument: 'Eroare la crearea documentului',
  errorDeletingDocument: 'Eroare la ștergerea documentului',
  deletingDocument: 'Ștergerea documentului...',
  documentDeleted: 'Documentul a fost șters cu succes',
  errorDownloadingDocument: 'Eroare la descărcarea documentului',
  downloadingDocument: 'Descărcarea documentului...',
  documentDownloaded: 'Documentul a fost descărcat cu succes',
  errorFetchingDocument: 'Eroare la încărcarea documentului',
  errorUpdatingDocument: 'Eroare la actualizarea documentului',

  // Common
  loading: 'Încărcare...',
  success: 'Operațiunea a fost realizată cu succes',
  error: 'A apărut o eroare',
};

export const fetchStatuses: Record<FetchStatuses, FetchStatuses> = {
  default: 'default',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export default statusMessages;
