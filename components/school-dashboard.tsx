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
import AddSchool from "./add-modals/add-school";
import { handleGetSchools, handleCreateSchool } from "@/controllers/schools";
import { handleGetClasses, handleCreateClass } from "@/controllers/classes";
import { handleGetYears, handleCreateYear } from "@/controllers/years";
import { handleGetStudents, handleCreateStudent } from "@/controllers/student";
import { handleCreateTest } from "@/controllers/test";
import AddYear from "./add-modals/add-year";
import { toRoman } from "@/utils/functions";
import { Student, Interval, Test, YearData, ClassData, SchoolData } from "@/types/types";
import AddClass from "./add-modals/add-class";
import AddStudent from "./add-modals/add-student";
import AddTest from "./add-modals/add-test";
import AddViewIntervals from "./add-modals/add-view-intervals";
import { StatusModal } from '@/components/status-modal';
// Mock student data
// const mockStudents: Student[] = [
//   { id: 1, points: 85, finalTime: "45:30", average: 82.5 },
//   { id: 2, points: 92, finalTime: "42:15", average: 88.0 },
//   { id: 3, points: 78, finalTime: "50:00", average: 75.5 },
//   { id: 4, points: 95, finalTime: "38:45", average: 91.0 },
//   { id: 5, points: 88, finalTime: "43:20", average: 85.5 },
// ];

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
  const [years, setYears] = useState<YearData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isIntervalModalOpen, setIsIntervalModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({});
  const [statusModal, setStatusModal] = useState({
    isVisible: false,
    message: '',
    variant: 'default' as const,
  });

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    fetchSchools();
  }, []);


  const showStatusModal = (message: string, variant: 'default' | 'success' | 'error' | 'loading') => {
    setStatusModal({ isVisible: true, message, variant });
  };

  /**
   * Hide the status modal by setting isVisible to false.
   */
  const hideStatusModal = () => {
    setStatusModal(prev => ({ ...prev, isVisible: false }));
  };


  const fetchSchools = async () => {
    showStatusModal('Fetching schools...', 'loading');
    try {
      const schools = await handleGetSchools() || [];
      setSchools(schools);
      showStatusModal('Schools fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching schools', 'error');
    }
  };


  const fetchYears = async () => {
    if (!selectedSchool) return;
    showStatusModal('Fetching years...', 'loading');
    try {
      const years = await handleGetYears(selectedSchool.id.toString()) || [];
      setYears(years);
      showStatusModal('Years fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching years', 'error');
    }
  };

  const fetchClasses = async () => {
    if (!selectedYear) return;
    showStatusModal('Fetching classes...', 'loading');
    try {
      const classes = await handleGetClasses(selectedYear.toString()) || [];
      setClasses(classes);
      fetchStudents();
      showStatusModal('Classes fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching classes', 'error');
    }
  };

  const fetchStudents = async () => {
    if (!selectedClassId) return;
    showStatusModal('Fetching students...', 'loading');
    try {
      const students = await handleGetStudents(selectedClassId.toString()) || [];
      setStudents(students);
      showStatusModal('Students fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching students', 'error');
    }
  };

  const handleSchoolChange = (value: string) => {
    const school = schools.find(s => s.id === parseInt(value));
    if (school) {
      setSelectedSchool(school);
      setSelectedYear(null);
    }
  };

  useEffect(() => {
    if (selectedSchool) {
      fetchYears();
    }
  }, [selectedSchool]);

  const handleSchoolSave = async () => {
    showStatusModal('Creating school...', 'loading');
    try {
      await handleCreateSchool(newRecord);
      setIsSchoolModalOpen(false);
      setNewRecord({});
      fetchSchools();
      showStatusModal('School created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating school', 'error');
    }
  };

  const handleYearSave = async () => {
    showStatusModal('Creating year...', 'loading');
    try {
      await handleCreateYear(newRecord, selectedSchool?.id.toString() || '');
      setIsYearModalOpen(false);
      setNewRecord({});
      fetchYears();
      showStatusModal('Year created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating year', 'error');
    }
  };

  const handleClassSave = async () => {
    showStatusModal('Creating class...', 'loading');
    try {
      await handleCreateClass(newRecord, selectedYear?.toString() || '0');
      setIsClassModalOpen(false);
      fetchClasses();
      showStatusModal('Class created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating class', 'error');
    }
  };

  const handleStudentSave = async () => {
    showStatusModal('Creating student...', 'loading');
    try {
      await handleCreateStudent(newRecord, selectedClassId?.toString() || '');
      setIsStudentModalOpen(false);
      setNewRecord({});
      fetchStudents();
      showStatusModal('Student created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating student', 'error');
    }
  };

  const handleTestSave = async () => {
    showStatusModal('Creating test...', 'loading');
    try {
      await handleCreateTest(newRecord, selectedClassId?.toString() || '0');
      setIsTestModalOpen(false);
      fetchClasses();
      showStatusModal('Test created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating test', 'error');
    }
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
                <Accordion type="single" collapsible >
                  {classes.map((the_class) => (
                    <AccordionItem key={the_class.id} value={the_class.id.toString()}>
                      <AccordionTrigger>
                        {the_class.name} - {the_class.teacher}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {the_class.tests.length > 0 ? (
                            the_class.tests.map((testItem) => (
                              <Card key={testItem.id}>
                                <CardHeader>
                                  <CardTitle className="text-lg">{testItem.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Dialog open={isSchoolModalOpen} onOpenChange={setIsClassModalOpen}>
                                    <DialogTrigger asChild>
                                      <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                        <Button variant="outline">{translations.viewIntervals}</Button>
                                      </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <DialogHeader>
                                        <DialogTitle>{testItem.name} - {translations.intervals}</DialogTitle>
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
                              <p>{translations.noTestAdded}</p></div>
                            )}
                        </div>
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                          <Button variant="outline" style={{ marginRight: '10px' }} onClick={() => handleAddStudent(the_class.id)}>{translations.addStudent}</Button>
                          <Button variant="outline" onClick={() => handleSelectingTest(the_class.id)}>{translations.addTest}</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" onClick={() => setIsClassModalOpen(true)}>{translations.addClass}</Button>
                </div>
              </div>
            )}
            {/* TODO fix this at some point, remove or make it show only if no class is added  */}
            {/* {selectedYear && (
              <div>
                <div className="text-center">
                  <p>{translations.noClassesAdded}</p>
                </div>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" onClick={() => setIsClassModalOpen(true)}>{translations.addClass}</Button>
                </div>
              </div>
            )} */}



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

          <AddTest isModalOpen={isTestModalOpen} handleCloseModal={() => setIsTestModalOpen(false)} handleSaveModal={handleTestSave} setNewRecord={setNewRecord}
            newRecord={newRecord} />


          <AddViewIntervals
            isModalOpen={isIntervalModalOpen}
            handleCloseModal={() => setIsIntervalModalOpen(false)}
            handleSaveModal={handleTestSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord} />
          <AddStudent
            isModalOpen={isStudentModalOpen}
            handleCloseModal={() => setIsStudentModalOpen(false)}
            handleSaveModal={handleStudentSave}
            newRecord={newRecord}
            setNewRecord={setNewRecord}
            selectedYear={selectedYear}
          />
          <StatusModal
            isVisible={statusModal.isVisible}
            message={statusModal.message}
            variant={statusModal.variant}
            onClose={hideStatusModal}
          />
        </CardContent>
      </Card>
    </div >
  );
}
