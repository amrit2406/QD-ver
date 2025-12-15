import React, { useState, useEffect } from 'react';
import { FileText, Receipt, Eye, Settings } from 'lucide-react';
import { googleSheetsAPI } from '../services/googleSheetsAPI';
import GoogleSheetsConfig from './GoogleSheetsConfig';

const HomePage = ({ onNavigate }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const statistics = await googleSheetsAPI.getStatistics();
    setStats(statistics);
  };

  const cards = [
    { 
      id: 'quotation', 
      title: 'Create Quotation', 
      icon: FileText, 
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      description: 'Generate price quotes for clients'
    },
    { 
      id: 'proposal', 
      title: 'Create Proposal', 
      icon: FileText, 
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      description: 'Create detailed business proposals'
    },
    { 
      id: 'invoice', 
      title: 'Create Invoice', 
      icon: Receipt, 
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      description: 'Generate professional invoices'
    },
    { 
      id: 'view-quotations', 
      title: 'View Quotations', 
      icon: Eye, 
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      description: 'Browse all saved quotations'
    },
    { 
      id: 'view-proposals', 
      title: 'View Proposals', 
      icon: Eye, 
      color: 'bg-violet-500',
      hoverColor: 'hover:bg-violet-600',
      description: 'Browse all saved proposals'
    },
    { 
      id: 'view-invoices', 
      title: 'View Invoices', 
      icon: Eye, 
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      description: 'Browse all saved invoices'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Settings */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">Business Documents Manager</h1>
          <p className="text-xl text-gray-600">Manage your quotations, proposals, and invoices in one place</p>
        </div>
        <button
          onClick={() => setShowConfig(true)}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          title="Google Sheets Configuration"
        >
          <Settings className="text-gray-600" size={24} />
        </button>
      </div>

      {/* Statistics Dashboard */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Documents</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-3xl font-bold text-green-600">{stats.thisMonth}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Quotations</p>
            <p className="text-3xl font-bold text-blue-600">{stats.quotations}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left group"
            >
              <div className={`${card.color} ${card.hoverColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                <Icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </button>
          );
        })}
      </div>

      {/* Google Sheets Config Modal */}
      {showConfig && (
        <GoogleSheetsConfig onClose={() => setShowConfig(false)} />
      )}
    </div>
  );
};

export default HomePage;