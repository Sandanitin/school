import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const Navbar = ({ isMobile = false }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpandedItems({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = {
    "Super Admin": {
      path: "/super-admin",
      children: [
        { path: "/super-admin/dashboard", label: "Dashboard" },
        { path: "/super-admin/schoolmanagement", label: "School Management" },
        { path: "/super-admin/schoolmanagement/addschool", label: "➝ Add School" },
        { path: "/super-admin/schoolmanagement/schoollist", label: "➝ School List" },
        { path: "/super-admin/moduleaccesscontrol", label: "Module Access Control" },
        { path: "/super-admin/themebranding", label: "Theme Branding" },
        { path: "/super-admin/planmanagement", label: "Plan Management" },
        { path: "/super-admin/planmanagement/addplan", label: "➝ Add Plan" },
        { path: "/super-admin/planmanagement/planlist", label: "➝ Plan List" },
        { path: "/super-admin/databackuprecovery", label: "Data Backup & Recovery" },
        { path: "/super-admin/adminrequestapproval", label: "Admin Requests" },
      ],
    },
    Admin: {
      path: "/admin",
      children: [
        { path: "/admin/dashboard", label: "Dashboard" },
        { path: "/admin/teacher-management", label: "Teacher Management" },
        { path: "/admin/teacher-management/addteacher", label: "➝ Add Teacher" },
        { path: "/admin/teacher-management/teacherlist", label: "➝ Teacher List" },
        { path: "/admin/student-management", label: "Student Management" },
        { path: "/admin/student-management/addstudent", label: "➝ Add Student" },
        { path: "/admin/student-management/bulkupload", label: "➝ Bulk Upload" },
        { path: "/admin/student-management/studentlist", label: "➝ Student List" },
        { path: "/admin/parentlinking", label: "Parent Linking" },
        { path: "/admin/timetable", label: "Timetable Management" },
        { path: "/admin/feestructure", label: "Fee Structure Setup" },
        { path: "/admin/feestructure/feetype", label: "➝ Fee Type" },
        { path: "/admin/feestructure/paymentreminders", label: "➝ Payment Reminders" },
        { path: "/admin/examannouncement", label: "Exam Announcement" },
        { path: "/admin/examannouncement/examschedule", label: "➝ Exam Schedule" },
        { path: "/admin/attendance-reports", label: "Attendance Reports" },
        { path: "/admin/announcements", label: "Announcements" },
        { path: "/admin/sms", label: "SMS Messaging" },
        { path: "/admin/classtests", label: "Class Tests" },
        { path: "/admin/inventory", label: "Inventory Management" },
        { path: "/admin/instituteinfo", label: "Institute Info Setup" },
        { path: "/admin/accounts", label: "Accounts Management" },
        { path: "/admin/moduleactivation", label: "Module Activation" },
      ],
    },
    Teacher: {
      path: "/teacher",
      children: [
        { path: "/teacher/dashboard", label: "Dashboard" },
        { path: "/teacher/attendance", label: "Attendance Marking" },
        { path: "/teacher/homework", label: "Homework" },
        { path: "/teacher/homework/create", label: "➝ Create Homework" },
        { path: "/teacher/homework/submissions", label: "➝ Submission Status" },
        { path: "/teacher/exammarks", label: "Exam Marks Entry" },
        { path: "/teacher/lessonplanning", label: "Lesson Planning" },
        { path: "/teacher/studymaterials", label: "Study Material Upload" },
        { path: "/teacher/library", label: "Library Access" },
        { path: "/teacher/communication", label: "Communication Panel" },
        { path: "/teacher/liveclass", label: "Live Class Host" },
      ],
    },
    Student: {
      path: "/student",
      children: [
        { path: "/student/dashboard", label: "Dashboard" },
        { path: "/student/homework", label: "Homework" },
        { path: "/student/attendance", label: "Attendance" },
        { path: "/student/results", label: "Results" },
        { path: "/student/library", label: "Library System" },
        { path: "/student/notices", label: "School Notices" },
        { path: "/student/studymaterials", label: "Study Material Download" },
        { path: "/student/liveclass", label: "Live Class Viewer" },
      ],
    },
  };

  const toggleItem = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const renderNavItems = () => (
    <div className="relative" ref={dropdownRef}>
      <ul className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-1'}`}>
        {Object.entries(navItems).map(([key, item]) => {
          const isItemActive = isActive(item.path);
          const isExpanded = expandedItems[key];

          return (
            <li key={key} className="relative group">
              <button
                onClick={() => toggleItem(key)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isItemActive
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{key}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>

              <div 
                className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${
                  isExpanded ? 'block' : 'hidden'
                } group-hover:block`}
                onMouseEnter={() => setExpandedItems(prev => ({...prev, [key]: true}))}
                onMouseLeave={() => setExpandedItems(prev => ({...prev, [key]: false}))}
              >
                <div className="py-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => isMobile && setIsOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        location.pathname === child.path
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-indigo-600">School ERP</div>
          </div>
          <div className="hidden md:flex items-center">
            {renderNavItems()}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {renderNavItems()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

export const MobileNavbar = () => <Navbar isMobile={true} />;
