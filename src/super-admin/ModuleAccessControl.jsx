import React, { useState, useEffect } from 'react';
import { FaSave, FaUndo, FaUserShield, FaLock, FaUnlock, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Sample module data structure
const modules = [
  { id: 'dashboard', name: 'Dashboard', description: 'Main dashboard with overview' },
  { id: 'school_management', name: 'School Management', description: 'Manage schools and their details' },
  { id: 'student_management', name: 'Student Management', description: 'Manage student records' },
  { id: 'staff_management', name: 'Staff Management', description: 'Manage teaching and non-teaching staff' },
  { id: 'attendance', name: 'Attendance', description: 'Track student and staff attendance' },
  { id: 'examinations', name: 'Examinations', description: 'Manage exams and results' },
  { id: 'timetable', name: 'Timetable', description: 'Class and exam schedules' },
  { id: 'fees', name: 'Fees Management', description: 'Fee collection and tracking' },
  { id: 'inventory', name: 'Inventory', description: 'School assets and resources' },
  { id: 'reports', name: 'Reports', description: 'Generate and view reports' },
  { id: 'settings', name: 'System Settings', description: 'Application configuration' },
];

// Sample roles data
const roles = [
  { id: 'super_admin', name: 'Super Admin', description: 'Full system access' },
  { id: 'school_admin', name: 'School Admin', description: 'School-level administration' },
  { id: 'teacher', name: 'Teacher', description: 'Teaching staff' },
  { id: 'accountant', name: 'Accountant', description: 'Financial management' },
  { id: 'librarian', name: 'Librarian', description: 'Library management' },
  { id: 'parent', name: 'Parent', description: 'Parent portal access' },
  { id: 'student', name: 'Student', description: 'Student portal access' },
];

// Sample initial permissions (in a real app, this would come from an API)
const initialPermissions = {
  super_admin: modules.reduce((acc, module) => ({ ...acc, [module.id]: { view: true, create: true, edit: true, delete: true } }), {}),
  school_admin: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    school_management: { view: true, create: true, edit: true, delete: false },
    student_management: { view: true, create: true, edit: true, delete: true },
    staff_management: { view: true, create: true, edit: true, delete: false },
    attendance: { view: true, create: true, edit: true, delete: false },
    examinations: { view: true, create: true, edit: true, delete: false },
    timetable: { view: true, create: false, edit: false, delete: false },
    fees: { view: true, create: true, edit: true, delete: false },
    inventory: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  // Add other roles with their respective permissions
};

const ModuleAccessControl = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalPermissions, setOriginalPermissions] = useState(JSON.stringify(initialPermissions));

  // Update hasChanges when permissions change
  useEffect(() => {
    setHasChanges(JSON.stringify(permissions) !== originalPermissions);
  }, [permissions, originalPermissions]);

  // Handle permission toggle
  const togglePermission = (moduleId, permissionType) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleId]: {
          ...(prev[selectedRole]?.[moduleId] || { view: false, create: false, edit: false, delete: false }),
          [permissionType]: !prev[selectedRole]?.[moduleId]?.[permissionType]
        }
      }
    }));
  };

  // Handle role change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Save permissions
  const savePermissions = async () => {
    setIsSaving(true);
    try {
      // In a real app, you would call an API here
      console.log('Saving permissions:', permissions);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setOriginalPermissions(JSON.stringify(permissions));
      toast.success('Permissions updated successfully!');
    } catch (error) {
      console.error('Error saving permissions:', error);
      toast.error('Failed to update permissions');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset changes
  const resetChanges = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setPermissions(JSON.parse(originalPermissions));
    }
  };

  // Check if module has any permission
  const hasAnyPermission = (moduleId) => {
    const modulePerms = permissions[selectedRole]?.[moduleId];
    return modulePerms && Object.values(modulePerms).some(Boolean);
  };

  // Toggle all permissions for a module
  const toggleAllPermissions = (moduleId, value) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleId]: {
          view: value,
          create: value,
          edit: value,
          delete: value
        }
      }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Module Access Control</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage role-based access permissions for different modules
            </p>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={resetChanges}
                disabled={!hasChanges || isSaving}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  hasChanges
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaUndo />
                <span className="hidden sm:inline">Reset</span>
              </button>
              
              <button
                onClick={savePermissions}
                disabled={!hasChanges || isSaving}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  hasChanges
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-300 text-white cursor-not-allowed'
                }`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Role Description */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg font-medium text-blue-800">
          {roles.find(r => r.id === selectedRole)?.name}
        </h3>
        <p className="text-sm text-blue-700 mt-1">
          {roles.find(r => r.id === selectedRole)?.description}
        </p>
      </div>

      {/* Permissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Module
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center">
                  <span>All</span>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to ${hasAnyPermission('all') ? 'revoke all permissions' : 'grant all permissions'} for this role?`)) {
                        modules.forEach(module => {
                          toggleAllPermissions(module.id, !hasAnyPermission(module.id));
                        });
                      }
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-gray-200"
                    title={hasAnyPermission('all') ? 'Revoke all permissions' : 'Grant all permissions'}
                  >
                    {hasAnyPermission('all') ? <FaLock className="text-red-500" /> : <FaUnlock className="text-green-500" />}
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {modules.map((module) => (
              <tr key={module.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUserShield className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{module.name}</div>
                      <div className="text-sm text-gray-500">{module.description}</div>
                    </div>
                  </div>
                </td>
                
                {['view', 'create', 'edit', 'delete'].map((permission) => (
                  <td key={`${module.id}-${permission}`} className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => togglePermission(module.id, permission)}
                      className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                        permissions[selectedRole]?.[module.id]?.[permission]
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      title={`${permission.charAt(0).toUpperCase() + permission.slice(1)} permission`}
                    >
                      {permissions[selectedRole]?.[module.id]?.[permission] ? <FaCheck size={12} /> : <FaTimes size={12} />}
                    </button>
                  </td>
                ))}
                
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => {
                      const hasAny = hasAnyPermission(module.id);
                      if (window.confirm(`Are you sure you want to ${hasAny ? 'revoke all permissions' : 'grant all permissions'} for ${module.name}?`)) {
                        toggleAllPermissions(module.id, !hasAny);
                      }
                    }}
                    className={`p-1 rounded-full ${
                      hasAnyPermission(module.id)
                        ? 'text-red-500 hover:bg-red-50'
                        : 'text-green-500 hover:bg-green-50'
                    }`}
                    title={hasAnyPermission(module.id) ? 'Revoke all permissions' : 'Grant all permissions'}
                  >
                    {hasAnyPermission(module.id) ? <FaLock /> : <FaUnlock />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Help Text */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Permission Types:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><span className="font-medium">View:</span> Can view the module and its contents</li>
            <li><span className="font-medium">Create:</span> Can add new items in the module</li>
            <li><span className="font-medium">Edit:</span> Can modify existing items in the module</li>
            <li><span className="font-medium">Delete:</span> Can remove items from the module</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleAccessControl;
