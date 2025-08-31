    import React, { useState } from 'react';

const SMSMessaging = () => {
  const [formData, setFormData] = useState({
    recipientType: 'all',
    recipient: '',
    message: '',
    schedule: false,
    scheduleDate: '',
    scheduleTime: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SMS Data:', formData);
    // Here you would typically make an API call to send the SMS
    alert('SMS sent successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">SMS Messaging</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Compose Message</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientType">
              Send To
            </label>
            <select
              id="recipientType"
              name="recipientType"
              value={formData.recipientType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Users</option>
              <option value="teachers">Teachers Only</option>
              <option value="students">Students Only</option>
              <option value="parents">Parents Only</option>
              <option value="specific">Specific Number</option>
            </select>
          </div>

          {formData.recipientType === 'specific' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                Phone Number
              </label>
              <input
                type="tel"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Enter phone number with country code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Type your message here..."
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Characters: {formData.message.length} (Max: 160)
            </p>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="schedule"
                checked={formData.schedule}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Schedule for later</span>
            </label>
          </div>

          {formData.schedule && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduleDate">
                  Date
                </label>
                <input
                  type="date"
                  id="scheduleDate"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduleTime">
                  Time
                </label>
                <input
                  type="time"
                  id="scheduleTime"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setFormData({
                recipientType: 'all',
                recipient: '',
                message: '',
                schedule: false,
                scheduleDate: '',
                scheduleTime: ''
              })}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {formData.schedule ? 'Schedule SMS' : 'Send SMS Now'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">SMS History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Date/Time</th>
                <th className="py-2 px-4 text-left">Recipient</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">2023-08-31 11:30 AM</td>
                <td className="py-2 px-4">All Teachers</td>
                <td className="py-2 px-4">Staff meeting tomorrow at 10 AM in the conference room.</td>
                <td className="py-2 px-4 text-green-600">Delivered</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">2023-08-30 02:15 PM</td>
                <td className="py-2 px-4">+1234567890</td>
                <td className="py-2 px-4">Your child was marked present today.</td>
                <td className="py-2 px-4 text-green-600">Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SMSMessaging;
