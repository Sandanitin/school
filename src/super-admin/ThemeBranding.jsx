import React, { useState, useEffect } from 'react';
import { FaPalette, FaUndo, FaUpload, FaSave, FaCheck, FaFont, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ChromePicker } from 'react-color';

// Default theme configuration
const defaultTheme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    light: '#F9FAFB',
    dark: '#1F2937',
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSizeBase: '16px',
  },
  branding: {
    logo: null,
    favicon: null,
    appName: 'School Admin',
  },
  layout: {
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
};

const ThemeBranding = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });
  const [activeTab, setActiveTab] = useState('colors');
  const [colorPicker, setColorPicker] = useState({
    open: false,
    target: null,
    color: '#000000',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Apply theme to document
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (themeData) => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(themeData.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply typography
    root.style.setProperty('--font-sans', themeData.typography.fontFamily);
    root.style.setProperty('--text-base', themeData.typography.fontSizeBase);

    // Apply layout
    root.style.setProperty('--border-radius', themeData.layout.borderRadius);
    root.style.setProperty('--shadow', themeData.layout.boxShadow);
  };

  const handleColorChange = (color, key) => {
    setTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: color.hex }
    }));
  };

  const handleInputChange = (e, section, key) => {
    setTheme(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: e.target.value }
    }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTheme(prev => ({
        ...prev,
        branding: { ...prev.branding, [type]: reader.result }
      }));
    };
    reader.readAsDataURL(file);
  };

  const resetToDefault = () => {
    if (window.confirm('Reset to default theme?')) {
      setTheme(defaultTheme);
      localStorage.removeItem('appTheme');
      toast.success('Theme reset to default');
    }
  };

  const saveTheme = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('appTheme', JSON.stringify(theme));
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Theme saved successfully!');
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  // Color presets
  const colorPresets = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Emerald', value: '#10B981' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Theme & Branding</h1>
            <p className="text-sm text-gray-500 mt-1">Customize the look and feel</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={resetToDefault}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
            >
              <FaUndo size={14} />
              <span>Reset</span>
            </button>
            <button
              onClick={saveTheme}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 flex items-center space-x-2"
            >
              {isSaving ? 'Saving...' : (
                <>
                  <FaSave size={14} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
          <nav className="flex md:flex-col">
            <button
              onClick={() => setActiveTab('colors')}
              className={`p-4 text-left flex items-center space-x-2 w-full ${
                activeTab === 'colors' ? 'bg-white text-blue-600 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaPalette size={14} />
              <span>Colors</span>
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`p-4 text-left flex items-center space-x-2 w-full ${
                activeTab === 'typography' ? 'bg-white text-blue-600 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaFont size={14} />
              <span>Typography</span>
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`p-4 text-left flex items-center space-x-2 w-full ${
                activeTab === 'branding' ? 'bg-white text-blue-600 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaImage size={14} />
              <span>Branding</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Color Palette</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(theme.colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key}
                        </label>
                        <span className="text-xs text-gray-500">{value}</span>
                      </div>
                      <div 
                        className="w-full h-10 rounded-md cursor-pointer border border-gray-200"
                        style={{ backgroundColor: value }}
                        onClick={() => setColorPicker({
                          open: true,
                          target: key,
                          color: value
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Presets</h3>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.value}
                      className="w-8 h-8 rounded-full border-2 border-transparent hover:border-gray-300"
                      style={{ backgroundColor: preset.value }}
                      onClick={() => {
                        setTheme(prev => ({
                          ...prev,
                          colors: { ...prev.colors, primary: preset.value }
                        }));
                      }}
                      title={preset.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select
                  value={theme.typography.fontFamily}
                  onChange={(e) => handleInputChange(e, 'typography', 'fontFamily')}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Inter, system-ui, -apple-system, sans-serif">Inter</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Font Size
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={parseInt(theme.typography.fontSizeBase) || 16}
                    onChange={(e) => handleInputChange({
                      target: { value: `${e.target.value}px` }
                    }, 'typography', 'fontSizeBase')}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500 w-12">
                    {parseInt(theme.typography.fontSizeBase) || 16}px
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Name
                </label>
                <input
                  type="text"
                  value={theme.branding.appName}
                  onChange={(e) => handleInputChange(e, 'branding', 'appName')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                    {theme.branding.logo ? (
                      <img 
                        src={theme.branding.logo} 
                        alt="Logo Preview" 
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <FaImage className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer">
                      <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center">
                        <FaUpload className="mr-2" />
                        Upload Logo
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'logo')}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Color Picker Modal */}
      {colorPicker.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <ChromePicker
              color={colorPicker.color}
              onChangeComplete={(color) => handleColorChange(color, colorPicker.target)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setColorPicker({ ...colorPicker, open: false })}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeBranding;
