'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkAuth, logout } from '@/controllers/auth';
import { useRouter } from 'next/navigation';
import translations from "@/lib/translations";

import {
  processGetSchools,
  processCreateSchool,
  processRemoveSchool
} from "@/controllers/schools";
import {
  processGetClasses,
  processCreateClass,
  processRemoveClass
} from "@/controllers/classes";
import {
  processGetYears,
  processCreateYear,
  processRemoveYear
} from "@/controllers/years";
import {
  processCreateStudent,
  processRemoveStudent,
  processUpdateStudent
} from "@/controllers/students";
import {
  processCreateTest,
  processRemoveTest
} from "@/controllers/tests";
import {
  processGetIntervals,
  processCreateInterval,
  processRemoveInterval
} from '@/controllers/intervals';
import {
  processGetRecords,
  processCreateRecord,
  processRemoveRecord,
  processUpdateRecord
} from '@/controllers/records';

import {
  processCreateDocument,
  processGetDocument,
  processRemoveDocument,
  processUpdateDocument
} from '@/controllers/documents';

import { School } from 'lucide-react';
import {
  IntervalData,
  RecordData,
  YearData,
  ClassData,
  SchoolData,
  FetchStatuses,
} from "@/types/types";

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
import UploadDocument from '@/components/add-modals/upload-document';

/**
 * The SchoolDashboard component is the main entry point for the
 * application. It handles authentication, navigation and the display
 * of data.
 *
 * @returns The rendered SchoolDashboard component
 */
