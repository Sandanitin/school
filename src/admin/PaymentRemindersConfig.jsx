import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaEdit, FaBell, FaPaperPlane, FaInfoCircle } from 'react-icons/fa';

const PaymentRemindersConfig = () => {
  // Mock data - replace with API calls
  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: 'Before Due Date',
      triggerType: 'before_due',
      days: 3,
      channels: ['email', 'sms'],
      isActive: true,
      template: 'Friendly reminder: Your payment of {amount} for {feeType} is due in {days} days on {dueDate}.'
    },
    {
      id: 2,
      name: 'On Due Date',
      triggerType: 'on_due',
      days: 0,
      channels: ['email', 'sms', 'app_notification'],
      isActive: true,
      template: 'Reminder: Payment of {amount} for {feeType} is due today. Please make the payment to avoid late fees.'
    },
    {
      id: 3,
      name: 'After Due Date',
      triggerType: 'after_due',
      days: 2,
      channels: ['email', 'sms'],
      isActive: true,
      template: 'Urgent: Your payment of {amount} for {feeType} is {days} days overdue. Please make the payment immediately.'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState({
    id: null,
    name: '',
    triggerType: 'before_due',
    days: 1,
    channels: [],
    isActive: true,
    template: ''
  });
  const [errors, setErrors] = useState({});
  const [isSendingTest, setIsSendingTest] = useState(false);

  const triggerTypes = [
    { value: 'before_due', label: 'Before Due Date' },
    { value: 'on_due', label: 'On Due Date' },
    { value: 'after_due', label: 'After Due Date' },
    { value: 'custom', label: 'Custom Date' }
  ];

  const channels = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'app_notification', label: 'In-App Notification' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const templateVariables = [
    { name: '{studentName}', description: 'Student\'s full name' },
    { name: '{className}', description: 'Class name' },
    { name: '{section}', description: 'Section' },
    { name: '{feeType}', description: 'Type of fee' },
    { name: '{amount}', description: 'Amount due' },
    { name: '{dueDate}', description: 'Due date' },
    { name: '{days}', description: 'Number of days before/after due date' },
    { name: '{invoiceNumber}', description: 'Invoice number' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentReminder.name.trim()) {
      newErrors.name = 'Reminder name is required';
    }
    
    if (currentReminder.triggerType === 'custom' && !currentReminder.days) {
      newErrors.days = 'Number of days is required';
    } else if (currentReminder.days < 0) {
      newErrors.days = 'Days cannot be negative';
    }
    
    if (currentReminder.channels.length === 0) {
      newErrors.channels = 'At least one notification channel is required';
    }
    
    if (!currentReminder.template.trim()) {
      newErrors.template = 'Message template is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentReminder({
      ...currentReminder,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleChannelChange = (channel) => {
    const newChannels = [...currentReminder.channels];
    const channelIndex = newChannels.indexOf(channel);
    
    if (channelIndex === -1) {
      newChannels.push(channel);
    } else {
      newChannels.splice(channelIndex, 1);
    }
    
    setCurrentReminder({
      ...currentReminder,
      channels: newChannels
    });
    
    if (errors.channels) {
      setErrors({
        ...errors,
        channels: null
      });
    }
  };

  const handleAddNew = () => {
    setCurrentReminder({
      id: null,
      name: '',
      triggerType: 'before_due',
      days: 1,
      channels: ['email', 'sms'],
      isActive: true,
      template: ''
    });
    setErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (reminder) => {
    setCurrentReminder({ ...reminder });
    setErrors({});
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (currentReminder.id) {
      // Update existing reminder
      setReminders(reminders.map(r => 
        r.id === currentReminder.id ? { ...currentReminder } : r
      ));
    } else {
      // Add new reminder
      const newReminder = {
        ...currentReminder,
        id: Date.now() // Generate temporary ID
      };
      setReminders([...reminders, newReminder]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder configuration? This action cannot be undone.')) {
      setReminders(reminders.filter(r => r.id !== id));
    }
  };

  const toggleReminderStatus = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isActive: !reminder.isActive } 
        : reminder
    ));
  };

  const handleSendTest = () => {
    setIsSendingTest(true);
    // Simulate API call
    setTimeout(() => {
      setIsSendingTest(false);
      alert('Test notification sent successfully!');
    }, 1500);
  };

  const insertVariable = (variable) => {
    const textarea = document.getElementById('template');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentReminder.template;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    setCurrentReminder({
      ...currentReminder,
      template: before + variable + after
    });
    
    // Set cursor position after inserted variable
    setTimeout(() => {
      textarea.selectionStart = start + variable.length;
      textarea.selectionEnd = start + variable.length;
      textarea.focus();
    }, 0);
  };

  const getTriggerLabel = (triggerType, days) => {
    const type = triggerTypes.find(t => t.value === triggerType);
    if (!type) return '';
    
    if (triggerType === 'on_due') return 'On due date';
    if (triggerType === 'before_due') return `${days} day${days !== 1 ? 's' : ''} before due`;
    if (triggerType === 'after_due') return `${days} day${days !== 1 ? 's' : ''} after due`;
    return type.label;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Payment Reminders</h1>
              <p className="mt-1 text-sm text-gray-500">
                Configure automatic payment reminders for fee collections
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" /> Add Reminder
            </button>
          </div>
          
          {/* Reminders List */}
          <div className="space-y-4">
            {reminders.length > 0 ? (
              reminders.map((reminder) => (
                <div key={reminder.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${reminder.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        <FaBell className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{reminder.name}</h3>
                        <p className="text-sm text-gray-500">
                          {getTriggerLabel(reminder.triggerType, reminder.days)}
                          {' • '}
                          {reminder.channels.map(ch => 
                            channels.find(c => c.value === ch)?.label
                          ).join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleReminderStatus(reminder.id)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          reminder.isActive 
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {reminder.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleEdit(reminder)}
                        className="p-2 text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="p-2 text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <p className="text-sm text-gray-700 font-medium">Message Template:</p>
                    <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {reminder.template}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <FaBell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No payment reminders configured</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new payment reminder.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleAddNew}
                  >
                    <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                    New Reminder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add/Edit Reminder Modal */}
      {isFormOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentReminder.id ? 'Edit Payment Reminder' : 'Add New Payment Reminder'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Reminder Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={currentReminder.name}
                              onChange={handleInputChange}
                              placeholder="e.g. First Reminder"
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <label htmlFor="triggerType" className="block text-sm font-medium text-gray-700">
                              When to Send <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="triggerType"
                              name="triggerType"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={currentReminder.triggerType}
                              onChange={handleInputChange}
                            >
                              {triggerTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {(currentReminder.triggerType === 'before_due' || 
                            currentReminder.triggerType === 'after_due' ||
                            currentReminder.triggerType === 'custom') && (
                            <div className="mb-4">
                              <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                                Number of Days <span className="text-red-500">*</span>
                                <span className="ml-1 text-xs text-gray-500">
                                  ({currentReminder.triggerType === 'before_due' ? 'before' : currentReminder.triggerType === 'after_due' ? 'after' : 'from today'})
                                </span>
                              </label>
                              <input
                                type="number"
                                id="days"
                                name="days"
                                min="0"
                                className={`mt-1 block w-full border ${errors.days ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                value={currentReminder.days}
                                onChange={handleInputChange}
                              />
                              {errors.days && (
                                <p className="mt-1 text-sm text-red-600">{errors.days}</p>
                              )}
                            </div>
                          )}
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Notification Channels <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                              {channels.map(channel => (
                                <div key={channel.value} className="flex items-center">
                                  <input
                                    id={`channel-${channel.value}`}
                                    name="channels"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={currentReminder.channels.includes(channel.value)}
                                    onChange={() => handleChannelChange(channel.value)}
                                  />
                                  <label htmlFor={`channel-${channel.value}`} className="ml-2 block text-sm text-gray-700">
                                    {channel.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {errors.channels && (
                              <p className="mt-1 text-sm text-red-600">{errors.channels}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-2">
                            <div className="flex justify-between items-center">
                              <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                                Message Template <span className="text-red-500">*</span>
                              </label>
                              <button
                                type="button"
                                onClick={handleSendTest}
                                disabled={isSendingTest}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                              >
                                {isSendingTest ? (
                                  'Sending...'
                                ) : (
                                  <>
                                    <FaPaperPlane className="mr-1 h-3 w-3" /> Send Test
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 mb-2">
                              Customize the message that will be sent to parents/students.
                            </p>
                            <textarea
                              id="template"
                              name="template"
                              rows="8"
                              className={`block w-full border ${errors.template ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={currentReminder.template}
                              onChange={handleInputChange}
                              placeholder="e.g. Dear {parentName}, this is a reminder that a payment of {amount} for {feeType} is due on {dueDate}."
                            />
                            {errors.template && (
                              <p className="mt-1 text-sm text-red-600">{errors.template}</p>
                            )}
                          </div>
                          
                          <div className="mt-4 p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <FaInfoCircle className="mr-1 h-4 w-4 text-blue-500" />
                              Available Variables
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {templateVariables.map((variable) => (
                                <button
                                  key={variable.name}
                                  type="button"
                                  onClick={() => insertVariable(variable.name)}
                                  className="text-left p-1.5 hover:bg-blue-50 rounded text-blue-600 hover:text-blue-800"
                                  title={variable.description}
                                >
                                  {variable.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <div className="flex items-center">
                          <input
                            id="isActive"
                            name="isActive"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={currentReminder.isActive}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:col-start-2 space-x-3 flex justify-end">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setIsFormOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            <FaSave className="mr-2" />
                            {currentReminder.id ? 'Update Reminder' : 'Save Reminder'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentRemindersConfig;
