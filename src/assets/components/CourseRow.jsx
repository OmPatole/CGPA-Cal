// src/components/CourseRow.jsx
import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw } from 'lucide-react'; 
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
      
      const totalObtained = intObt + extObt;
      const totalMax = intMax + extMax;

      let calculatedGrade = calculateGradeFromMarks(totalObtained, totalMax);
      
      // Apply Re-exam penalty logic if checked
      if (course.isReExam) {
        calculatedGrade = getPenalizedGrade(calculatedGrade);
      }

      if (calculatedGrade !== course.grade) {
        updateCourse(index, 'grade', calculatedGrade);
      }
    }
  }, [course.intObt, course.extObt, course.intMax, course.extMax, course.isReExam, mode]);

  const handleMarksChange = (field, value, maxLimit) => {
    const numVal = parseFloat(value);
    if (value !== '' && (numVal < 0 || numVal > maxLimit)) {
      return; 
    }
    updateCourse(index, field, value);
  };

  const showExternal = parseFloat(course.extMax) > 0;
  const isLocked = course.isLocked !== undefined ? course.isLocked : course.isTheory;

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg mb-3 border border-[#333] shadow-sm transition-all hover:border-[#444]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-3">
        <div className="flex flex-col w-full sm:flex-1 sm:mr-4">
             <input 
              type="text" 
              value={course.name}
              onChange={(e) => updateCourse(index, 'name', e.target.value)}
              placeholder="Course Name"
              className="bg-transparent text-[#e0e0e0] font-medium placeholder-gray-600 focus:outline-none w-full"
            />
            {/* Re-exam Checkbox */}
            <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit p-1 -ml-1 rounded hover:bg-[#2a2a2a] transition-colors">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${course.isReExam ? 'bg-[#ff6b6b] border-[#ff6b6b]' : 'border-gray-500 bg-transparent'}`}>
                    {course.isReExam && <RefreshCw size={12} className="text-black font-bold" />}
                </div>
                <input 
                    type="checkbox" 
                    checked={course.isReExam || false}
                    onChange={(e) => updateCourse(index, 'isReExam', e.target.checked)}
                    className="hidden"
                />
                <span className={`text-xs uppercase tracking-wider font-bold ${course.isReExam ? 'text-[#ff6b6b]' : 'text-gray-500'}`}>
                    Re-Exam Penalty
                </span>
            </label>
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Credits</span>
                <input 
                type="number" 
                value={course.credits}
                onChange={(e) => updateCourse(index, 'credits', parseFloat(e.target.value))}
                className="bg-[#2a2a2a] text-[#a8d5ba] text-center w-12 p-1 rounded focus:outline-none"
                />
            </div>
            <button 
              onClick={() => removeCourse(index)}
              className="text-[#d5a8a8] hover:text-[#ff6b6b] p-2 sm:p-1 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
        </div>
      </div>

      {/* Input Toggle */}
      <div className="flex gap-4 text-sm mb-2">
        <button 
          onClick={() => setMode('marks')} 
          className={`pb-1 ${mode === 'marks' ? 'text-[#8ab4f8] border-b border-[#8ab4f8]' : 'text-gray-500'}`}
        >
          Input Marks
        </button>
        <button 
          onClick={() => setMode('grade')} 
          className={`pb-1 ${mode === 'grade' ? 'text-[#8ab4f8] border-b border-[#8ab4f8]' : 'text-gray-500'}`}
        >
          Select Grade
        </button>
      </div>

      {mode === 'marks' ? (
        <div className={`grid ${showExternal ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
            {/* Internal Marks */}
            <div>
                <label className="block text-[10px] text-gray-500 mb-1 uppercase">Internal (ISE/IE)</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        placeholder="Obt"
                        value={course.intObt}
                        onChange={(e) => handleMarksChange('intObt', e.target.value, parseFloat(course.intMax) || 0)}
                        className="bg-[#252525] text-white w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none"
                    />
                    <span className="text-gray-600">/</span>
                    <input 
                        type="number" 
                        placeholder="Max"
                        value={course.intMax}
                        readOnly={isLocked}
                        onChange={(e) => updateCourse(index, 'intMax', e.target.value)}
                        className={`w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none ${
                            isLocked 
                            ? 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed' 
                            : 'bg-[#252525] text-gray-400'
                        }`}
                    />
                </div>
            </div>
            
            {/* External Marks */}
            {showExternal && (
            <div>
                <label className="block text-[10px] text-gray-500 mb-1 uppercase">
                    {course.isTheory ? 'Theory (ESE)' : 'External (ESE/EE)'}
                </label>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        placeholder="Obt"
                        value={course.extObt}
                        onChange={(e) => handleMarksChange('extObt', e.target.value, parseFloat(course.extMax) || 0)}
                        className="bg-[#252525] text-white w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none"
                    />
                    <span className="text-gray-600">/</span>
                    <input 
                        type="number" 
                        placeholder="Max"
                        value={course.extMax}
                        readOnly={isLocked}
                        onChange={(e) => updateCourse(index, 'extMax', e.target.value)}
                        className={`w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none ${
                            isLocked 
                            ? 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed' 
                            : 'bg-[#252525] text-gray-400'
                        }`}
                    />
                </div>
            </div>
            )}
        </div>
      ) : (
        <div className="mt-2">
           <label className="block text-[10px] text-gray-500 mb-1 uppercase">Final Grade</label>
           <div className="flex gap-2 flex-wrap">
              {GRADE_SCALE.map((g) => (
                  <button
                    key={g.grade}
                    onClick={() => updateCourse(index, 'grade', g.grade)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                        course.grade === g.grade 
                        ? 'bg-[#a8d5ba] text-black font-bold' 
                        : 'bg-[#333] text-gray-400 hover:bg-[#444]'
                    }`}
                  >
                      {g.grade}
                  </button>
              ))}
           </div>
        </div>
      )}
      
      {/* Result Preview */}
      <div className="mt-3 flex justify-between items-center border-t border-[#333] pt-2">
        <div className="text-xs text-gray-500">
            {mode === 'marks' && `Total: ${((parseFloat(course.intObt)||0) + (parseFloat(course.extObt)||0))}/${((parseFloat(course.intMax)||0) + (parseFloat(course.extMax)||0))}`}
            {course.isReExam && <span className="ml-2 text-[#ff6b6b]">(Penalty Applied)</span>}
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase">Grade Point</span>
            <span className="text-[#a8d5ba] font-mono font-bold text-lg">
                {course.grade ? getGradePoint(course.grade) : '-'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${course.grade === 'FF' ? 'bg-[#ff6b6b] text-black' : (!course.grade ? 'bg-[#222] text-gray-500' : 'bg-[#333] text-gray-300')}`}>
                {course.grade || '--'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default CourseRow;