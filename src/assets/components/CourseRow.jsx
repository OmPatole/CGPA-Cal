// src/components/CourseRow.jsx
import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { GRADE_SCALE, calculateGradeFromMarks, getGradePoint, getPenalizedGrade } from '../../utils/constants';

const CourseRow = ({ course, index, updateCourse, removeCourse }) => {
  const [mode, setMode] = useState('marks'); 

  useEffect(() => {
    if (mode === 'marks') {
      if (course.intObt === '' && course.extObt === '') {
        if (course.grade !== '') {
          updateCourse(index, 'grade', '');
        }
        return;
      }

      const intObt = parseFloat(course.intObt) || 0;
      const extObt = parseFloat(course.extObt) || 0;
      const intMax = parseFloat(course.intMax) || 0;
      const extMax = parseFloat(course.extMax) || 0;
      
      const isTheory = course.isTheory !== undefined ? course.isTheory : true;
      // FIX: Passing all required parameters for precise calculation
      let calculatedGrade = calculateGradeFromMarks(intObt, intMax, extObt, extMax, isTheory);
      
      if (course.penalty > 0) {
        calculatedGrade = getPenalizedGrade(calculatedGrade, course.penalty);
      }

      if (calculatedGrade !== course.grade) {
        updateCourse(index, 'grade', calculatedGrade);
      }
    }
  }, [course.intObt, course.extObt, course.intMax, course.extMax, course.penalty, course.isTheory, mode]);

  const handleMarksChange = (field, value, maxLimit) => {
    const numVal = parseFloat(value);
    if (value !== '' && (numVal < 0 || numVal > maxLimit)) {
      return; 
    }
    updateCourse(index, field, value);
  };

  // Block Arrow keys to allow only direct input
  const preventArrowKeys = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const showExternal = parseFloat(course.extMax) > 0;
  const isLocked = course.isLocked !== undefined ? course.isLocked : course.isTheory;

  return (
    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/50 shadow-sm hover:border-zinc-700 transition-all group">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
        <div className="flex flex-col w-full sm:flex-1 sm:mr-4">
             <div className="flex items-center gap-2">
                 <input 
                  type="text" 
                  value={course.name}
                  onChange={(e) => updateCourse(index, 'name', e.target.value)}
                  placeholder="Course Name"
                  className="bg-transparent text-zinc-200 font-semibold placeholder-zinc-700 focus:outline-none w-full text-base"
                />
                {course.isAudit && (
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold whitespace-nowrap">
                        Audit
                    </span>
                )}
             </div>
            
            {/* Exam Type Selector */}
            {!course.isAudit && (
                <div className="flex items-center gap-2 mt-2">
                    <select
                        value={course.penalty || 0}
                        onChange={(e) => updateCourse(index, 'penalty', parseInt(e.target.value))}
                        className={`text-[11px] font-bold uppercase tracking-wider bg-transparent border rounded-md px-2 py-1 outline-none cursor-pointer transition-colors ${
                            course.penalty > 0 
                            ? 'text-rose-400 border-rose-500/50 bg-rose-500/10' 
                            : 'text-zinc-600 border-zinc-800 hover:border-zinc-600'
                        }`}
                    >
                        <option value={0}>Regular Exam</option>
                        <option value={1}>Re-Exam (1 Grade Drop)</option>
                        <option value={2}>Repeated (2 Grade Drops)</option>
                    </select>
                    {course.penalty > 0 && <AlertTriangle size={12} className="text-rose-500" />}
                </div>
            )}
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center gap-3 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Credits</span>
                <input 
                type="number" 
                value={course.credits}
                readOnly={isLocked}
                onKeyDown={preventArrowKeys}
                onChange={(e) => updateCourse(index, 'credits', parseFloat(e.target.value))}
                className={`bg-transparent text-center w-8 font-mono font-bold focus:outline-none ${
                    isLocked
                        ? 'text-emerald-400 cursor-not-allowed'
                        : 'text-emerald-400'
                }`}
                />
            </div>
            <button 
              onClick={() => removeCourse(index)}
              className="text-zinc-600 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-500/10 transition-all"
            >
              <Trash2 size={18} />
            </button>
        </div>
      </div>

      {/* Input Toggle */}
      <div className="flex gap-6 text-sm mb-4 border-b border-zinc-800">
        <button 
          onClick={() => setMode('marks')} 
          className={`pb-2 transition-colors font-medium ${mode === 'marks' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Input Marks
        </button>
        <button 
          onClick={() => setMode('grade')} 
          className={`pb-2 transition-colors font-medium ${mode === 'grade' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Select Grade
        </button>
      </div>

      {mode === 'marks' ? (
        <div className={`grid ${showExternal ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            {/* Internal Marks */}
            <div>
                <label className="block text-[10px] text-zinc-500 mb-1.5 uppercase font-bold tracking-wider">Internal (ISE/IE)</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        placeholder="Obt"
                        value={course.intObt}
                        onKeyDown={preventArrowKeys}
                        onChange={(e) => handleMarksChange('intObt', e.target.value, parseFloat(course.intMax) || 0)}
                        className="bg-zinc-900 text-white w-full p-2.5 rounded-lg text-sm border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder-zinc-700"
                    />
                    <span className="text-zinc-700 font-light">/</span>
                    <input 
                        type="number" 
                        placeholder="Max"
                        value={course.intMax}
                        readOnly={isLocked}
                        onKeyDown={preventArrowKeys}
                        onChange={(e) => updateCourse(index, 'intMax', e.target.value)}
                        className={`w-full p-2.5 rounded-lg text-sm border outline-none transition-all ${
                            isLocked 
                            ? 'bg-emerald-800/20 text-white font-bold border-emerald-800/50 cursor-not-allowed' 
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 focus:border-zinc-600'
                        }`}
                    />
                </div>
            </div>
            
            {/* External Marks */}
            {showExternal && (
            <div>
                <label className="block text-[10px] text-zinc-500 mb-1.5 uppercase font-bold tracking-wider">
                    {course.isTheory ? 'Theory (ESE)' : 'External (ESE/EE)'}
                </label>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        placeholder="Obt"
                        value={course.extObt}
                        onKeyDown={preventArrowKeys}
                        onChange={(e) => handleMarksChange('extObt', e.target.value, parseFloat(course.extMax) || 0)}
                        className="bg-zinc-900 text-white w-full p-2.5 rounded-lg text-sm border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder-zinc-700"
                    />
                    <span className="text-zinc-700 font-light">/</span>
                    <input 
                        type="number" 
                        placeholder="Max"
                        value={course.extMax}
                        readOnly={isLocked}
                        onKeyDown={preventArrowKeys}
                        onChange={(e) => updateCourse(index, 'extMax', e.target.value)}
                        className={`w-full p-2.5 rounded-lg text-sm border outline-none transition-all ${
                            isLocked 
                            ? 'bg-emerald-800/20 text-white font-bold border-emerald-800/50 cursor-not-allowed' 
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 focus:border-zinc-600'
                        }`}
                    />
                </div>
            </div>
            )}
        </div>
      ) : (
        <div className="mt-2">
           <label className="block text-[10px] text-zinc-500 mb-2 uppercase font-bold tracking-wider">Final Grade</label>
           <div className="flex gap-2 flex-wrap">
              {GRADE_SCALE.map((g) => (
                  <button
                    key={g.grade}
                    onClick={() => updateCourse(index, 'grade', g.grade)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        course.grade === g.grade 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                      {g.grade}
                  </button>
              ))}
           </div>
        </div>
      )}
      
      {/* Result Preview */}
      <div className="mt-4 flex justify-between items-center border-t border-zinc-800/50 pt-3">
        <div className="text-xs text-zinc-500 font-medium">
            {mode === 'marks' && (
                <span>
                    Total: <span className="text-emerald-400 font-bold">{((parseFloat(course.intObt)||0) + (parseFloat(course.extObt)||0))}</span>
                    <span className="text-zinc-600"> / </span> 
                    {((parseFloat(course.intMax)||0) + (parseFloat(course.extMax)||0))}
                </span>
            )}
            {course.penalty > 0 && (
                <span className="ml-2 text-rose-400 font-bold text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded uppercase">
                    -{course.penalty} Grade{course.penalty > 1 ? 's' : ''}
                </span>
            )}
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Grade Point</span>
            <span className="text-emerald-400 font-mono font-bold text-lg">
                {course.grade ? getGradePoint(course.grade) : '-'}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                course.grade === 'FF' 
                ? 'bg-rose-500/20 text-rose-400' 
                : (!course.grade ? 'bg-zinc-800 text-zinc-600' : 'bg-zinc-800 text-zinc-300')
            }`}>
                {course.grade || '--'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default CourseRow;