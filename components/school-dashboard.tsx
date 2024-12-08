'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { School, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/auth';
import translations from "../lib/translations";
import AddStudent from "./add-student";
import AddSchool from "./add-school";
import { handleGetSchools, handleCreateSchool } from "@/controllers/schools";
import { handleGetClasses, handleCreateClass } from "@/controllers/classes";
import { handleGetYears, handleCreateYear } from "@/controllers/years";
import { handleCreateDiscipline } from "@/controllers/discipline";
import AddYear from "./add-year";
import { toRoman } from "@/utils/functions";
import { Student, Interval, Test, Discipline, YearData, ClassData, SchoolData } from "@/types/types";
import AddClass from "./add-class";
import AddDiscipline from "./add-discipline";
// Mock student data
const mockStudents: Student[] = [
  { id: 1, points: 85, finalTime: "45:30", average: 82.5 },
  { id: 2, points: 92, finalTime: "42:15", average: 88.0 },
  { id: 3, points: 78, finalTime: "50:00", average: 75.5 },
  { id: 4, points: 95, finalTime: "38:45", average: 91.0 },
  { id: 5, points: 88, finalTime: "43:20", average: 85.5 },
];

// const initialSchoolsData: SchoolData[] = [
//   {
//     id: 1,
//     name: "Liceul Tehnologic \"Iorgu Vârnav Liteanu\"",
//     years: Array.from({ length: 5 }, (_, i) => ({
//       year: i + 1,
//       disciplines: [
//         {
//           id: 1,
//           name: "Educatia fizica",
//           teacher: "Doamna Turcanu",
//           hours: 5,
//           tasks: [
//             {
//               id: 1,
//               name: "Fotbal",
//               intervals: Array.from({ length: 5 }, (_, i) => ({
//                 id: i + 1,
//                 name: `Interval ${i + 1}`,
//                 students: mockStudents
//               }))
//             },
//             {
//               id: 2,
//               name: "Gimnastica",
//               intervals: Array.from({ length: 5 }, (_, i) => ({
//                 id: i + 1,
//                 name: `Interval ${i + 1}`,
//                 students: mockStudents
//               }))
//             }
//           ]
//         },
//         {
//           id: 2,
//           name: "Document",
//           teacher: "Docs",
//           hours: 5,
//           tasks: [
//             {
//               id: 1,
//               name: "Doc1",
//               intervals: Array.from({ length: 5 }, (_, i) => ({
//                 id: i + 1,
//                 name: `Interval ${i + 1}`,
//                 students: mockStudents
//               }))
//             },
//             {
//               id: 2,
//               name: "Doc2",
//               intervals: Array.from({ length: 5 }, (_, i) => ({
//                 id: i + 1,
//                 name: `Interval ${i + 1}`,
//                 students: mockStudents
//               }))
//             }
//           ]
//         },
//         {
//           id: 3,
//           name: "Tabele",
//           teacher: "performanta",
//           hours: 5,
//           tasks: [
//             {
//               id: 1,
//               name: "Tabel 1 ",
//               intervals: Array.from({ length: 5 }, (_, i) => ({
//                 id: i + 1,
//                 name: `Tabel ${i + 1}`,
//                 students: mockStudents
//               }))
//             },
//             {
//               id: 2,
//               name: "Tabel 9",
//               intervals: Array.from({ length: 5 }, (_, i) => ({
//                 id: i + 1,
//                 name: `Tabel ${i + 1}`,
//                 students: mockStudents
//               }))
//             }
//           ]
//         }
//       ]
//     }))
//   },
// ];

