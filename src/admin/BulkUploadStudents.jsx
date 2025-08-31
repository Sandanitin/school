import React, { useState, useCallback } from 'react';
import { FaFileCsv, FaTimes, FaCheck, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import Papa from 'papaparse';

const BulkUploadStudents = ({ onSuccess, onCancel }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    isValid: false,
    errors: [],
    data: []
  });
  const [step, setStep] = useState(1); // 1: Upload, 2: Preview, 3: Results
  const [uploadResults, setUploadResults] = useState({
    success: 0,
    failed: 0,
    errors: []
  });

  const requiredFields = [
    'admissionNo',
    'name',
    'class',
    'section',
    'gender',
    'dob',
    'fatherName',
    'motherName',
    'phone'
  ];

  const validateData = (data) => {
    const errors = [];
    const validatedData = [];
    
    data.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because of header row and 0-based index
      const rowErrors = [];
      const newRow = {};
      
      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field]) {
          rowErrors.push(`Row ${rowNumber}: ${field} is required`);
        } else {
          newRow[field] = row[field];
        }
      });

      // Additional validations
      if (row.phone && !/^\d{10}$/.test(row.phone)) {
        rowErrors.push(`Row ${rowNumber}: Invalid phone number format (must be 10 digits)`);
      }
      
      if (row.dob) {
        const dob = new Date(row.dob);
        if (isNaN(dob.getTime())) {
          rowErrors.push(`Row ${rowNumber}: Invalid date format (use YYYY-MM-DD)`);
        } else {
          newRow.dob = dob.toISOString().split('T')[0]; // Format date
        }
      }

      if (row.gender && !['Male', 'Female', 'Other'].includes(row.gender)) {
        rowErrors.push(`Row ${rowNumber}: Gender must be Male, Female, or Other`);
      }

      if (rowErrors.length === 0) {
        validatedData.push(newRow);
      } else {
        errors.push(...rowErrors);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      data: validatedData
    };
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      processFile(droppedFile);
    }
  };

  const processFile = (file) => {
    setFile(file);
    setIsLoading(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validationResult = validateData(results.data);
        setValidation(validationResult);
        setIsLoading(false);
        if (validationResult.isValid) {
          setStep(2); // Move to preview
        }
      },
      error: (error) => {
        setValidation({
          isValid: false,
          errors: [`Error parsing CSV: ${error.message}`],
          data: []
        });
        setIsLoading(false);
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const successCount = validation.data.length;
      const failedCount = validation.errors.length;
      
      setUploadResults({
        success: successCount,
        failed: failedCount,
        errors: validation.errors
      });
      
      setStep(3);
      setIsLoading(false);
      
      // If there were successful uploads, call onSuccess with the data
      if (successCount > 0) {
        onSuccess(validation.data);
      }
    }, 1500);
  };

  const renderStep1 = () => (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <FaFileCsv size={24} />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Upload CSV File</h3>
          <p className="text-sm text-gray-500">
            Drag and drop your CSV file here, or click to browse
          </p>
        </div>
        <div className="mt-2">
          <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Select File
            <input
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">
          Download the <a href="/templates/student_import_template.csv" className="text-blue-600 hover:underline" download>CSV template</a> for reference
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaCheck className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              File "{file.name}" is ready to import. Found {validation.data.length} valid records.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admission No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class & Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {validation.data.slice(0, 5).map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.admissionNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.class}{student.section ? `-${student.section}` : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.gender}
                </td>
              </tr>
            ))}
            {validation.data.length > 5 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  ... and {validation.data.length - 5} more records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {validation.errors.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Found {validation.errors.length} validation issues in your file. These records will be skipped.
              </p>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1 max-h-32 overflow-y-auto">
                  {validation.errors.slice(0, 5).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                  {validation.errors.length > 5 && (
                    <li>... and {validation.errors.length - 5} more issues</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Importing...
            </>
          ) : (
            `Import ${validation.data.length} Students`
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <FaCheck className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        Import {uploadResults.success > 0 ? 'Completed' : 'Completed with Errors'}
      </h3>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Successfully imported <span className="font-medium text-green-600">{uploadResults.success}</span> students.
        </p>
        {uploadResults.failed > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-yellow-600">{uploadResults.failed} records</span> were not imported due to errors.
          </p>
        )}
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Bulk Import Students</h2>
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            step >= 1 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            1. Upload
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            step >= 2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            2. Review
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            step >= 3 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            3. Complete
          </span>
        </div>
      </div>

      <div className="mt-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default BulkUploadStudents;
