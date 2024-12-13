'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import translations from "@/lib/translations";
import { handleGetSchools, handleCreateSchool } from "@/controllers/schools";
import { handleGetClasses, handleCreateClass } from "@/controllers/classes";
import { handleGetYears, handleCreateYear } from "@/controllers/years";
import { handleGetStudents, handleCreateStudent } from "@/controllers/student";
import { handleCreateTest } from "@/controllers/test";
import { handleGetIntervals, handleCreateInterval } from '@/controllers/intervals';
import { School, Users } from 'lucide-react';
import { toRoman } from "@/utils/functions";
import { Student, Interval, Test, YearData, ClassData, SchoolData } from "@/types/types";

import { StatusModal } from '@/components/status-modal';

// Child components
import SchoolSelector from '@/components/schoolSelector/schoolSelector';
import YearSelector from '@/components/schoolSelector/yearSelector';
import ClassAccordion from '@/components/schoolSelector/classAccordion';

// Modals
import AddSchool from "@/components/add-modals/add-school";
import AddYear from "@/components/add-modals/add-year";
import AddClass from "@/components/add-modals/add-class";
import AddStudent from "@/components/add-modals/add-student";
import AddTest from "@/components/add-modals/add-test";
import AddViewIntervals from "@/components/add-modals/add-view-intervals";

interface StudentData {
  id: number;
  name: string;
  // Add other fields if needed
}

