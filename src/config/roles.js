// roles.js
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student"
};

// Permissions: what each role can access (must match folder/component routes)
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    "dashboard",
    "school-management",
    "plan-management",
    "module-access",
    "theme-branding",
    "backup-recovery",
    "admin-requests"
  ],
  [ROLES.ADMIN]: [
    "dashboard",
    "teacher-management",
    "student-management",
    "timetable",
    "fee-setup",
    "exams",
    "attendance-reports",
    "announcements",
    "sms",
    "accounts",
    "inventory",
    "parent-linking",
    "class-tests",
    "institute-info",
    "module-activation"
  ],
  [ROLES.TEACHER]: [
    "dashboard",
    "attendance-marking",
    "homework-assignment",
    "exam-marks",
    "lesson-planning",
    "study-material-upload",
    "library-access",
    "communication",
    "live-class-host"
  ],
  [ROLES.STUDENT]: [
    "dashboard",
    "homework-view",
    "attendance-view",
    "results",
    "library",
    "notices",
    "study-material",
    "live-class-viewer"
  ]
};

// Navigation items with icons (react-icons/fa)
export const NAV_ITEMS = {
  [ROLES.SUPER_ADMIN]: [
    { path: "dashboard", label: "Dashboard", icon: "FaTachometerAlt" },
    { path: "school-management", label: "School Management", icon: "FaSchool" },
    { path: "plan-management", label: "Plan Management", icon: "FaClipboardList" },
    { path: "module-access", label: "Module Access", icon: "FaPuzzlePiece" },
    { path: "theme-branding", label: "Theme Branding", icon: "FaPalette" },
    { path: "backup-recovery", label: "Backup & Recovery", icon: "FaDatabase" },
    { path: "admin-requests", label: "Admin Requests", icon: "FaUserShield" }
  ],
  [ROLES.ADMIN]: [
    { path: "dashboard", label: "Dashboard", icon: "FaTachometerAlt" },
    { path: "teacher-management", label: "Teachers", icon: "FaChalkboardTeacher" },
    { path: "student-management", label: "Students", icon: "FaUserGraduate" },
    { path: "attendance-reports", label: "Attendance", icon: "FaClipboardCheck" },
    { path: "timetable", label: "Timetable", icon: "FaTable" },
    { path: "exams", label: "Exams", icon: "FaClipboardList" },
    { path: "fee-setup", label: "Fee Setup", icon: "FaMoneyBillWave" },
    { path: "announcements", label: "Announcements", icon: "FaBullhorn" },
    { path: "accounts", label: "Accounts", icon: "FaCalculator" },
    { path: "inventory", label: "Inventory", icon: "FaBoxes" },
    { path: "sms", label: "SMS", icon: "FaSms" },
    { path: "parent-linking", label: "Parent Linking", icon: "FaUsers" },
    { path: "class-tests", label: "Class Tests", icon: "FaPenFancy" },
    { path: "institute-info", label: "Institute Info", icon: "FaInfoCircle" },
    { path: "module-activation", label: "Module Activation", icon: "FaToggleOn" }
  ],
  [ROLES.TEACHER]: [
    { path: "dashboard", label: "Dashboard", icon: "FaTachometerAlt" },
    { path: "attendance-marking", label: "Attendance", icon: "FaClipboardCheck" },
    { path: "homework-assignment", label: "Homework", icon: "FaBook" },
    { path: "exam-marks", label: "Exams", icon: "FaClipboardList" },
    { path: "lesson-planning", label: "Lesson Planning", icon: "FaCalendarAlt" },
    { path: "study-material-upload", label: "Study Material", icon: "FaBookOpen" },
    { path: "library-access", label: "Library", icon: "FaBookReader" },
    { path: "communication", label: "Communication", icon: "FaComments" },
    { path: "live-class-host", label: "Live Class", icon: "FaVideo" }
  ],
  [ROLES.STUDENT]: [
    { path: "dashboard", label: "Dashboard", icon: "FaTachometerAlt" },
    { path: "homework-view", label: "Homework", icon: "FaBook" },
    { path: "attendance-view", label: "My Attendance", icon: "FaClipboardCheck" },
    { path: "results", label: "My Results", icon: "FaChartLine" },
    { path: "library", label: "Library", icon: "FaBookReader" },
    { path: "notices", label: "Notices", icon: "FaBullhorn" },
    { path: "study-material", label: "Study Material", icon: "FaBookOpen" },
    { path: "live-class-viewer", label: "Live Class", icon: "FaVideo" }
  ]
};
