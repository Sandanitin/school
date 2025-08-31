// React and Routing
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

// Layout Components
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

// Lazy load components for better performance
// Super Admin Pages
const SADashboard = lazy(() => import("./super-admin/SuperDashboard"));
const ThemeBranding = lazy(() => import("./super-admin/ThemeBranding"));
const SchoolManagement = lazy(() => import("./super-admin/SchoolManagement"));
const AddSchoolForm = lazy(() => import("./super-admin/AddSchoolForm"));
const SchoolListTable = lazy(() => import("./super-admin/SchoolListTable"));
const ModuleAccessControl = lazy(() => import("./super-admin/ModuleAccessControl"));
const PlanManagement = lazy(() => import("./super-admin/PlanManagement"));
const AddPlanForm = lazy(() => import("./super-admin/AddPlanForm"));
const PlanListPage = lazy(() => import("./super-admin/PlanListPage"));
const DataBackupRecovery = lazy(() => import("./super-admin/DataBackupRecovery"));
const AdminRequestApproval = lazy(() => import("./super-admin/AdminRequestApproval"));

// Admin Pages
const AdminDashboard = lazy(() => import("./admin/Dashboard"));
const TeacherManagement = lazy(() => import("./admin/TeacherManagement"));
const AddTeacherForm = lazy(() => import("./admin/AddTeacherForm"));
const TeacherListTable = lazy(() => import("./admin/TeacherListTable"));
const StudentManagement = lazy(() => import("./admin/StudentManagement"));
const AddStudentForm = lazy(() => import("./admin/AddStudentForm"));
const BulkUploadStudents = lazy(() => import("./admin/BulkUploadStudents"));
const StudentListTable = lazy(() => import("./admin/StudentListTable"));
const ParentLinking = lazy(() => import("./admin/ParentLinking"));
const TimetableManagement = lazy(() => import("./admin/TimetableManagement"));
const FeeStructureSetup = lazy(() => import("./admin/FeeStructureSetup"));
const FeeTypeForm = lazy(() => import("./admin/FeeTypeForm"));
const PaymentRemindersConfig = lazy(() => import("./admin/PaymentRemindersConfig"));
const ExamAnnouncement = lazy(() => import("./admin/ExamAnnouncement"));
const ExamScheduleForm = lazy(() => import("./admin/ExamScheduleForm"));
const AttendanceReports = lazy(() => import("./admin/AttendanceReports"));
const AnnouncementsManagement = lazy(() => import("./admin/AnnouncementsManagement"));
const SMSMessaging = lazy(() => import("./admin/SMSMessaging"));
const ClassTestManagement = lazy(() => import("./admin/ClassTestManagement"));
const InventoryManagement = lazy(() => import("./admin/InventoryManagement"));
const InstituteInfoSetup = lazy(() => import("./admin/InstituteInfoSetup"));
const AccountsManagement = lazy(() => import("./admin/AccountsManagement"));
const ModuleActivation = lazy(() => import("./admin/ModuleActivation"));

// Teacher Pages
const TeacherDashboard = lazy(() => import("./teacher/Dashboard"));
const AttendanceMarking = lazy(() => import("./teacher/AttendanceMarking"));
const HomeworkAssignment = lazy(() => import("./teacher/HomeworkAssignment"));
const CreateHomeworkForm = lazy(() => import("./teacher/CreateHomeworkForm"));
const HomeworkSubmissionStatus = lazy(() => import("./teacher/HomeworkSubmissionStatus"));
const ExamMarksEntry = lazy(() => import("./teacher/ExamMarksEntry"));
const LessonPlanning = lazy(() => import("./teacher/LessonPlanning"));
const StudyMaterialUpload = lazy(() => import("./teacher/StudyMaterialUpload"));
const LibraryAccess = lazy(() => import("./teacher/LibraryAccess"));
const CommunicationPanel = lazy(() => import("./teacher/CommunicationPanel"));
const LiveClassHost = lazy(() => import("./teacher/LiveClassHost"));

