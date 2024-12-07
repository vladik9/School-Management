type Student = {
  id: number;
  points: number;
  finalTime: string;
  average: number;
};

type Interval = {
  id: number;
  name: string;
  students: Student[];
};

type Task = {
  id: number;
  name: string;
  intervals: Interval[];
};

type Discipline = {
  id: number;
  name: string;
  teacher: string;
  hours: number;
  tasks: Task[];
};

type YearData = {
  id: number;
  name: string;
};

type ClassData = {
  id: number;
  name: string;
  schoolId: number;
};

type SchoolData = {
  id: number;
  name: string;
};

export {
  Discipline,
  YearData,
  ClassData,
  SchoolData,
  Student,
  Interval,
  Task,
};
