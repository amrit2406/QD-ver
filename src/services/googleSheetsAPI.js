// Google Apps Script Web App Integration
// No Google Cloud Console needed!

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxyTOwtKq7hSXR2oIAO1Yug_YNGRn9AeMEeWAElgEkxmImaup15cdhDn1bDQ0lIY2I/exec'; // Paste your Apps Script URL here

class GoogleSheetsService {
  constructor() {
    this.initialized = false;
    this.scriptUrl = localStorage.getItem('googleScriptUrl') || SCRIPT_URL;
  }

  // Set the script URL
  setScriptUrl(url) {
    this.scriptUrl = url;
    localStorage.setItem('googleScriptUrl', url);
    this.initialized = true;
  }

  // Check if configured
  isConfigured() {
    return this.scriptUrl && this.scriptUrl !== 'https://script.google.com/macros/s/AKfycbxyTOwtKq7hSXR2oIAO1Yug_YNGRn9AeMEeWAElgEkxmImaup15cdhDn1bDQ0lIY2I/exec';
  }

  // Initialize the service
  async initialize() {
    this.initialized = this.isConfigured();
    return this.initialized;
  }

  // Save a new document
  async saveDocument(type, data) {
    try {
      if (!this.isConfigured()) {
        // Fallback to localStorage
        return this.saveToLocalStorage(type, data);
      }

      const response = await fetch(`${this.scriptUrl}?action=save&type=${type}`, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'save',
          type: type,
          data: JSON.stringify(data)
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Also save to localStorage as backup
        this.saveToLocalStorage(type, data);
        return result.document;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error saving to Google Sheets, using localStorage:', error);
      return this.saveToLocalStorage(type, data);
    }
  }

  // Get all documents or filter by type
  async getDocuments(type = null) {
    try {
      if (!this.isConfigured()) {
        return this.getFromLocalStorage(type);
      }

      const response = await fetch(`${this.scriptUrl}?action=getAll&type=${type}`);
      const result = await response.json();
      
      if (result.success) {
        // Merge with localStorage
        const localDocs = this.getFromLocalStorage(type);
        const mergedDocs = this.mergeDocuments(result.documents, localDocs);
        return mergedDocs;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error fetching from Google Sheets, using localStorage:', error);
      return this.getFromLocalStorage(type);
    }
  }

  // Get a single document by ID
  async getDocumentById(id) {
    try {
      if (!this.isConfigured()) {
        return this.getByIdFromLocalStorage(id);
      }

      const response = await fetch(`${this.scriptUrl}?action=getById&id=${id}`);
      const result = await response.json();
      
      if (result.success) {
        return result.document;
      } else {
        return this.getByIdFromLocalStorage(id);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      return this.getByIdFromLocalStorage(id);
    }
  }

  // Delete a document
  async deleteDocument(id) {
    try {
      if (!this.isConfigured()) {
        return this.deleteFromLocalStorage(id);
      }

      const response = await fetch(`${this.scriptUrl}?action=delete&id=${id}`, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'delete',
          id: id
        })
      });

      const result = await response.json();
      
      // Also delete from localStorage
      this.deleteFromLocalStorage(id);
      
      return result.success;
    } catch (error) {
      console.error('Error deleting from Google Sheets:', error);
      return this.deleteFromLocalStorage(id);
    }
  }

  // Update a document
  async updateDocument(id, updates) {
    try {
      if (!this.isConfigured()) {
        return this.updateInLocalStorage(id, updates);
      }

      const response = await fetch(`${this.scriptUrl}?action=update`, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'update',
          id: id,
          updates: JSON.stringify(updates)
        })
      });

      const result = await response.json();
      
      // Also update localStorage
      this.updateInLocalStorage(id, updates);
      
      return result.document;
    } catch (error) {
      console.error('Error updating document:', error);
      return this.updateInLocalStorage(id, updates);
    }
  }

  // Get statistics
  async getStatistics() {
    try {
      const documents = await this.getDocuments();
      
      const stats = {
        total: documents.length,
        quotations: documents.filter(d => d.type === 'quotation').length,
        proposals: documents.filter(d => d.type === 'proposal').length,
        invoices: documents.filter(d => d.type === 'invoice').length,
        totalRevenue: documents.reduce((sum, d) => sum + (d.grandTotal || 0), 0),
        thisMonth: documents.filter(d => {
          const docDate = new Date(d.createdAt);
          const now = new Date();
          return docDate.getMonth() === now.getMonth() && 
                 docDate.getFullYear() === now.getFullYear();
        }).length
      };
      
      return stats;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return null;
    }
  }

  // Export to CSV
  exportToCSV(documents) {
    let csv = 'ID,Number,Type,Customer Name,Business Name,Email,Total,Date,Status\n';
    
    documents.forEach(doc => {
      csv += `"${doc.id}","${doc.number}","${doc.type}","${doc.customerDetails.name}","${doc.customerDetails.businessName}","${doc.customerDetails.email}",${doc.grandTotal},"${new Date(doc.createdAt).toLocaleDateString()}","${doc.status}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `documents-export-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // ===== LOCAL STORAGE FALLBACK METHODS =====

  saveToLocalStorage(type, data) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const newDocument = {
      id: Date.now().toString(),
      type,
      number: this.generateDocumentNumber(type),
      customerDetails: data.customerDetails,
      cart: data.cart,
      grandTotal: data.grandTotal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };
    documents.push(newDocument);
    localStorage.setItem('documents', JSON.stringify(documents));
    return newDocument;
  }

  getFromLocalStorage(type = null) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return type ? documents.filter(doc => doc.type === type) : documents;
  }

  getByIdFromLocalStorage(id) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    return documents.find(doc => doc.id === id);
  }

  deleteFromLocalStorage(id) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const filtered = documents.filter(doc => doc.id !== id);
    localStorage.setItem('documents', JSON.stringify(filtered));
    return true;
  }

  updateInLocalStorage(id, updates) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const index = documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      documents[index] = { ...documents[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('documents', JSON.stringify(documents));
      return documents[index];
    }
    return null;
  }

  mergeDocuments(sheetsDocs, localDocs) {
    const merged = [...sheetsDocs];
    const sheetIds = new Set(sheetsDocs.map(d => d.id));
    
    localDocs.forEach(doc => {
      if (!sheetIds.has(doc.id)) {
        merged.push(doc);
      }
    });
    
    return merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  generateDocumentNumber(type) {
    const prefix = type.toUpperCase().substring(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }
}

// Export singleton instance
export const googleSheetsAPI = new GoogleSheetsService();