export default function SchoolDashboard() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<SchoolData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [years, setYears] = useState<YearData[]>([]);
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
  const [intervals, setIntervals] = useState<IntervalData[]>([]);
  const [selectedIntervalId, setSelectedIntervalId] = useState<number>();
  const [records, setRecords] = useState<RecordData[]>([]);

  // Modal states
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isIntervalModalOpen, setIsIntervalModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const [newRecord, setNewRecord] = useState({});
  const [statusModal, setStatusModal] = useState({
    isVisible: false,
    message: '',
    variant: fetchStatuses.default,
  });

  const router = useRouter();

  /**
   * Show the status modal with a message and a variant.
   *
   * @param {string} message The message to show in the modal.
   * @param {FetchStatuses} variant The variant of the message, which determines the color of the modal.
   */
  const showStatusModal = (message: string, variant: FetchStatuses) => {
    setStatusModal({ isVisible: true, message, variant });
  };

  /**
   * Hides the status modal.
   *
   * This is a function only to make it easy to call when the user clicks outside of the modal.
   */
  const hideStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, isVisible: false }));
  };

  /**
   * Handles the logout process.
   *
   * This function is called when the user clicks on the logout button.
   * It logs the user out and redirects them to the login page.
   */
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  useEffect(() => { if (!checkAuth()) router.push('/'); }, []);

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

  // Fetch records when interval selected
  useEffect(() => {
    if (selectedIntervalId) {
      fetchRecords(selectedIntervalId);
    }
  }, [selectedIntervalId]);

  // =========================
  // Data fetching functions
  // =========================

  /**
   * Fetches the list of schools from the server and sets the local state.
   *
   * @returns {Promise<void>} A promise that resolves when the schools have been fetched.
   */
  const fetchSchools = async () => {
    try {
      // showStatusModal(statusMessages.fetchingSchools, fetchStatuses.loading);
      const schoolList = (await processGetSchools()) || [];
      setSchools(schoolList);
      // showStatusModal(statusMessages.schoolsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingSchools, fetchStatuses.error);
    }
  };

  /**
   * Fetches the list of years for the currently selected school from the server and sets the local state.
   *
   * This function is called when the selected school changes.
   *
   * @returns {Promise<void>} A promise that resolves when the years have been fetched.
   */
  const fetchYears = async () => {
    if (!selectedSchoolId) return;
    // showStatusModal(statusMessages.fetchingYears, fetchStatuses.loading);
    try {
      const yearList = (await processGetYears(selectedSchoolId.id)) || [];
      setYears(yearList);
      // showStatusModal(statusMessages.yearsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingYears, fetchStatuses.error);
    }
  };

  /**
   * Fetches the list of classes for the currently selected year from the server and sets the local state.
   *
   * This function is called when the selected year changes.
   *
   * @returns {Promise<void>} A promise that resolves when the classes have been fetched.
   */
  const fetchClasses = async () => {
    if (!selectedYearId) return;
    // showStatusModal(statusMessages.fetchingClasses, fetchStatuses.loading);
    try {
      const classList = (await processGetClasses(selectedYearId.toString())) || [];
      setClasses(classList);
      // showStatusModal(statusMessages.classesFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingClasses, fetchStatuses.error);
    }
  };

  /**
   * Fetches the list of intervals for the given testId from the server and sets the local state.
   *
   * This function is called when the selected test changes.
   *
   * @param {number} testId The id of the test for which to fetch intervals.
   * @returns {Promise<void>} A promise that resolves when the intervals have been fetched.
   */
  const fetchIntervals = async (testId: number) => {
    if (!testId) return;
    // showStatusModal(statusMessages.fetchingIntervals, fetchStatuses.loading);
    try {
      const intervalList = (await processGetIntervals(testId)) || [];
      setIntervals(intervalList);
      // showStatusModal(statusMessages.intervalsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingIntervals, fetchStatuses.error);
    }
  };

  /**
   * Fetches the list of records for the given intervalId from the server and updates the local state.
   *
   * This function is called when the selected interval changes.
   *
   * @param {number} intervalId The id of the interval for which to fetch records.
   * @returns {Promise<void>} A promise that resolves when the records have been fetched.
   */
  const fetchRecords = async (intervalId: number) => {
    // showStatusModal(statusMessages.fetchingRecords, fetchStatuses.loading);
    try {
      const recordList = (await processGetRecords(intervalId)) || [];
      setRecords(recordList);
      // showStatusModal(statusMessages.recordsFetched, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorFetchingRecords, fetchStatuses.error);
    }
  };

  // =========================
  // Selection Handlers
  // =========================

  /**
   * Handles a change in the selected school.
   *
   * When a different school is selected, the selected year and list of classes are reset.
   *
   * @param {number} schoolId The id of the newly selected school.
   */
  const handleSchoolChange = (schoolId: number) => {
    const school = schools.find((s) => s.id === schoolId);
    if (school) {
      setSelectedSchoolId(school);
      setSelectedYearId(null);
      setClasses([]);
    }
  };

  /**
   * Handles a change in the selected year.
   *
   * When a different year is selected, the list of classes is reset.
   *
   * @param {number} yearId The id of the newly selected year.
   */
  const handleYearChange = (yearId: number) => {
    setSelectedYearId(yearId);
    setClasses([]);
  };

  // =========================
  // Creation Handlers
  // =========================

  /**
   * Handles saving a new school.
   *
   * When a new school is saved, the list of schools is updated.
   *
   * @returns {Promise<void>} A promise that resolves when the school has been saved.
   */
  const handleSchoolSave = async () => {
    // showStatusModal(statusMessages.creatingSchool, fetchStatuses.loading);
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

  /**
   * Handles the saving of a new year for the selected school.
   *
   * This function triggers the creation of a new year using the provided data,
   * closes the year modal, resets the newRecord state, and refreshes the list
   * of years. If an error occurs during the process, an error status modal
   * is displayed.
   *
   * @returns {Promise<void>} A promise that resolves when the year has been processed.
   */
  const handleYearSave = async () => {
    if (!selectedSchoolId) return;
    // showStatusModal(statusMessages.creatingYear, fetchStatuses.loading);
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

  /**
   * Handles the saving of a new class for the selected year.
   *
   * This function triggers the creation of a new class using the provided data,
   * closes the class modal, resets the newRecord state, and refreshes the list
   * of classes. If an error occurs during the process, an error status modal
   * is displayed.
   *
   * @returns {Promise<void>} A promise that resolves when the class has been processed.
   */
  const handleClassSave = async () => {
    if (!selectedYearId) return;
    // showStatusModal(statusMessages.creatingClass, fetchStatuses.loading);
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

  /**
   * Handles the saving of a new student for the selected class.
   *
   * This function triggers the creation of a new student using the provided data,
   * closes the student modal, resets the newRecord state, and refreshes the list
   * of classes. If an error occurs during the process, an error status modal
   * is displayed.
   *
   * @returns {Promise<void>} A promise that resolves when the student has been processed.
   */
  const handleStudentSave = async () => {
    if (!selectedClassId) return;
    // showStatusModal(statusMessages.creatingStudent, fetchStatuses.loading);
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

  /**
   * Handles saving a new test.
   *
   * When a new test is saved, the processCreateTest function is called with the
   * newRecord and selectedClassId. If the process is successful, the test modal
   * is closed, the newRecord state is reset, and the list of classes is refreshed.
   * If an error occurs, an error status modal is displayed.
   *
   * @returns {Promise<void>} A promise that resolves when the test has been saved.
   */
  const handleTestSave = async () => {
    if (!selectedClassId) return;
    // showStatusModal(statusMessages.creatingTest, fetchStatuses.loading);
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

  /**
   * Handles saving a new interval.
   *
   * When a new interval is saved, the processCreateInterval function is called
   * with the selectedTestId. If the process is successful, the list of classes
   * and intervals is refreshed, the newRecord state is reset, and a success
   * status modal is displayed. If an error occurs, an error status modal is
   * displayed.
   *
   * @returns {Promise<void>} A promise that resolves when the interval has been saved.
   */
  const handleIntervalSave = async () => {
    if (!selectedTestId) return;
    // showStatusModal(statusMessages.creatingInterval, fetchStatuses.loading);
    try {
      await processCreateInterval(selectedTestId);
      await fetchClasses();
      await fetchIntervals(selectedTestId);
      setNewRecord({});
      showStatusModal(statusMessages.intervalCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingInterval, fetchStatuses.error);
    }
  };

  /**
   * Handles saving a new record for the selected interval.
   *
   * This function initiates the creation of a new record using the provided newRecord
   * data and the selected interval ID. Upon successful record creation, it closes the
   * new record modal, resets the newRecord state, refreshes the lists of records
   * and classes, and displays a success status modal. If an error occurs during the
   * process, an error status modal is shown.
   *
   * @returns {Promise<void>} A promise that resolves when the new record has been processed.
   */
  const handleSaveNewRecord = async () => {
    console.log('newRecord', newRecord);
    try {
      // showStatusModal(statusMessages.creatingRecord, fetchStatuses.loading);
      await processCreateRecord(newRecord, selectedIntervalId || 0);
      setIsNewRecordModalOpen(false);
      setNewRecord({});
      await fetchRecords(selectedIntervalId || 0);
      await fetchClasses();
      showStatusModal(statusMessages.recordCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingRecord, fetchStatuses.error);
    }
  };

  /**
   * Handles saving a new document for the selected class.
   *
   * This function initiates the creation of a new document using the provided newRecord
   * data and the selected class ID. Upon successful document creation, it closes the
   * new document modal, resets the newRecord state, refreshes the list of classes,
   * and displays a success status modal. If an error occurs during the process, an
   * error status modal is shown.
   *
   * @returns {Promise<void>} A promise that resolves when the new document has been processed.
   */
  const handleSaveDocument = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newRecord.name || '');
      if (newRecord.doc) {
        formData.append('file', newRecord.doc);
      }

      await processCreateDocument(formData, selectedClassId || 0);
      setIsDocumentModalOpen(false);
      setNewRecord({});
      await fetchClasses();
      showStatusModal(statusMessages.documentCreated, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorCreatingDocument, fetchStatuses.error);
    }
  };


  const handleUpdateDocument = async (documentId: number, link: string) => {
    try {
      await processUpdateDocument({ link }, documentId);
    } catch (error) {
      console.error(error);
    }
  };




  // =========================
  // Viewing / Editing Handlers
  // =========================

  /**
   * Handles opening the "Add/View Intervals" modal.
   *
   * This function is called when the user clicks on the "Add/View Intervals" button
   * associated with a test. It sets the selected test ID, fetches the test's intervals,
   * opens the "Add/View Intervals" modal, and resets the newRecord state.
   *
   * @param {number} testId The ID of the test whose intervals should be displayed.
   * @returns {Promise<void>} A promise that resolves when the intervals have been fetched.
   */
  const handleAddViewIntervals = async (testId: number) => {
    setSelectedTestId(testId);
    await fetchIntervals(testId);
    setIsIntervalModalOpen(true);
    setNewRecord({});
  };

  /**
   * Handles fetching and viewing records for a specified interval.
   *
   * This function sets the selected interval ID, fetches the records
   * associated with that interval, and resets the newRecord state.
   *
   * @param {number} intervalId - The ID of the interval whose records are to be fetched.
   * @returns {Promise<void>} A promise that resolves when the records have been fetched.
   */
  const handleViewEditRecords = async (intervalId: number) => {
    setSelectedIntervalId(intervalId);
    await fetchRecords(intervalId);
    setNewRecord({});
  };

  /**
      * Handles updating a student using the provided data and student ID.
      *
      * This function is called when the user clicks on the "Update" button
      * associated with a student in the student list. It displays a loading
      * status modal, updates the student using the provided data, and
      * resets the newRecord state. Upon successful update, it displays a
      * success status modal. If an error occurs during the process, an
      * error status modal is shown. Finally, if the user was viewing a
      * specific interval's records, it refreshes the list of classes.
      *
      * @param {number} studentId The ID of the student to be updated.
      * @param {object} data The data to be used for updating the student.
      * @returns {Promise<void>} A promise that resolves when the student has been updated.
      */
  const handleUpdateStudent = async (studentId: number, data: object) => {

    showStatusModal(statusMessages.updatingStudent, fetchStatuses.loading);
    try {
      await processUpdateStudent(data, studentId);
      showStatusModal(statusMessages.studentUpdated, fetchStatuses.success);
      setNewRecord({});
    } catch (error) {
      showStatusModal(statusMessages.errorUpdatingStudent, fetchStatuses.error);
    } finally {
      if (selectedIntervalId) {
        await fetchClasses();
      }
    }
  };

  // =========================
  // Removal Handlers (UPDATED)
  // =========================

  /**
   * Handles removing a school from the database.
   *
   * This function is called when the user clicks on the "Remove" button associated
   * with a school in the school list. It displays a loading status modal, removes
   * the school using the provided ID, and resets the newRecord state. Upon
   * successful removal, it displays a success status modal. If an error occurs
   * during the process, an error status modal is shown. Finally, it refreshes the
   * list of schools.
   *
   * @param {number} schoolId The ID of the school to be removed.
   * @returns {Promise<void>} A promise that resolves when the school has been removed.
   */

  const handleRemoveSchool = async (schoolId: number) => {
    showStatusModal(statusMessages.deletingSchool, fetchStatuses.loading);
    try {
      await processRemoveSchool(schoolId);
      showStatusModal(statusMessages.schoolDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingSchool, fetchStatuses.error);
    } finally {
      await fetchSchools();
    }
  };

  /**
   * Handles removing a year from the database.
   *
   * This function is called when the user initiates the removal of a year.
   * It displays a loading status modal, removes the year using the provided ID,
   * and upon successful removal, displays a success status modal. If an error
   * occurs during the process, an error status modal is shown. Finally, it
   * refreshes the list of years.
   *
   * @param {number} yearId The ID of the year to be removed.
   * @returns {Promise<void>} A promise that resolves when the year has been removed.
   */
  const handleRemoveYear = async (yearId: number) => {
    showStatusModal(statusMessages.deletingYear, fetchStatuses.loading);
    try {
      await processRemoveYear(yearId);
      showStatusModal(statusMessages.yearDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingYear, fetchStatuses.error);
    } finally {
      await fetchYears();
    }
  };

  /**
   * Handles removing a class from the database.
   *
   * This function is called when the user initiates the removal of a class.
   * It displays a loading status modal, removes the class using the provided
   * ID, and upon successful removal, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown. Finally,
   * it refreshes the list of classes.
   *
   * @param {number} classId The ID of the class to be removed.
   * @returns {Promise<void>} A promise that resolves when the class has been removed.
   */
  const handleRemoveClass = async (classId: number) => {
    showStatusModal(statusMessages.deletingClass, fetchStatuses.loading);
    try {
      await processRemoveClass(classId);
      showStatusModal(statusMessages.classDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingClass, fetchStatuses.error);
    } finally {
      await fetchClasses();
    }
  };

  /**
   * Handles removing a student from the database.
   *
   * This function is called when the user initiates the removal of a student.
   * It displays a loading status modal, removes the student using the provided
   * ID, and upon successful removal, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown. Finally,
   * it refreshes the list of classes.
   *
   * @param {number} studentId The ID of the student to be removed.
   * @returns {Promise<void>} A promise that resolves when the student has been removed.
   */
  const handleRemoveStudent = async (studentId: number) => {
    showStatusModal(statusMessages.deletingStudent, fetchStatuses.loading);
    try {
      await processRemoveStudent(studentId);
      showStatusModal(statusMessages.studentDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingStudent, fetchStatuses.error);
    } finally {
      await fetchClasses();
    }
  };

  /**
   * Handles removing a test from the database.
   *
   * This function is called when the user initiates the removal of a test.
   * It displays a loading status modal, removes the test using the provided
   * ID, and upon successful removal, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown. Finally,
   * it refreshes the list of classes.
   *
   * @param {number} testId The ID of the test to be removed.
   * @returns {Promise<void>} A promise that resolves when the test has been removed.
   */
  const handleRemoveTest = async (testId: number) => {
    showStatusModal(statusMessages.deletingTest, fetchStatuses.loading);
    try {
      await processRemoveTest(testId);
      showStatusModal(statusMessages.testDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingTest, fetchStatuses.error);
    } finally {
      await fetchClasses();
    }
  };

  /**
   * Handles removing an interval from the database.
   *
   * This function is called when the user initiates the removal of an interval.
   * It displays a loading status modal, removes the interval using the provided
   * ID, and upon successful removal, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown. Finally,
   * it refreshes the list of intervals for the selected test.
   *
   * @param {number} intervalId The ID of the interval to be removed.
   * @returns {Promise<void>} A promise that resolves when the interval has been removed.
   */
  const handleRemoveInterval = async (intervalId: number) => {
    showStatusModal(statusMessages.deletingInterval, fetchStatuses.loading);
    try {
      await processRemoveInterval(intervalId);
      showStatusModal(statusMessages.intervalDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingInterval, fetchStatuses.error);
    } finally {
      if (selectedTestId) {
        await fetchIntervals(selectedTestId);
        await fetchClasses();
      }
    }
  };

  /**
   * Handles removing a record from the database.
   *
   * This function is called when the user initiates the removal of a record.
   * It displays a loading status modal, removes the record using the provided
   * ID, and upon successful removal, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown. Finally,
   * it refreshes the list of records for the selected interval.
   *
   * @param {number} recordId The ID of the record to be removed.
   * @returns {Promise<void>} A promise that resolves when the record has been removed.
   */
  const handleRemoveRecord = async (recordId: number) => {
    showStatusModal(statusMessages.deletingRecord, fetchStatuses.loading);
    try {
      await processRemoveRecord(recordId);
      showStatusModal(statusMessages.recordDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingRecord, fetchStatuses.error);
    } finally {
      if (selectedIntervalId) {
        await fetchRecords(selectedIntervalId);
        await fetchClasses();
      }
    }
  };

  /**
   * Handles removing a document from the database.
   *
   * This function is called when the user initiates the removal of a document.
   * It displays a loading status modal, removes the document using the provided
   * ID, and upon successful removal, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown. Finally,
   * it refreshes the list of classes.
   *
   * @param {number} documentId The ID of the document to be removed.
   * @returns {Promise<void>} A promise that resolves when the document has been removed.
   */
  const handleRemoveDocument = async (documentId: number) => {
    showStatusModal(statusMessages.deletingDocument, fetchStatuses.loading);
    try {
      await processRemoveDocument(documentId);
      showStatusModal(statusMessages.documentDeleted, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDeletingDocument, fetchStatuses.error);
    } finally {
      await fetchClasses();
    }
  };

  /**
   * Handles downloading a document from the database.
   *
   * This function is called when the user initiates the download of a document.
   * It displays a loading status modal, downloads the document using the provided
   * ID, and upon successful download, displays a success status modal. If an
   * error occurs during the process, an error status modal is shown.
   *
   * @param {number} documentId The ID of the document to be downloaded.
   * @returns {Promise<void>} A promise that resolves when the document has been downloaded.
   */
  const handleDownloadDocument = async (documentId: number) => {
    showStatusModal(statusMessages.downloadingDocument, fetchStatuses.loading);
    try {
      await processGetDocument(documentId);
      showStatusModal(statusMessages.documentDownloaded, fetchStatuses.success);
    } catch (error) {
      showStatusModal(statusMessages.errorDownloadingDocument, fetchStatuses.error);
    }
  };

  /**
   * Handles updating a record from the database.
   *
   * This function is called when the user initiates the update of a record.
   * It displays a loading status modal, updates the record using the provided
   * data and record ID, and upon successful update, displays a success status
   * modal. If an error occurs during the process, an error status modal is
   * shown. Finally, it refreshes the list of records for the selected interval.
   *
   * @param {number} recordId The ID of the record to be updated.
   * @param {object} data The data to be used for updating the record.
   * @returns {Promise<void>} A promise that resolves when the record has been updated.
   */
  const handleUpdateRecord = async (recordId: number, data: object) => {
    showStatusModal(statusMessages.updatingRecord, fetchStatuses.loading);
    try {
      await processUpdateRecord(data, recordId);
      showStatusModal(statusMessages.recordUpdated, fetchStatuses.success);
      setNewRecord({});
    } catch (error) {
      showStatusModal(statusMessages.errorUpdatingRecord, fetchStatuses.error);
    } finally {
      if (selectedIntervalId) {
        await fetchRecords(selectedIntervalId);
        await fetchClasses();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-1xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <School className="mr-2 h-6 w-6" />
            {translations.dashboardTitle}
          </CardTitle>
          <Button variant="outline" onClick={handleLogout}>
            {translations.logout}
          </Button>
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
              onAddYear={() => setIsYearModalOpen(true)}
              onRemoveYear={handleRemoveYear}
            />
          )}
          {/* Classes and Tests */}
          {classes.length > 0 && (
            <div>
              <ClassAccordion
                classes={classes}
                handleAddStudent={() => setIsStudentModalOpen(true)}
                handleSelectingTest={() => setIsTestModalOpen(true)}
                handleAddViewIntervals={handleAddViewIntervals}
                setSelectedClassId={setSelectedClassId}
                handleRemoveClass={handleRemoveClass}
                handleRemoveStudent={handleRemoveStudent}
                handleUpdateStudent={handleUpdateStudent}
                handleRemoveTest={handleRemoveTest}
                handleUploadDocument={() => setIsDocumentModalOpen(true)}
                handleRemoveDocument={handleRemoveDocument}
                handleDownloadDocument={handleDownloadDocument}
                newRecord={newRecord}
                setNewRecord={setNewRecord}
                handleUpdateDocument={handleUpdateDocument}
              />
            </div>
          )}
          {/* If no classes yet */}
          {selectedYearId && classes.length === 0 && (
            <div className="text-center">
              <p>{translations.noClassesAdded}</p>
            </div>
          )}
          {selectedYearId && !selectedClassId && (
            <div>
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <Button variant="outline" onClick={() => setIsClassModalOpen(true)}>
                  {translations.addClass}
                </Button>
              </div>
            </div>
          )}
          {/* Modals */}
          <AddSchool
            isModalOpen={isSchoolModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsSchoolModalOpen(false);
            }}
            handleSaveModal={handleSchoolSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />
          <AddYear
            isModalOpen={isYearModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsYearModalOpen(false);
            }}
            handleSaveModal={handleYearSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />
          <AddClass
            isModalOpen={isClassModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsClassModalOpen(false);
            }}
            handleSaveModal={handleClassSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />
          <AddTest
            isModalOpen={isTestModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsTestModalOpen(false);
            }}
            handleSaveModal={handleTestSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
          />
          <AddViewIntervals
            intervals={intervals}
            isModalOpen={isIntervalModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsIntervalModalOpen(false);
            }}
            handleSaveModal={handleIntervalSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
            records={records}
            students={
              (classes.length > 0 && classes.find((c) => c.id === selectedClassId)?.students) || []
            }
            handleSaveNewRecord={handleSaveNewRecord}
            setSelectedIntervalId={setSelectedIntervalId}
            handleViewEditRecords={handleViewEditRecords}
            isNewRecordModalOpen={isNewRecordModalOpen}
            setIsNewRecordModalOpen={setIsNewRecordModalOpen}
            handleRemoveInterval={handleRemoveInterval}
            handleRemoveRecord={handleRemoveRecord}
            handleUpdateRecord={handleUpdateRecord}
            tests={(classes.length > 0 && classes.find((c) => c.id === selectedClassId)?.tests) || []}
            testId={selectedTestId || 0}
          />
          <AddStudent
            isModalOpen={isStudentModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsStudentModalOpen(false);
            }}
            handleSaveModal={handleStudentSave}
            setNewRecord={setNewRecord}
            newRecord={newRecord}
            selectedYear={selectedYearId}
            years={years}
          />
          <UploadDocument
            isModalOpen={isDocumentModalOpen}
            handleCloseModal={() => {
              setNewRecord({});
              setIsDocumentModalOpen(false);
            }}
            newRecord={newRecord}
            setNewRecord={setNewRecord}
            handleSaveModal={handleSaveDocument}
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
