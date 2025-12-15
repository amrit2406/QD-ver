import React, { useState } from 'react';
import { Settings, Check, X, ExternalLink, AlertCircle, Link } from 'lucide-react';
import { googleSheetsAPI } from '../services/googleSheetsAPI';

const GoogleSheetsConfig = ({ onClose }) => {
  const [scriptUrl, setScriptUrl] = useState(
    localStorage.getItem('googleScriptUrl') || ''
  );
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSave = () => {
    googleSheetsAPI.setScriptUrl(scriptUrl);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 2000);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      googleSheetsAPI.setScriptUrl(scriptUrl);
      const docs = await googleSheetsAPI.getDocuments('quotation');
      setTestResult({ success: true, message: `Connected successfully! Found ${docs.length} quotations.` });
    } catch (error) {
      setTestResult({ success: false, message: `Connection failed: ${error.message}` });
    }
    
    setTesting(false);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear Google Sheets configuration?')) {
      setScriptUrl('');
      localStorage.removeItem('googleScriptUrl');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Settings className="text-indigo-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Google Sheets Configuration</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Status Banner */}
        <div className={`border-l-4 p-4 mb-6 ${
          googleSheetsAPI.isConfigured() 
            ? 'bg-green-50 border-green-400' 
            : 'bg-yellow-50 border-yellow-400'
        }`}>
          <div className="flex">
            <AlertCircle className={googleSheetsAPI.isConfigured() ? 'text-green-400' : 'text-yellow-400'} size={24} />
            <div className="ml-3">
              <p className="text-sm font-semibold">
                {googleSheetsAPI.isConfigured() 
                  ? '✓ Google Sheets Connected' 
                  : 'Using localStorage (Offline Mode)'}
              </p>
              <p className="text-sm mt-1">
                {googleSheetsAPI.isConfigured()
                  ? 'Your documents are syncing with Google Sheets.'
                  : 'Configure Google Sheets to enable cloud synchronization.'}
              </p>
            </div>
          </div>
        </div>

        {/* Script URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Link className="inline mr-2" size={16} />
            Google Apps Script Web App URL
          </label>
          <input
            type="text"
            value={scriptUrl}
            onChange={(e) => setScriptUrl(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition font-mono text-sm"
            placeholder="https://script.google.com/macros/s/AKfycby.../exec"
          />
          <p className="text-xs text-gray-500 mt-1">
            Paste your Google Apps Script Web App URL here
          </p>
        </div>

        {/* Test Connection */}
        {testResult && (
          <div className={`p-4 rounded-lg mb-6 ${
            testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {testResult.message}
            </p>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <ExternalLink size={18} />
            Setup Instructions (No Google Cloud Needed!)
          </h3>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>
              Open{' '}
              <a 
                href="https://sheets.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline font-semibold hover:text-blue-900"
              >
                Google Sheets
              </a>
              {' '}and create a new spreadsheet
            </li>
            <li>Name it "Business Documents Database"</li>
            <li>Go to <strong>Extensions → Apps Script</strong></li>
            <li>Delete any default code and paste the provided script</li>
            <li>Click <strong>Deploy → New deployment</strong></li>
            <li>Choose <strong>Web app</strong> as type</li>
            <li>Set "Execute as" to <strong>Me</strong></li>
            <li>Set "Who has access" to <strong>Anyone</strong></li>
            <li>Click <strong>Deploy</strong> and copy the Web App URL</li>
            <li>Paste the URL above and click "Test Connection"</li>
          </ol>
        </div>

        {/* Video Tutorial Link */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-900 mb-2">Need Help?</h3>
          <p className="text-sm text-purple-800">
            Watch a step-by-step video tutorial on how to set up Google Apps Script Web App.
          </p>
          <a 
            href="https://www.youtube.com/results?search_query=google+apps+script+web+app+tutorial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-purple-600 underline hover:text-purple-800 mt-2 inline-block"
          >
            Search YouTube Tutorials →
          </a>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleTest}
            disabled={!scriptUrl || testing}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {testing ? 'Testing...' : 'Test Connection'}
          </button>
          
          <button
            onClick={handleSave}
            disabled={!scriptUrl || saved}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center gap-2 disabled:bg-indigo-400"
          >
            {saved ? (
              <>
                <Check size={20} />
                Saved!
              </>
            ) : (
              'Save Configuration'
            )}
          </button>
          
          <button
            onClick={handleClear}
            className="px-6 bg-red-100 text-red-700 py-3 rounded-lg hover:bg-red-200 transition font-semibold"
          >
            Clear
          </button>
          
          <button
            onClick={onClose}
            className="px-6 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsConfig;