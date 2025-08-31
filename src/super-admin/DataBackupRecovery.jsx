import React from 'react';

const DataBackupRecovery = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Data Backup & Recovery</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Backup Database</h2>
        <p className="text-gray-600 mb-4">
          Create a backup of the entire database. This will include all school data, user accounts, and settings.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Create Backup Now
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Restore Database</h2>
        <p className="text-gray-600 mb-4">
          Restore the database from a previous backup. This will overwrite all current data.
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="backupFile">
            Select Backup File
          </label>
          <input
            type="file"
            id="backupFile"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            accept=".sql,.backup"
          />
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          Restore Backup
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Backup History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">File Name</th>
                <th className="py-2 px-4 text-left">Size</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">2023-08-31 11:30 AM</td>
                <td className="py-2 px-4">backup_20230831_1130.sql</td>
                <td className="py-2 px-4">45.2 MB</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-3">Download</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">2023-08-30 11:30 AM</td>
                <td className="py-2 px-4">backup_20230830_1130.sql</td>
                <td className="py-2 px-4">44.8 MB</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-3">Download</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataBackupRecovery;
