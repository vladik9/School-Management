'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import translations from "@/lib/translations";
import { processGetSchools, processCreateSchool, processRemoveSchool } from "@/controllers/schools";
import { processGetClasses, processCreateClass, processRemoveClass } from "@/controllers/classes";
import { processGetYears, processCreateYear, processRemoveYear } from "@/controllers/years";
import { processGetStudents, processCreateStudent, processRemoveStudent } from "@/controllers/student";
import { processCreateTest, processRemoveTest } from "@/controllers/test";
import { processGetIntervals, processCreateInterval, processRemoveInterval } from '@/controllers/intervals';
import { processGetRecords, processCreateRecord, processRemoveRecord } from '@/controllers/records';
import { School } from 'lucide-react';
import { StudentData, IntervalData, RecordData, YearData, ClassData, SchoolData, FetchStatuses } from "@/types/types";
import statusMessages, { fetchStatuses } from '@/lib/statusMessages';
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


export default function SchoolDashboard() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<SchoolData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [years, setYears] = useState<YearData[]>([]);
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [intervals, setIntervals] = useState<IntervalData[]>([]);
  const [selectedIntervalId, setSelectedIntervalId] = useState<number>();
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [records, setRecords] = useState<RecordData[]>([]);
  // Modal states
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isIntervalModalOpen, setIsIntervalModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);


  const [newRecord, setNewRecord] = useState({});
  const [statusModal, setStatusModal] = useState({
    isVisible: false,
    message: '',
    variant: fetchStatuses.default,
  });

  const router = useRouter();

  // Status Modal functions
  const showStatusModal = (message: string, variant: FetchStatuses) => {
    setStatusModal({ isVisible: true, message, variant: fetchStatuses.default });
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
    if (selectedSchoolId) {
      fetchYears();
    }
  }, [selectedSchoolId]);

  // Fetch classes when year selected
  useEffect(() => {
    if (selectedYearId) {
      fetchClasses();
    }
  }, [selectedYearId]);

  // Fetch students when class selected
  useEffect(() => {
    if (selectedClassId) {
      fetchStudents();
    }
  }, [selectedClassId]);

  // Fetch records when class selected
  useEffect(() => {
    if (selectedIntervalId) {
      fetchRecords(selectedIntervalId);
    }
  }, [selectedIntervalId]);

  // Data fetching functions
  const fetchSchools = async () => {
    showStatusModal(statusMessages.fetchingSchools, fetchStatuses.loading);
    try {
      const schoolList = await processGetSchools() || [];
      setSchools(schoolList);
      showStatusModal(statusMessages.schoolsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingSchools, fetchStatuses.error);
    }
  };

  const fetchYears = async () => {
    if (!selectedSchoolId) return;
    showStatusModal(statusMessages.fetchingYears, fetchStatuses.loading);
    try {
      const yearList = await processGetYears(selectedSchoolId.id) || [];
      setYears(yearList);
      showStatusModal(statusMessages.yearsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingYears, fetchStatuses.error);
    }
  };

  const fetchClasses = async () => {
    if (!selectedYearId) return;
    showStatusModal(statusMessages.fetchingClasses, fetchStatuses.loading);
    try {
      const classList = await processGetClasses(selectedYearId.toString()) || [];
      setClasses(classList);
      showStatusModal(statusMessages.classesFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingClasses, fetchStatuses.error);;
    }
  };

  const fetchStudents = async () => {
    if (!selectedClassId) return;
    showStatusModal(statusMessages.fetchingStudents, fetchStatuses.loading);
    try {
      const studentList = await processGetStudents(selectedClassId.toString()) || [];
      setStudents(studentList);
      showStatusModal(statusMessages.studentsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingStudents, fetchStatuses.error);
    }
  };

  const fetchIntervals = async (testId: number) => {
    if (!testId) return;
    showStatusModal(statusMessages.fetchingIntervals, fetchStatuses.loading);
    try {
      const intervalList = await processGetIntervals(testId) || [];
      setIntervals(intervalList);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingIntervals, fetchStatuses.error);
    }
  };

  const fetchRecords = async (intervalId: number) => {
    showStatusModal(statusMessages.fetchingRecords, fetchStatuses.loading);
    try {
      const recordList = await processGetRecords(intervalId) || [];
      setRecords(recordList);
      showStatusModal(statusMessages.recordsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingRecords, fetchStatuses.error);
    }
  };

  // Handlers for selections
  const handleSchoolChange = (schoolId: number) => {
    const school = schools.find(s => s.id === schoolId);
    if (school) {
      setSelectedSchoolId(school);
      setSelectedYearId(null);
      setClasses([]);
    }
  };

  const handleYearChange = (yearId: number) => {
    setSelectedYearId(yearId);
    setSelectedYearId(yearId);
    setClasses([]);
  };

  // Handlers for creating new data
  const handleSchoolSave = async () => {
    showStatusModal(statusMessages.creatingSchool, fetchStatuses.loading);
    try {
      await processCreateSchool(newRecord);
      setIsSchoolModalOpen(false);
      setNewRecord({});
      await fetchSchools();
      showStatusModal(statusMessages.schoolCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingSchool, fetchStatuses.error);
    }
  };

  const handleYearSave = async () => {
    if (!selectedSchoolId) return;
    showStatusModal(statusMessages.schoolCreated, fetchStatuses.loading);
    try {
      await processCreateYear(newRecord, selectedSchoolId.id);
      setIsYearModalOpen(false);
      setNewRecord({});
      await fetchYears();
      showStatusModal(statusMessages.yearCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingYear, fetchStatuses.error);
    }
  };

  const handleClassSave = async () => {
    if (!selectedYearId) return;
    showStatusModal(statusMessages.creatingClass, fetchStatuses.loading);
    try {
      await processCreateClass(newRecord, selectedYearId.toString());
      setIsClassModalOpen(false);
      setNewRecord({});
      await fetchClasses();
      showStatusModal(statusMessages.classCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingClass, fetchStatuses.error);
    }
  };

  const handleStudentSave = async () => {
    if (!selectedClassId) return;
    showStatusModal(statusMessages.creatingStudent, fetchStatuses.loading);
    try {
      await processCreateStudent(newRecord, selectedClassId.toString());
      setIsStudentModalOpen(false);
      setNewRecord({});
      await fetchClasses();
      showStatusModal(statusMessages.studentCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingStudent, fetchStatuses.error);
    }
  };

  const handleTestSave = async () => {
    if (!selectedClassId) return;
    showStatusModal(statusMessages.creatingTest, fetchStatuses.loading);
    try {
      await processCreateTest(newRecord, selectedClassId.toString());
      setIsTestModalOpen(false);
      setNewRecord({});
      await fetchClasses();
      showStatusModal(statusMessages.testCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingTest, fetchStatuses.error);
    }
  };

  const handleIntervalSave = async () => {
    if (!selectedTestId) return;
    showStatusModal(statusMessages.creatingInterval, fetchStatuses.loading);
    try {
      await processCreateInterval(selectedTestId);
      await fetchClasses();
      await fetchIntervals(selectedTestId);
      setNewRecord({});
      showStatusModal(statusMessages.intervalCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingTest, fetchStatuses.error);
    }
  };
  const handleSaveNewRecord = async () => {
    await processCreateRecord(newRecord, selectedIntervalId || 0);
    setIsNewRecordModalOpen(false);
    setNewRecord({});
    await fetchRecords(selectedIntervalId || 0);

  };
  // Other handlers
  const handleAddViewIntervals = async (testId: number) => {
    await setSelectedTestId(testId);
    await fetchIntervals(testId);
    setIsIntervalModalOpen(true);
    setNewRecord({});
  };

  const handleViewEditRecords = async (intervalId: number) => {
    await setSelectedIntervalId(intervalId);
    await fetchRecords(intervalId);
  };
  const handleViewEditStudents = async (classId: number) => {

  };


  const handleUpdateStudent = async (studentId: number, data: object) => {

  };
  const handleRemoveSchool = async (schoolId: number) => {
    await processRemoveSchool(schoolId);
    await fetchSchools();
  };
  const handleRemoveYear = async (yearId: number) => {
    await processRemoveYear(yearId);
    await fetchYears();
  };
  const handleRemoveClass = async (classId: number) => {
    await processRemoveClass(classId);
    await fetchClasses();
  };
  const handleRemoveStudent = async (studentId: number) => {
    await processRemoveStudent(studentId);
    await fetchClasses();
  };

  const handleRemoveTest = async (testId: number) => {
    await processRemoveTest(testId);
    await fetchClasses();
  };
  const handleRemoveInterval = async (intervalId: number) => {
    await processRemoveInterval(intervalId);
    await fetchIntervals(selectedTestId || 0);
  };
  const handleRemoveRecord = async (recordId: number) => {
    processRemoveRecord(recordId);
    await fetchRecords(selectedIntervalId || 0);
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
            onRemoveSchool={handleRemoveSchool}
          />

          {/* Year Selection (only show if school selected) */}
          {selectedSchoolId && (
            <YearSelector
              years={years}
              onSelectYear={handleYearChange}
              //TODO- fix this year add logic not adding real value is modifying it on the fly
              onAddYear={() => setIsYearModalOpen(true)}
              onRemoveYear={handleRemoveYear}
            />
          )}

          {/* Classes and Tests */}
          {classes.length > 0 && (
            <ClassAccordion
              classes={classes}
              handleAddStudent={() => setIsStudentModalOpen(true)}
              handleSelectingTest={() => setIsTestModalOpen(true)}
              handleAddViewIntervals={handleAddViewIntervals}
              setSelectedClassId={setSelectedClassId}
              handleViewEditStudents={handleViewEditStudents}
              handleRemoveClass={handleRemoveClass}
              handleRemoveStudent={handleRemoveStudent}
              handleUpdateStudent={handleUpdateStudent}
              handleRemoveTest={handleRemoveTest}

            />
          )}

          {/* If no classes yet */}
          {/* //TODO - FIX THIS BAD CODE */}
          {selectedYearId && classes.length === 0 &&
            <div className="text-center">
              <p>{translations.noClassesAdded}</p>
            </div>}
          {selectedYearId && !selectedClassId &&
            <div>
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <Button variant="outline" onClick={() => setIsClassModalOpen(true)}>
                  {translations.addClass}
                </Button>
              </div>
            </div>
          }

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
            records={records}
            students={(classes.length > 0 && classes.find((c) => c.id === selectedClassId) || {}).students || []}
            handleSaveNewRecord={handleSaveNewRecord}
            setSelectedIntervalId={setSelectedIntervalId}
            handleViewEditRecords={handleViewEditRecords}
            isNewRecordModalOpen={isNewRecordModalOpen}
            setIsNewRecordModalOpen={setIsNewRecordModalOpen}
            handleRemoveInterval={handleRemoveInterval}
            handleRemoveRecord={handleRemoveRecord}
          />

          <AddStudent
            isModalOpen={isStudentModalOpen}
            handleCloseModal={() => setIsStudentModalOpen(false)}
            handleSaveModal={handleStudentSave}
            newRecord={newRecord}
            setNewRecord={setNewRecord}
            selectedYear={selectedYearId}
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
