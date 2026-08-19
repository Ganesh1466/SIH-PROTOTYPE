import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Eye, 
  X, 
  ShieldCheck, 
  Award,
  BookOpen
} from 'lucide-react';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [degreeFilter, setDegreeFilter] = useState('ALL');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [placementFilter, setPlacementFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [districtFilter, degreeFilter, branchFilter, yearFilter, placementFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getStudents({
        district: districtFilter,
        degree: degreeFilter,
        branch: branchFilter,
        year: yearFilter,
        placementStatus: placementFilter,
        search: searchTerm
      });
      if (res.data?.success) {
        setStudents(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load students directory.');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return s.name.toLowerCase().includes(q) || 
           s.college.toLowerCase().includes(q) ||
           s.district.toLowerCase().includes(q) ||
           s.skills.some(sk => sk.toLowerCase().includes(q));
  });

  const getPlacementBadge = (status) => {
    switch (status) {
      case 'PLACED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Placed</span>
          </span>
        );
      case 'INTERVIEWING':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Interviewing</span>
          </span>
        );
      case 'IN_PROCESS':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/40">
            <span>In Process</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-800 text-slate-400 border border-slate-700">
            <span>Searching</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-slate-100 pb-10">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Student Talent Pool Registry</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Statewide Technical Student Directory
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor academic progress, verified technical skill competencies, application throughput, and placement status.
          </p>
        </div>

        {/* Counts summary */}
        <div className="flex items-center space-x-3 text-xs bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Roster</span>
            <span className="text-sm font-black text-white">{students.length}</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="text-center">
            <span className="text-emerald-400 block text-[10px] uppercase font-bold">Placed</span>
            <span className="text-sm font-black text-emerald-400">
              {students.filter(s => s.placementStatus === 'PLACED').length}
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Filter & Search Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, college, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Reset Filters button */}
          <button
            onClick={() => {
              setDistrictFilter('ALL');
              setDegreeFilter('ALL');
              setBranchFilter('ALL');
              setYearFilter('ALL');
              setPlacementFilter('ALL');
              setSearchTerm('');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>

        {/* 5 Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-850">
          
          {/* District */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Districts</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Kota">Kota</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Ajmer">Ajmer</option>
            <option value="Bikaner">Bikaner</option>
          </select>

          {/* Degree */}
          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Degrees</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="Polytechnic">Polytechnic / Diploma</option>
          </select>

          {/* Branch */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Branches</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science & AI</option>
            <option value="Electronics">Electronics & Comm.</option>
          </select>

          {/* Graduation Year */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Cohort Years</option>
            <option value="2026">2026 Batch</option>
            <option value="2027">2027 Batch</option>
          </select>

          {/* Placement Status */}
          <select
            value={placementFilter}
            onChange={(e) => setPlacementFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Placement Statuses</option>
            <option value="PLACED">Placed</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="IN_PROCESS">In Process</option>
            <option value="SEARCHING">Searching</option>
          </select>

        </div>

      </div>

      {/* Students Table */}
      {loading ? (
        <SkeletonLoader count={3} />
      ) : (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Student Name & College</th>
                  <th className="py-3.5 px-4">Degree & Branch</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Skills Verified</th>
                  <th className="py-3.5 px-4 text-center">Funnel (Apps/Short/Sel)</th>
                  <th className="py-3.5 px-4">Placement Status</th>
                  <th className="py-3.5 px-5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500 text-xs">
                      No student records found matching specified filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-4 px-5">
                        <div>
                          <span className="font-bold text-white block text-sm">{s.name}</span>
                          <span className="text-[11px] text-slate-400">{s.college}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-300">
                        <span className="font-semibold text-white">{s.degree}</span> • {s.branch}
                        <span className="block text-[10px] text-slate-500">{s.graduationYear} Batch (CGPA: {s.cgpa})</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="flex items-center space-x-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                          <span>{s.district}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {s.skills?.slice(0, 3).map(sk => (
                            <span key={sk} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                              {sk}
                            </span>
                          ))}
                          {s.skills?.length > 3 && (
                            <span className="text-[10px] text-slate-500">+{s.skills.length - 3}</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center font-mono text-xs">
                        <span className="text-sky-400 font-bold">{s.applicationsCount}</span> / <span className="text-amber-400 font-bold">{s.shortlistedCount}</span> / <span className="text-emerald-400 font-bold">{s.selectedCount}</span>
                      </td>

                      <td className="py-4 px-4">
                        {getPlacementBadge(s.placementStatus)}
                        {s.placedCompany && (
                          <span className="block text-[10px] text-emerald-400 font-semibold mt-0.5">
                            @ {s.placedCompany} ({s.packageOffered})
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700 transition-colors"
                          title="View Profile Summary"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedStudent.name}</h3>
                  <span className="text-xs text-slate-400">{selectedStudent.degree} • {selectedStudent.branch}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Placement State:</span>
                <div>{getPlacementBadge(selectedStudent.placementStatus)}</div>
              </div>
              {selectedStudent.placedCompany && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Recruiting Entity:</span>
                  <span className="text-emerald-400 font-bold">{selectedStudent.placedCompany} ({selectedStudent.packageOffered})</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">College / Institution:</span>
                <span className="text-white font-medium">{selectedStudent.college}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">District:</span>
                <span className="text-white">{selectedStudent.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Graduation Year & CGPA:</span>
                <span className="text-amber-400 font-bold">{selectedStudent.graduationYear} (CGPA: {selectedStudent.cgpa})</span>
              </div>
              
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">Verified Technical Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.skills?.map(sk => (
                    <span key={sk} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
