import { TimePicker } from '@/components/ui/time-picker';
import AddNewRecord from "@/components/add-modals/add-new-record";
import { start } from "repl";

const translations = {

  //Auth
  login: "Autentificare",
  logout: "Deconectare",
  loginDescription: "Introduceți datele de autentificare",
  your_email: "Introduceți adresa de email",
  your_password: "Introduceți parola",
  email: "Email",
  password: "Parola",
  loginButton: "Autentificare",
  loginError: "Datele de autentificare sunt incorecte",
  loginSuccess: "Autentificare reușită",
  logoutSuccess: "Deconectare reușită",
  logoutError: "Eroare la deconectare",

  //Dashboard
  dashboard: "Dashboard",
  dashboardDescription: "Aici puteți vedea informațiile despre școală",
  dashboardTitle: "Bine ai venit pe pagina de administrare a școlilor",

  //Generic modal
  cancelText: "Anulare",
  saveText: "Salvează",

  //School
  chooseSchool: "Alege școala",
  newSchoolName: "Nume școală nouă",
  addSchool: "Adaugă o școală nouă",
  viewSchools: "Vizualizare școli",
  noSchools: "Nu sunt școli adaugate",

  //Year
  addYear: "Adaugă an",
  chooseYear: "Alege anul",
  addANewYear: "Adaugă un an nou",
  noYears: "Nu sunt ani adaugați",

  //Disciplines
  viewDisciplines: "Vizualizare discipline",
  discipline: "Disciplina",
  addDiscipline: "Adaugă disciplină",
  addNewDiscipline: "Adaugă disciplină nouă",
  disciplineName: "Nume disciplină",

  //Class
  chooseClass: "Alege clasă",
  addClass: "Adaugă o clasă",
  addNewClass: "Adaugă o clasă nouă",
  teacherName: "Numele profesorului",
  className: "Numele clasei",
  noClassesAdded: "Nu sunt clase adaugate",

  //Student
  studentId: "Id elev",
  newStudentId: "Id elev nou",
  orderNumber: "Numar de ordine",
  addStudent: "Adaugă elev",
  viewStudents: "Vizualizare elevi",
  studentName: "Numele elevului",
  noStudentsAdded: "Nu sunt elevi adaugati",
  generatedStudentId: "Id-il generat",
  idStudent: "Numar de ordine elev",
  sex: "Sex",
  sexF: "Fată",
  sexB: "Băiat",
  class: "Clasa",
  controlB: "Control",
  experimentA: "Experiment",
  idNotGenerated: "Id-ul nu a fost generat",
  chooseStudent: "Alege elev",

  //Test
  tasks: "Teme",
  addTask: "Adaugă temă",
  name: "Nume",
  title: "Titlu",
  addTest: "Adaugă test",
  testName: "Numele testului",
  noTestAdded: "Nu sunt teste adaugate",
  barem: "Barem",
  addBarem: "Adaugă barem",

  //Interval
  viewIntervals: "Vizualizare intervale",
  viewAddIntervals: "Vizualizare/Adaugare intervale",
  viewAddIntervalsDescription: "Adaugare sau administreaza intervale",
  addInterval: "Adaugare interval",
  intervals: "Intervale de studiu",
  intervalName: "Nume interval",
  startTime: "Timp de start",
  finalTime: "Timp final",
  points: "Puncte",
  average: "Medie",
  noIntervals: "Nu există intervale adaugate",

  //Records
  addNewRecord: "Adaugă o noua inregistrare",
  addNewRecordDescription: "Adaugă o noua inregistrare aici",
  noRecords: "Nu sunt note adaugate",
  viewRecords: "Vizualizare note",
  addRecord: "Adaugă inregistrare",
  student: "Elev",
  date: "Data",
  record: "Nota",

  //TimePicker
  selectTime: "Selecteaza timp",
  selectedTime: "Timp selectat",
  noTimeSelected: "Niciun timp selectat",

  //Common
  action: "Acțiune",
  view: "Vizualizare",
  viewOrEdit: "Vizualizare sau editare",
  edit: "Editare",
  inter: "Int.",
  addDescription: "Adaugă detaliile aici",
  year: "An",
  id: "Id",

  //Docs
};

export default translations;
