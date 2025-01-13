import Interval from "@/models/interval.model";

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
  baremType: string;
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
  documents: DocumentData[];
  performances: PerformanceData[];
};

type PerformanceData = {
  id: number;
  studentId: number;
  studentName: string;
  testName: string;
  testId: number;
  testBarem: string;
  score: number;
};

type DocumentData = {
  id: number;
  filePath: string;
  name: string;
};

type SchoolData = {
  id: number;
  name: string;
};
type RecordData = {
  id: number;
  studentId: number;
  studentGeneratedId: number;
  value: Date | string | number;
  intervalId: number;
};
type FetchStatuses = "default" | "success" | "error" | "loading";


export type{
  YearData,
  ClassData,
  PerformanceData,
  SchoolData,
  StudentData,
  IntervalData,
  TestData,
  RecordData,
  FetchStatuses,
  DocumentData,
};
