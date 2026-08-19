import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  MapPin, 
  Building2, 
  Briefcase, 
  Users, 
  Zap, 
  BarChart3, 
  CheckCircle2,
  Table
} from 'lucide-react';
import { governmentApi } from '../../api/governmentApi';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentReports = () => {
  const [activeReport, setActiveReport] = useState('district');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  const reportTypes = [
    { id: 'district', label: 'District Employment Report', icon: MapPin },
    { id: 'employer', label: 'Employer Verification Report', icon: Building2 },
    { id: 'opportunity', label: 'Opportunity & Requisition Report', icon: Briefcase },
    { id: 'student', label: 'Student Talent & Placement Report', icon: Users },
    { id: 'skill', label: 'Skill Gap & Curriculum Matrix', icon: Zap },
    { id: 'funnel', label: 'Employment Conversion Funnel', icon: BarChart3 },
  ];

  useEffect(() => {
    fetchReport(activeReport);
  }, [activeReport]);

  const fetchReport = async (type) => {
    try {
      setLoading(true);
      const res = await governmentApi.getReports(type);
      if (res.data?.success) {
        setReportData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load report data.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!reportData || !reportData.columns || !reportData.rows) {
      toast.error('No report data available to export.');
      return;
    }

    const headerLine = reportData.columns.map(c => `"${c}"`).join(',');
    const dataLines = reportData.rows.map(row => 
      row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headerLine, ...dataLines].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${activeReport}_report_rajasthan_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${reportData.title} as CSV!`);
  };

  return (
    <div className="space-y-6 text-slate-100 pb-10">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Statewide Intelligence & Audit Exports</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Official Reports & Data Exporter
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Download verified state datasets in standard CSV format for legislative policy review and planning.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl border border-amber-400/40 flex items-center space-x-2 transition-all shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Current Report (CSV)</span>
        </button>
      </div>

      {/* Report Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {reportTypes.map((rep) => {
          const Icon = rep.icon;
          const isActive = activeReport === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => setActiveReport(rep.id)}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 mb-2 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span className="text-xs font-extrabold leading-tight">{rep.label}</span>
            </button>
          );
        })}
      </div>

      {/* Report Preview Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-extrabold text-white">
              {reportData?.title || 'Report Preview'}
            </h2>
            <span className="text-xs text-slate-400">Showing live database rows ready for export</span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {reportData?.rows?.length || 0} Records Ready
          </span>
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonLoader count={3} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  {reportData?.columns?.map((col, idx) => (
                    <th key={idx} className="py-3.5 px-4">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                {reportData?.rows?.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`py-3.5 px-4 ${cIdx === 0 ? 'font-bold font-sans text-white text-xs' : 'text-slate-300'}`}>
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