// Student Pages
const StudentDashboard = lazy(() => import("./student/Dashboard"));
const HomeworkView = lazy(() => import("./student/HomeworkView"));
const AttendanceView = lazy(() => import("./student/AttendanceView"));
const ResultsView = lazy(() => import("./student/ResultsView"));
const LibrarySystem = lazy(() => import("./student/LibrarySystem"));
const SchoolNotices = lazy(() => import("./student/SchoolNotices"));
const StudyMaterialDownload = lazy(() => import("./student/StudyMaterialDownload"));
const LiveClassViewer = lazy(() => import("./student/LiveClassViewer"));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<SADashboard />} />
          <Route path="/super-admin/dashboard" element={<SADashboard />} />
          <Route path="/super-admin/themebranding" element={<ThemeBranding />} />
          <Route path="/super-admin/schoolmanagement" element={<SchoolManagement />} />
          <Route path="/super-admin/schoolmanagement/addschool" element={<AddSchoolForm />} />
          <Route path="/super-admin/schoolmanagement/schoollist" element={<SchoolListTable />} />
          <Route path="/super-admin/moduleaccesscontrol" element={<ModuleAccessControl />} />
          <Route path="/super-admin/planmanagement" element={<PlanManagement />} />
          <Route path="/super-admin/planmanagement/addplan" element={<AddPlanForm />} />
          <Route path="/super-admin/planmanagement/planlist" element={<PlanListPage />} />
          <Route path="/super-admin/databackuprecovery" element={<DataBackupRecovery />} />
          <Route path="/super-admin/adminrequestapproval" element={<AdminRequestApproval />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/teacher-management" element={<TeacherManagement />} />
          <Route path="/admin/teacher-management/addteacher" element={<AddTeacherForm />} />
          <Route path="/admin/teacher-management/teacherlist" element={<TeacherListTable />} />
          <Route path="/admin/student-management" element={<StudentManagement />} />
          <Route path="/admin/student-management/addstudent" element={<AddStudentForm/>} />
          <Route path="/admin/student-management/bulkupload" element={<BulkUploadStudents />} />
          <Route path="/admin/student-management/studentlist" element={<StudentListTable />} />
          <Route path="/admin/parentlinking" element={<ParentLinking />} />
          <Route path="/admin/timetable" element={<TimetableManagement />} />
          <Route path="/admin/feestructure" element={<FeeStructureSetup />} />
          <Route path="/admin/feestructure/feetype" element={<FeeTypeForm />} />
          <Route path="/admin/feestructure/paymentreminders" element={<PaymentRemindersConfig />} />
          <Route path="/admin/examannouncement" element={<ExamAnnouncement />} />
          <Route path="/admin/examannouncement/examschedule" element={<ExamScheduleForm />} />
          <Route path="/admin/attendance-reports" element={<AttendanceReports />} />
          <Route path="/admin/announcements" element={<AnnouncementsManagement />} />
          <Route path="/admin/sms" element={<SMSMessaging />} />
          <Route path="/admin/classtests" element={<ClassTestManagement />} />
          <Route path="/admin/inventory" element={<InventoryManagement />} />
          <Route path="/admin/instituteinfo" element={<InstituteInfoSetup />} />
          <Route path="/admin/accounts" element={<AccountsManagement />} />
          <Route path="/admin/moduleactivation" element={<ModuleActivation />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/attendance" element={<AttendanceMarking />} />
          <Route path="/teacher/homework" element={<HomeworkAssignment />} />
          <Route path="/teacher/homework/create" element={<CreateHomeworkForm />} />
          <Route path="/teacher/homework/submissions" element={<HomeworkSubmissionStatus />} />
          <Route path="/teacher/exammarks" element={<ExamMarksEntry />} />
          <Route path="/teacher/lessonplanning" element={<LessonPlanning />} />
          <Route path="/teacher/studymaterials" element={<StudyMaterialUpload />} />
          <Route path="/teacher/library" element={<LibraryAccess />} />
          <Route path="/teacher/communication" element={<CommunicationPanel />} />
          <Route path="/teacher/liveclass" element={<LiveClassHost />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/homework" element={<HomeworkView />} />
          <Route path="/student/attendance" element={<AttendanceView />} />
          <Route path="/student/results" element={<ResultsView />} />
          <Route path="/student/library" element={<LibrarySystem />} />
          <Route path="/student/notices" element={<SchoolNotices />} />
          <Route path="/student/studymaterials" element={<StudyMaterialDownload />} />
          <Route path="/student/liveclass" element={<LiveClassViewer />} />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/super-admin" element={<Navigate to="/super-admin" replace />} />
          <Route path="/admin" element={<Navigate to="/admin" replace />} />
          <Route path="/teacher" element={<Navigate to="/teacher" replace />} />
          <Route path="/student" element={<Navigate to="/student" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
