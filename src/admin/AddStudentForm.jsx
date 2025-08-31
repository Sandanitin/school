import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserGraduate, FaUser, FaPhone, FaCalendarAlt, FaSchool, FaMapMarkerAlt } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const classOptions = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sectionOptions = ['A', 'B', 'C', 'D'];
const genderOptions = ['Male', 'Female', 'Other'];

const schema = yup.object().shape({
  admissionNo: yup.string().required('Required'),
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  gender: yup.string().required('Required'),
  dob: yup.date().required('Required'),
  class: yup.string().required('Required'),
  section: yup.string().required('Required'),
  fatherName: yup.string().required('Required'),
  motherName: yup.string().required('Required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
  address: yup.string().required('Required'),
});

const AddStudentForm = ({ onSubmit, onCancel, initialData = {}, isEditing = false }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initialData,
      dob: initialData.dob ? new Date(initialData.dob) : null,
    }
  });

  const handleDateChange = (date, field) => {
    setValue(field, date, { shouldValidate: true });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-lg font-medium text-gray-900">
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 flex items-center">
              <FaUserGraduate className="mr-2" /> Personal Details
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Admission No *</label>
              <input
                type="text"
                {...register('admissionNo')}
                className={`mt-1 block w-full rounded-md ${errors.admissionNo ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                disabled={isEditing}
              />
              {errors.admissionNo && <p className="mt-1 text-sm text-red-600">{errors.admissionNo.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  type="text"
                  {...register('firstName')}
                  className={`mt-1 block w-full rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  type="text"
                  {...register('lastName')}
                  className={`mt-1 block w-full rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                <select
                  {...register('gender')}
                  className={`mt-1 block w-full rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <DatePicker
                  selected={watch('dob')}
                  onChange={(date) => handleDateChange(date, 'dob')}
                  className={`mt-1 block w-full rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                />
                {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 flex items-center">
              <FaSchool className="mr-2" /> Academic Details
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class *</label>
                <select
                  {...register('class')}
                  className={`mt-1 block w-full rounded-md ${errors.class ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                >
                  <option value="">Select Class</option>
                  {classOptions.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Section *</label>
                <select
                  {...register('section')}
                  className={`mt-1 block w-full rounded-md ${errors.section ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                >
                  <option value="">Select Section</option>
                  {sectionOptions.map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
                {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section.message}</p>}
              </div>
            </div>
          </div>

          {/* Parent/Guardian Details */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 flex items-center">
              <FaUser className="mr-2" /> Parent Details
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Name *</label>
              <input
                type="text"
                {...register('fatherName')}
                className={`mt-1 block w-full rounded-md ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
              />
              {errors.fatherName && <p className="mt-1 text-sm text-red-600">{errors.fatherName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Mother's Name *</label>
              <input
                type="text"
                {...register('motherName')}
                className={`mt-1 block w-full rounded-md ${errors.motherName ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
              />
              {errors.motherName && <p className="mt-1 text-sm text-red-600">{errors.motherName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  {...register('phone')}
                  className={`block w-full pl-10 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="1234567890"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Contact Information
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address *</label>
              <textarea
                rows={3}
                {...register('address')}
                className={`mt-1 block w-full rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