export default function SchoolDashboard() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [years, setYears] = useState<YearData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

  // Modal states
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

  // Status Modal functions
  const showStatusModal = (message: string, variant: 'default' | 'success' | 'error' | 'loading') => {
    setStatusModal({ isVisible: true, message, variant });
  };
  const hideStatusModal = () => {
    setStatusModal(prev => ({ ...prev, isVisible: false }));
  };

  // Logout Handler
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Fetch schools on mount
  useEffect(() => {
    fetchSchools();
  }, []);

  // Fetch years when school selected
  useEffect(() => {
    if (selectedSchool) {
      fetchYears();
    }
  }, [selectedSchool]);

  // Fetch classes when year selected
  useEffect(() => {
    if (selectedYear) {
      fetchClasses();
    }
  }, [selectedYear]);

  // Fetch students when class selected
  useEffect(() => {
    if (selectedClassId) {
      fetchStudents();
    }
  }, [selectedClassId]);

  // Data fetching functions
  const fetchSchools = async () => {
    showStatusModal('Fetching schools...', 'loading');
    try {
      const schoolList = await handleGetSchools() || [];
      setSchools(schoolList);
      showStatusModal('Schools fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching schools', 'error');
    }
  };

  const fetchYears = async () => {
    if (!selectedSchool) return;
    showStatusModal('Fetching years...', 'loading');
    try {
      const yearList = await handleGetYears(selectedSchool.id.toString()) || [];
      setYears(yearList);
      showStatusModal('Years fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching years', 'error');
    }
  };

  const fetchClasses = async () => {
    if (!selectedYear) return;
    showStatusModal('Fetching classes...', 'loading');
    try {
      const classList = await handleGetClasses(selectedYear.toString()) || [];
      setClasses(classList);
      showStatusModal('Classes fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching classes', 'error');
    }
  };

  const fetchStudents = async () => {
    if (!selectedClassId) return;
    showStatusModal('Fetching students...', 'loading');
    try {
      const studentList = await handleGetStudents(selectedClassId.toString()) || [];
      setStudents(studentList);
      showStatusModal('Students fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching students', 'error');
    }
  };

  const fetchIntervals = async (testId: number) => {
    if (!testId) return;
    showStatusModal('Fetching intervals...', 'loading');
    try {
      const intervalList = await handleGetIntervals(testId) || [];
      setIntervals(intervalList);
      showStatusModal('Intervals fetched successfully', 'success');
    } catch (error) {
      showStatusModal('Error fetching intervals', 'error');
    }
  };

  // Handlers for selections
  const handleSchoolChange = (schoolId: number) => {
    const school = schools.find(s => s.id === schoolId);
    if (school) {
      setSelectedSchool(school);
      setSelectedYear(null);
      setClasses([]);
    }
  };

  const handleYearChange = (yearId: number) => {
    setSelectedYear(yearId);
    setClasses([]);
  };

  // Handlers for creating new data
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
    if (!selectedSchool) return;
    showStatusModal('Creating year...', 'loading');
    try {
      await handleCreateYear(newRecord, selectedSchool.id.toString());
      setIsYearModalOpen(false);
      setNewRecord({});
      fetchYears();
      showStatusModal('Year created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating year', 'error');
    }
  };

  const handleClassSave = async () => {
    if (!selectedYear) return;
    showStatusModal('Creating class...', 'loading');
    try {
      await handleCreateClass(newRecord, selectedYear.toString());
      setIsClassModalOpen(false);
      setNewRecord({});
      fetchClasses();
      showStatusModal('Class created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating class', 'error');
    }
  };

  const handleStudentSave = async () => {
    if (!selectedClassId) return;
    showStatusModal('Creating student...', 'loading');
    try {
      await handleCreateStudent(newRecord, selectedClassId.toString());
      setIsStudentModalOpen(false);
      setNewRecord({});
      fetchStudents();
      showStatusModal('Student created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating student', 'error');
    }
  };

  const handleTestSave = async () => {
    if (!selectedClassId) return;
    showStatusModal('Creating test...', 'loading');
    try {
      await handleCreateTest(newRecord, selectedClassId.toString());
      setIsTestModalOpen(false);
      setNewRecord({});
      fetchClasses();
      showStatusModal('Test created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating test', 'error');
    }
  };

  const handleIntervalSave = async () => {
    if (!selectedTestId) return;
    showStatusModal('Creating interval...', 'loading');
    try {
      await handleCreateInterval(selectedTestId);
      setIsIntervalModalOpen(false);
      fetchClasses();
      showStatusModal('Interval created successfully', 'success');
    } catch (error) {
      showStatusModal('Error creating interval', 'error');
    }
  };

  // Other handlers
  const handleAddStudent = (classId: number) => {
    setSelectedClassId(classId);
    setIsStudentModalOpen(true);
  };

  const handleSelectingTest = (classId: number) => {
    setSelectedClassId(classId);
    setIsTestModalOpen(true);
  };

  const handleAddViewIntervals = async (testId: number) => {
    setSelectedTestId(testId);
    await fetchIntervals(testId);
    setIsIntervalModalOpen(true);
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
          {/* School Selection */}
          <SchoolSelector
            schools={schools}
            onSelectSchool={handleSchoolChange}
            onAddSchool={() => setIsSchoolModalOpen(true)}
          />

          {/* Year Selection (only show if school selected) */}
          {selectedSchool && (
            <YearSelector
              years={years}
              onSelectYear={handleYearChange}
              onAddYear={() => setIsYearModalOpen(true)}
            />
          )}

          {/* Classes and Tests */}
          {selectedYear && classes.length > 0 && (
            <ClassAccordion
              classes={classes}
              translations={translations}
              handleAddStudent={handleAddStudent}
              handleSelectingTest={handleSelectingTest}
              handleAddViewIntervals={handleAddViewIntervals}
            />
          )}

          {/* If no classes yet */}
          {selectedYear && classes.length === 0 && (
            <div>
              <div className="text-center">
                <p>{translations.noClassesAdded}</p>
              </div>
              <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <Button variant="outline" onClick={() => setIsClassModalOpen(true)}>
                  {translations.addClass}
                </Button>
              </div>
            </div>
          )}

          {/* Modals */}
          <AddSchool
            isModalOpen={isSchoolModalOpen}
            handleCloseModal={() => setIsSchoolModalOpen(false)}
            handleSaveModal={handleSchoolSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />

          <AddYear
            isModalOpen={isYearModalOpen}
            handleCloseModal={() => setIsYearModalOpen(false)}
            handleSaveModal={handleYearSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />

          <AddClass
            isModalOpen={isClassModalOpen}
            handleCloseModal={() => setIsClassModalOpen(false)}
            handleSaveModal={handleClassSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />

          <AddTest
            isModalOpen={isTestModalOpen}
            handleCloseModal={() => setIsTestModalOpen(false)}
            handleSaveModal={handleTestSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />

          <AddViewIntervals
            intervals={intervals}
            isModalOpen={isIntervalModalOpen}
            handleCloseModal={() => setIsIntervalModalOpen(false)}
            handleSaveModal={handleIntervalSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />

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
    </div>
  );
}
