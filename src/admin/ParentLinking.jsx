import React, { useState, useEffect } from 'react';
import { FaLink, FaUnlink, FaSearch, FaUser, FaUserGraduate, FaUserTie, FaUserShield, FaPhone, FaEnvelope } from 'react-icons/fa';

const ParentLinking = () => {
  // Mock data - replace with API calls
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Sharma', admissionNo: 'S001', class: '10', section: 'A' },
    { id: 2, name: 'Priya Patel', admissionNo: 'S002', class: '9', section: 'B' },
    // Add more mock data as needed
  ]);

  const [parents, setParents] = useState([
    { 
      id: 1, 
      name: 'Rajesh Sharma', 
      email: 'rajesh@example.com', 
      phone: '9876543210',
      type: 'father',
      occupation: 'Engineer',
      linkedStudents: [1] // Linked student IDs
    },
    { 
      id: 2, 
      name: 'Sunita Sharma', 
      email: 'sunita@example.com', 
      phone: '9876543211',
      type: 'mother',
      occupation: 'Teacher',
      linkedStudents: [1] // Linked student IDs
    },
    // Add more mock data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [linkMode, setLinkMode] = useState(false);
  const [newParent, setNewParent] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'father',
    occupation: ''
  });

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get parents for selected student
  const getLinkedParents = (studentId) => {
    if (!studentId) return [];
    return parents.filter(parent => 
      parent.linkedStudents.includes(studentId)
    );
  };

  // Get students for selected parent
  const getLinkedStudents = (parentId) => {
    if (!parentId) return [];
    const parent = parents.find(p => p.id === parentId);
    if (!parent) return [];
    return students.filter(student => 
      parent.linkedStudents.includes(student.id)
    );
  };

  // Handle linking student to parent
  const handleLink = (studentId, parentId) => {
    setParents(parents.map(parent => {
      if (parent.id === parentId) {
        return {
          ...parent,
          linkedStudents: [...new Set([...parent.linkedStudents, studentId])]
        };
      }
      return parent;
    }));
  };

  // Handle unlinking student from parent
  const handleUnlink = (studentId, parentId) => {
    setParents(parents.map(parent => {
      if (parent.id === parentId) {
        return {
          ...parent,
          linkedStudents: parent.linkedStudents.filter(id => id !== studentId)
        };
      }
      return parent;
    }));
  };

  // Handle adding new parent
  const handleAddParent = (e) => {
    e.preventDefault();
    const newParentObj = {
      ...newParent,
      id: parents.length + 1,
      linkedStudents: selectedStudent ? [selectedStudent.id] : []
    };
    
    setParents([...parents, newParentObj]);
    setNewParent({
      name: '',
      email: '',
      phone: '',
      type: 'father',
      occupation: ''
    });
    
    if (selectedStudent) {
      setSelectedParent(newParentObj.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Parent-Student Linking</h1>
          
          {/* Search and Select Student */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search students by name or admission number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setLinkMode(!linkMode)}
                className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${linkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {linkMode ? (
                  <>
                    <FaUnlink className="mr-2" /> Cancel Linking
                  </>
                ) : (
                  <>
                    <FaLink className="mr-2" /> Link Parent
                  </>
                )}
              </button>
            </div>

            {/* Student List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <FaUserGraduate className="mr-2" /> Students
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredStudents.map(student => (
                    <div 
                      key={student.id}
                      className={`p-3 rounded-md cursor-pointer ${selectedStudent?.id === student.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.class}-{student.section} | {student.admissionNo}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent List */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <FaUserTie className="mr-2" /> Parents
                </h3>
                
                {/* Add New Parent Form */}
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Add New Parent</h4>
                  <form onSubmit={handleAddParent} className="space-y-2">
                    <div>
                      <select
                        value={newParent.type}
                        onChange={(e) => setNewParent({...newParent, type: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="guardian">Guardian</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={newParent.name}
                        onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        placeholder="Email"
                        value={newParent.email}
                        onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={newParent.phone}
                        onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Occupation (Optional)"
                        value={newParent.occupation}
                        onChange={(e) => setNewParent({...newParent, occupation: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add Parent
                    </button>
                  </form>
                </div>

                {/* Parents List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {parents.map(parent => (
                    <div 
                      key={parent.id}
                      className={`p-3 rounded-md cursor-pointer ${selectedParent === parent.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
                      onClick={() => setSelectedParent(parent.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900 capitalize">{parent.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="capitalize">{parent.type}</span>
                            {parent.occupation && <span className="mx-1">•</span>}
                            <span>{parent.occupation}</span>
                          </div>
                        </div>
                        {selectedStudent && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (parent.linkedStudents.includes(selectedStudent.id)) {
                                handleUnlink(selectedStudent.id, parent.id);
                              } else {
                                handleLink(selectedStudent.id, parent.id);
                              }
                            }}
                            className={`p-1 rounded-full ${parent.linkedStudents.includes(selectedStudent.id) ? 'text-red-600 hover:bg-red-50' : 'text-blue-600 hover:bg-blue-50'}`}
                            title={parent.linkedStudents.includes(selectedStudent.id) ? 'Unlink from student' : 'Link to student'}
                          >
                            {parent.linkedStudents.includes(selectedStudent.id) ? <FaUnlink /> : <FaLink />}
                          </button>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 flex items-center">
                        <FaPhone className="mr-1" /> {parent.phone} • <FaEnvelope className="ml-2 mr-1" /> {parent.email}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Students/Details */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <FaUserShield className="mr-2" />
                  {selectedParent ? 'Linked Students' : 'Details'}
                </h3>
                
                {selectedParent ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {getLinkedStudents(selectedParent).length > 0 ? (
                      getLinkedStudents(selectedParent).map(student => (
                        <div key={student.id} className="p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.class}-{student.section} | {student.admissionNo}</div>
                            </div>
                            <button
                              onClick={() => handleUnlink(student.id, selectedParent)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                              title="Unlink from parent"
                            >
                              <FaUnlink />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No students linked to this parent
                      </div>
                    )}
                  </div>
                ) : selectedStudent ? (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <FaUserGraduate className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900">{selectedStudent.name}</h4>
                      <p className="text-sm text-gray-500">{selectedStudent.class}-{selectedStudent.section} | {selectedStudent.admissionNo}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Linked Parents</h4>
                      {getLinkedParents(selectedStudent.id).length > 0 ? (
                        <div className="space-y-2">
                          {getLinkedParents(selectedStudent.id).map(parent => (
                            <div key={parent.id} className="p-2 bg-gray-50 rounded-md">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium text-gray-900 capitalize">{parent.name}</div>
                                  <div className="text-xs text-gray-500">{parent.type} • {parent.occupation || 'No occupation'}</div>
                                </div>
                                <button
                                  onClick={() => handleUnlink(selectedStudent.id, parent.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                                  title="Unlink parent"
                                >
                                  <FaUnlink />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No parents linked to this student
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaUser className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2">Select a student or parent to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLinking;
