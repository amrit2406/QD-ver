import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const handleDownloadPDF = async (elementRef, filename = 'document') => {
  try {
    const element = elementRef.current;
    
    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }
    
    pdf.save(`${filename}-${Date.now()}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

export const handleExportCSV = (cart, customerDetails, grandTotal, documentType = 'document') => {
  try {
    let csv = 'Service,Add-ons,Cost\n';
    
    cart.forEach(item => {
      const addonsStr = item.addons.map(a => a.name).join(' + ') || 'None';
      csv += `"${item.service.name}","${addonsStr}",${item.total}\n`;
    });
    
    csv += `\nCustomer Name,${customerDetails.name}\n`;
    csv += `Business Name,${customerDetails.businessName}\n`;
    csv += `Email,${customerDetails.email}\n`;
    
    if (customerDetails.notes) {
      csv += `Notes,"${customerDetails.notes.replace(/"/g, '""')}"\n`;
    }
    
    csv += `\nGrand Total,${grandTotal}\n`;
    csv += `Date,${new Date().toLocaleDateString()}\n`;
    csv += `Document Type,${documentType}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentType}-${customerDetails.businessName || 'customer'}-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    alert('Error exporting CSV. Please try again.');
  }
};

export const handlePrint = () => {
  window.print();
};