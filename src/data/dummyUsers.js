export const dummyUsers = {
  superAdmin: {
    id: 'sa001',
    name: 'John Super Admin',
    email: 'superadmin@school.edu',
    password: 'superadmin123',
    role: 'super_admin',
    phone: '+1234567890',
    address: '123 Admin St, Admin City',
    createdAt: '2023-01-01',
    lastLogin: '2023-10-28T10:30:00Z',
    isActive: true
  },
  admins: [
    {
      id: 'adm001',
      name: 'Sarah Johnson',
      email: 'admin1@school.edu',
      password: 'admin123',
      role: 'admin',
      phone: '+1987654321',
      department: 'Administration',
      createdAt: '2023-02-15',
      lastLogin: '2023-10-28T09:15:00Z',
      isActive: true
    },
    {
      id: 'adm002',
      name: 'Michael Chen',
      email: 'admin2@school.edu',
      password: 'admin456',
      role: 'admin',
      phone: '+1555123456',
      department: 'Academics',
      createdAt: '2023-03-10',
      lastLogin: '2023-10-27T14:20:00Z',
      isActive: true
    }
  ],
  teachers: [
    {
      id: 't001',
      name: 'Dr. Emily Wilson',
      email: 'emily.wilson@school.edu',
      password: 'teacher123',
      role: 'teacher',
      phone: '+1555987654',
      subject: 'Mathematics',
      qualification: 'PhD in Mathematics',
      joiningDate: '2022-08-15',
      address: '456 Teacher Lane, Education City',
      isActive: true,
      classes: ['10A', '11B']
    },
    {
      id: 't002',
      name: 'Prof. Robert Taylor',
      email: 'robert.taylor@school.edu',
      password: 'teacher456',
      role: 'teacher',
      phone: '+1555123457',
      subject: 'Physics',
      qualification: 'MSc Physics',
      joiningDate: '2023-01-10',
      address: '789 Science St, Education City',
      isActive: true,
      classes: ['9A', '12C']
    },
    {
      id: 't003',
      name: 'Ms. Jennifer Lee',
      email: 'jennifer.lee@school.edu',
      password: 'teacher789',
      role: 'teacher',
      phone: '+1555123458',
      subject: 'English Literature',
      qualification: 'MA English',
      joiningDate: '2022-11-05',
      address: '321 Language Ave, Education City',
      isActive: true,
      classes: ['8B', '9C', '11A']
    }
  ],
  students: [
    {
      id: 's001',
      name: 'Alex Johnson',
      email: 'alex.johnson@student.school.edu',
      password: 'student123',
      role: 'student',
      phone: '+1555123001',
      class: '10A',
      rollNumber: '10A-001',
      dob: '2010-05-15',
      parentName: 'David Johnson',
      parentPhone: '+1555123002',
      address: '100 Student Rd, Education City',
      admissionDate: '2022-06-01',
      isActive: true
    },
    {
      id: 's002',
      name: 'Maria Garcia',
      email: 'maria.garcia@student.school.edu',
      password: 'student456',
      role: 'student',
      phone: '+1555123003',
      class: '11B',
      rollNumber: '11B-015',
      dob: '2009-08-22',
      parentName: 'Carlos Garcia',
      parentPhone: '+1555123004',
      address: '202 Scholar St, Education City',
      admissionDate: '2021-07-15',
      isActive: true
    },
    {
      id: 's003',
      name: 'James Smith',
      email: 'james.smith@student.school.edu',
      password: 'student789',
      role: 'student',
      phone: '+1555123005',
      class: '9C',
      rollNumber: '09C-020',
      dob: '2011-03-10',
      parentName: 'Sarah Smith',
      parentPhone: '+1555123006',
      address: '305 Learning Ave, Education City',
      admissionDate: '2023-06-20',
      isActive: true
    },
    {
      id: 's004',
      name: 'Priya Patel',
      email: 'priya.patel@student.school.edu',
      password: 'student012',
      role: 'student',
      phone: '+1555123007',
      class: '12A',
      rollNumber: '12A-005',
      dob: '2008-11-30',
      parentName: 'Raj Patel',
      parentPhone: '+1555123008',
      address: '408 Knowledge St, Education City',
      admissionDate: '2020-04-12',
      isActive: true
    }
  ]
};

export const loginCredentials = {
  superAdmin: {
    email: 'superadmin@school.edu',
    password: 'superadmin123',
    role: 'super_admin'
  },
  admin: {
    email: 'admin1@school.edu',
    password: 'admin123',
    role: 'admin'
  },
  teacher: {
    email: 'emily.wilson@school.edu',
    password: 'teacher123',
    role: 'teacher'
  },
  student: {
    email: 'alex.johnson@student.school.edu',
    password: 'student123',
    role: 'student'
  }
};

export const allUsers = [
  dummyUsers.superAdmin,
  ...dummyUsers.admins,
  ...dummyUsers.teachers,
  ...dummyUsers.students
].map(user => ({
  ...user,
  role: user.role.toLowerCase()
}));
