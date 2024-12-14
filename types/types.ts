type StudentData = {
  id: number;
  studentId: number;
  name: string;
};

type IntervalData = {
  id: number;
  name: string;
  students: StudentData[];
};

type TestData = {
  id: number;
  name: string;
  barem: string;
  intervals: IntervalData[];
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
  tests: TestData[];
  students: StudentData[];
};

type SchoolData = {
  id: number;
  name: string;
};
type RecordData = {
  id: number;
  startTime: Date;
  endTime: Date;
  intervalId: number;
}
 type FetchStatuses = "default" | "success" | "error" | "loading";


export type{
  YearData,
  ClassData,
  SchoolData,
  StudentData,
  IntervalData,
  TestData,
  RecordData,
  FetchStatuses,
};
