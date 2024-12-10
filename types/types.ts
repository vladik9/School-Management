type Student = {
  id: number;
  studentId: number;
  name: string;
};

type Interval = {
  id: number;
  name: string;
  students: Student[];
};

type Test = {
  id: number;
  name: string;
  barem: string;
  intervals: Interval[];
};


type YearData = {
  id: number;
  name: string;
};

type ClassData = {
  id: number;
  name: string;
  schoolId: number;
  teacher: string;
  tests: Test[];
};

type SchoolData = {
  id: number;
  name: string;
};

export {
  YearData,
  ClassData,
  SchoolData,
  Student,
  Interval,
  Test,
};
