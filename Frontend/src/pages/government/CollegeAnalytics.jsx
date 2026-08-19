import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Building2, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Download,
  ShieldCheck,
  Search
} from 'lucide-react';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const CollegeAnalytics = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    governmentApi.getColleges()
      .then(res => setColleges(res.data || []))
      .catch(err => toast.error("Failed to load college analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonLoader count={4} />;
  }

  const filtered = colleges.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.district.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Engineering & Polytechnic Institution Performance
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Placement efficiency, industry partner engagement, and top technical specializations.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md text-amber-300 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Verified Institution Directory</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search institution by name or district (e.g. RTU, MNIT, Bikaner)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-white focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* College Performance Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">Institution & District</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Placement %</th>
                <th className="py-3 px-4">Enrolled</th>
                <th className="py-3 px-4">Placed</th>
                <th className="py-3 px-4">Top Stack</th>
                <th className="py-3 px-5 text-right">Corporate Partners</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map(college => (
                <tr key={college.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-white text-sm">{college.name}</div>
                    <span className="text-[11px] text-slate-400">{college.district}, Rajasthan</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant="saffron" size="sm">
                      {college.type}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-amber-400 text-sm">
                    {college.placementRate}%
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {college.totalStudents?.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">
                    {college.placedStudents?.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {college.topSkills?.slice(0, 3).map(s => (
                        <span key={s} className="px-1.5 py-0.2 rounded bg-slate-900 text-amber-300 border border-slate-800 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-5 text-right text-slate-300 font-semibold">
                    {college.activeEmployers} Employers
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