export default function SchoolDashboard() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [years, setYears] = useState<YearData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isDisciplineModalOpen, setIsDisciplineModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({});

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };


  useEffect(() => {
    fetchSchools();
  }, []);


  const fetchSchools = async () => {
    const schools = await handleGetSchools() || [];
    setSchools(schools);

  };

  const fetchYears = async () => {
    if (!selectedSchool) return;
    try {
      const years = await handleGetYears(selectedSchool.id) || [];
      setYears(years);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const fetchClasses = async () => {
    if (!selectedYear) return;
    try {
      const classes = await handleGetClasses(selectedYear) || [];
      setClasses(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };


  const handleSchoolChange = (value: string) => {
    const school = schools.find(s => s.id === parseInt(value));
    if (school) {
      setSelectedSchool(school); // Update state
      setSelectedYear(null); // Reset dependent state
    }
  };
  // Trigger fetchYears when selectedSchool changes
  useEffect(() => {
    if (selectedSchool) {
      fetchYears();
    }
  }, [selectedSchool]);

  const handleSchoolSave = async () => {
    handleCreateSchool(newRecord);
    setIsSchoolModalOpen(false);
    setNewRecord({});
    // fetchSchools();

  };
  const handleYearSave = async () => {
    handleCreateYear(newRecord, selectedSchool?.id || '');
    setIsYearModalOpen(false);
    setNewRecord({});


  };

  const handleClassSave = () => {
    setIsClassModalOpen(false);
    handleCreateClass(newRecord, selectedYear);
  };
  const handleSelectingDiscipline = (disciplineId: number) => {
    setIsDisciplineModalOpen(true);
    setSelectedClassId(disciplineId);
    console.log("disciplineId", disciplineId);

  };

  const handleDisciplineSave = () => {
    console.log(selectedClassId);
    setIsDisciplineModalOpen(false);
    handleCreateDiscipline(newRecord, selectedClassId);
  };


  const handleYearChange = (value: string) => {
    const year = parseInt(value);
    setSelectedYear(year);
  };


  useEffect(() => {
    if (selectedYear) {
      fetchClasses();
    }
  }, [selectedYear]);

  // const selectedYearData = selectedSchool?.years.find(y => y.year === selectedYear);

  console.log("classes", classes);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <School className="mr-2 h-6 w-6" />
            {translations.dashboardTitle}
          </CardTitle>
          <Button variant="outline" onClick={handleLogout}>{translations.logout}</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              {/* //NOTE - this is for the school */}
              <Label htmlFor="school-select">{translations.chooseSchool}</Label>
              <Select onValueChange={handleSchoolChange}>
                <SelectTrigger id="school-select">
                  <SelectValue placeholder={translations.chooseSchool} />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id.toString()}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <Button variant="outline" onClick={() => setIsSchoolModalOpen(true)}>{translations.addSchool}</Button>
              </div>
            </div>
            {/* //NOTE - this is for the year */}
            {selectedSchool && (
              <div>
                <Label htmlFor="year-select">{translations.chooseYear}</Label>
                {years.length > 0 &&
                  <Select onValueChange={handleYearChange}>
                    <SelectTrigger id="year-select">
                      <SelectValue placeholder={translations.chooseYear} />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((yearData) => (
                        <SelectItem key={yearData.id} value={yearData.id.toString()}>
                          {toRoman(yearData.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" onClick={() => setIsYearModalOpen(true)}>{translations.addYear}</Button>
                </div>
              </div>
            )}
            {/* //NOTE -  this is for the class */}
            {classes.length > 0 && (
              <div>
                <Accordion type="single" collapsible>
                  {classes.map((discipline) => (
                    <AccordionItem key={discipline.id} value={discipline.id.toString()}>
                      <AccordionTrigger>
                        {discipline.name} - {discipline.teacher}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {discipline.disciplines.length > 0 ? (
                            discipline.disciplines.map((disciplineItem) => (
                              <Card key={disciplineItem.id}>
                                <CardHeader>
                                  <CardTitle className="text-lg">{disciplineItem.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Dialog open={isSchoolModalOpen} onOpenChange={setIsClassModalOpen}>
                                    <DialogTrigger asChild>
                                      <Button variant="outline">{translations.viewIntervals}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <DialogHeader>
                                        <DialogTitle>{disciplineItem.name} - {translations.intervals}</DialogTitle>
                                      </DialogHeader>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>{translations.intervalName}</TableHead>
                                            <TableHead>{translations.action}</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {/* {disciplineItem.intervals.map((interval) => (
                                          <TableRow key={interval.id}>
                                            <TableCell>{translations.inter} {interval.id}</TableCell>
                                            <TableCell>
                                              <Dialog open={isStudentModalOpen && selectedInterval?.id === interval.id}
                                                onOpenChange={(open) => {
                                                  setIsStudentModalOpen(open);
                                                  if (open) setSelectedInterval(interval);
                                                }}>
                                                <DialogTrigger asChild>
                                                  <Button variant="outline" size="sm">
                                                    <Users className="h-4 w-4 mr-2" />
                                                    {translations.view}
                                                  </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[800px]">
                                                  <DialogHeader>
                                                    <DialogTitle>{translations.inter} {interval.id}</DialogTitle>
                                                  </DialogHeader>
                                                  <Table>
                                                    <TableHeader>
                                                      <TableRow>
                                                        <TableHead>{translations.studentId}</TableHead>
                                                        <TableHead>{translations.points}</TableHead>
                                                        <TableHead>{translations.finalTime}</TableHead>
                                                        <TableHead>{translations.average}</TableHead>
                                                      </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                      {interval.students.map((student) => (
                                                        <TableRow key={student.id}>
                                                          <TableCell>{student.id}</TableCell>
                                                          <TableCell>{student.points}</TableCell>
                                                          <TableCell>{student.finalTime}</TableCell>
                                                          <TableCell>{student.average}</TableCell>
                                                        </TableRow>
                                                      ))}
                                                    </TableBody>
                                                  </Table>
                                                </DialogContent>
                                              </Dialog>
                                            </TableCell>
                                          </TableRow>
                                        ))} */}
                                        </TableBody>
                                      </Table>
                                    </DialogContent>
                                  </Dialog>
                                </CardContent>
                              </Card>
                            ))
                          ) :
                            (<div className="text-center">
                              <p>{translations.noDisciplinesAdded}</p></div>
                            )}
                        </div>
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                          <Button variant="outline" onClick={() => handleSelectingDiscipline(discipline.id)}>{translations.addInterval}</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" onClick={() => setIsDisciplineModalOpen(true)}>{translations.addDiscipline}</Button>
                </div>
              </div>
            )}
            {/* TODO fix this at some point  */}
            {selectedYear && (
              <div>
                <div className="text-center">
                  <p>{translations.noDisciplinesAdded}</p>
                </div>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" onClick={() => setIsDisciplineModalOpen(true)}>{translations.addDiscipline}</Button>
                </div>
              </div>
            )}



            {/* {selectedYearData && ( */}
            {/* <Accordion type="single" collapsible> */}
            {/* {selectedYearData.disciplines.map((discipline) => (
                  <AccordionItem key={discipline.id} value={discipline.id.toString()}>
                    <AccordionTrigger>
                      {discipline.name} - {discipline.teacher}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {discipline.tasks.map((task) => (
                          <Card key={task.id}>
                            <CardHeader>
                              <CardTitle className="text-lg">{task.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Dialog open={isSchoolModalOpen} onOpenChange={setIsClassModalOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline">{translations.viewIntervals}</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>{task.name} - {translations.intervals}</DialogTitle>
                                  </DialogHeader>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>{translations.intervalName}</TableHead>
                                        <TableHead>{translations.action}</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {task.intervals.map((interval) => (
                                        <TableRow key={interval.id}>
                                          <TableCell>{translations.inter} {interval.id}</TableCell>
                                          <TableCell>
                                            <Dialog open={isStudentModalOpen && selectedInterval?.id === interval.id}
                                              onOpenChange={(open) => {
                                                setIsStudentModalOpen(open);
                                                if (open) setSelectedInterval(interval);
                                              }}>
                                              <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                  <Users className="h-4 w-4 mr-2" />
                                                  {translations.view}
                                                </Button>
                                              </DialogTrigger>
                                              <DialogContent className="sm:max-w-[800px]">
                                                <DialogHeader>
                                                  <DialogTitle>{translations.inter} {interval.id}</DialogTitle>
                                                </DialogHeader>
                                                <Table>
                                                  <TableHeader>
                                                    <TableRow>
                                                      <TableHead>{translations.studentId}</TableHead>
                                                      <TableHead>{translations.points}</TableHead>
                                                      <TableHead>{translations.finalTime}</TableHead>
                                                      <TableHead>{translations.average}</TableHead>
                                                    </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                    {interval.students.map((student) => (
                                                      <TableRow key={student.id}>
                                                        <TableCell>{student.id}</TableCell>
                                                        <TableCell>{student.points}</TableCell>
                                                        <TableCell>{student.finalTime}</TableCell>
                                                        <TableCell>{student.average}</TableCell>
                                                      </TableRow>
                                                    ))}
                                                  </TableBody>
                                                </Table>
                                              </DialogContent>
                                            </Dialog>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </DialogContent>
                              </Dialog>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))} */}
            {/* </Accordion> */}
            {/* )} */}
          </div>
          <AddSchool isModalOpen={isSchoolModalOpen} handleCloseModal={() => setIsSchoolModalOpen(false)} handleSaveModal={handleSchoolSave} setNewRecord={setNewRecord}
            newRecord={newRecord} />

          <AddYear isModalOpen={isYearModalOpen} handleCloseModal={() => setIsYearModalOpen(false)} handleSaveModal={handleYearSave} setNewRecord={setNewRecord}
            newRecord={newRecord} />


          <AddClass isModalOpen={isClassModalOpen} handleCloseModal={() => setIsClassModalOpen(false)} handleSaveModal={handleClassSave} setNewRecord={setNewRecord}
            newRecord={newRecord} />

          <AddDiscipline isModalOpen={isDisciplineModalOpen} handleCloseModal={() => setIsDisciplineModalOpen(false)} handleSaveModal={handleDisciplineSave} setNewRecord={setNewRecord}
            newRecord={newRecord} />
          {/*
          <AddStudent isModalOpen={isClassModalOpen} handleCloseModal={() => setIsStudentModalOpen(false)} handleSaveModal={handleClassSave} /> */}
        </CardContent>
      </Card>
    </div >
  );
}
