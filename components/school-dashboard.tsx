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
  year: number;
  disciplines: Discipline[];
};

type SchoolData = {
  id: number;
  name: string;
  years: YearData[];
};

// Mock student data
const mockStudents: Student[] = [
  { id: 1, points: 85, finalTime: "45:30", average: 82.5 },
  { id: 2, points: 92, finalTime: "42:15", average: 88.0 },
  { id: 3, points: 78, finalTime: "50:00", average: 75.5 },
  { id: 4, points: 95, finalTime: "38:45", average: 91.0 },
  { id: 5, points: 88, finalTime: "43:20", average: 85.5 },
];

function toRoman(num: number): string {
  const romanNumerals = ['Pregatitor', 'I', 'II', 'III', 'IV'];
  return romanNumerals[num - 1] || num.toString();
}

const initialSchoolsData: SchoolData[] = [
  {
    id: 1,
    name: "Liceul Tehnologic \"Iorgu Vârnav Liteanu\"",
    years: Array.from({ length: 5 }, (_, i) => ({
      year: i + 1,
      disciplines: [
        {
          id: 1,
          name: "Educatia fizica",
          teacher: "Doamna Turcanu",
          hours: 5,
          tasks: [
            {
              id: 1,
              name: "Fotbal",
              intervals: Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                name: `Interval ${i + 1}`,
                students: mockStudents
              }))
            },
            {
              id: 2,
              name: "Gimnastica",
              intervals: Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                name: `Interval ${i + 1}`,
                students: mockStudents
              }))
            }
          ]
        },
        {
          id: 2,
          name: "Document",
          teacher: "Docs",
          hours: 5,
          tasks: [
            {
              id: 1,
              name: "Doc1",
              intervals: Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                name: `Interval ${i + 1}`,
                students: mockStudents
              }))
            },
            {
              id: 2,
              name: "Doc2",
              intervals: Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                name: `Interval ${i + 1}`,
                students: mockStudents
              }))
            }
          ]
        },
        {
          id: 3,
          name: "Tabele",
          teacher: "performanta",
          hours: 5,
          tasks: [
            {
              id: 1,
              name: "Tabel 1 ",
              intervals: Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                name: `Tabel ${i + 1}`,
                students: mockStudents
              }))
            },
            {
              id: 2,
              name: "Tabel 9",
              intervals: Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                name: `Tabel ${i + 1}`,
                students: mockStudents
              }))
            }
          ]
        }
      ]
    }))
  },
];

export default function SchoolDashboard() {
  const [schools, setSchools] = useState<SchoolData[]>(initialSchoolsData);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({});

  const router = useRouter();

  useEffect(() => {

    fetchSchools();

  }, []);


  const fetchSchools = async () => {
    const schools = await handleGetSchools() || [];

    // setSchools(schools);
  };


  const handleSchoolChange = (value: string) => {
    const school = schools.find(s => s.id === parseInt(value));
    if (school) {
      setSelectedSchool(school);
      setSelectedYear(null);
    }
  };
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(parseInt(value));
  };

  const selectedYearData = selectedSchool?.years.find(y => y.year === selectedYear);


  const handleSchoolSave = async () => {
    handleCreateSchool(newRecord);
    setIsSchoolModalOpen(false);
  };

  const handleClassSave = () => {
    setIsClassModalOpen(false);

  };


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

            {selectedSchool && (
              <div>
                <Label htmlFor="year-select">{translations.chooseSchool}</Label>
                <Select onValueChange={handleYearChange}>
                  <SelectTrigger id="year-select">
                    <SelectValue placeholder={translations.chooseSchool} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSchool.years.map((yearData) => (
                      <SelectItem key={yearData.year} value={yearData.year.toString()}>
                        {toRoman(yearData.year)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* //TODO - FIX this button */}
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" onClick={() => setIsClassModalOpen(true)}>{translations.addStudent}</Button>
                </div>
              </div>
            )}

            {selectedYearData && (
              <Accordion type="single" collapsible>
                {selectedYearData.disciplines.map((discipline) => (
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
                ))}
              </Accordion>
            )}
          </div>
          <AddSchool isModalOpen={isSchoolModalOpen} handleCloseModal={() => setIsSchoolModalOpen(false)} handleSaveModal={handleSchoolSave} setNewRecord={setNewRecord}
            newRecord={newRecord} />


          <AddStudent isModalOpen={isClassModalOpen} handleCloseModal={() => setIsClassModalOpen(false)} handleSaveModal={handleClassSave} />
        </CardContent>
      </Card>
    </div>
  );
}
