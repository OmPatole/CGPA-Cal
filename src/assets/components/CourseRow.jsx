// src/components/CourseRow.jsx
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { GRADE_SCALE, calculateGradeFromMarks, getGradePoint } from '../../utils/constants';

const CourseRow = ({ course, index, updateCourse, removeCourse }) => {
  const [mode, setMode] = useState('marks'); // 'marks' or 'grade'

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

      const calculatedGrade = calculateGradeFromMarks(totalObtained, totalMax);
      if (calculatedGrade !== course.grade) {
        updateCourse(index, 'grade', calculatedGrade);
      }
    }
  }, [course.intObt, course.extObt, course.intMax, course.extMax, mode]);

  const handleMarksChange = (field, value, maxLimit) => {
    const numVal = parseFloat(value);
    if (value !== '' && (numVal < 0 || numVal > maxLimit)) {
      return; 
    }
    updateCourse(index, field, value);
  };

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg mb-3 border border-[#333] shadow-sm transition-all hover:border-[#444]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-3">
        <input 
          type="text" 
          value={course.name}
          onChange={(e) => updateCourse(index, 'name', e.target.value)}
          placeholder="Course Name"
          className="bg-transparent text-[#e0e0e0] font-medium placeholder-gray-600 focus:outline-none w-full sm:flex-1 sm:mr-4"
        />
        
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
                <label className="block text-[10px] text-gray-500 mb-1 uppercase">Internal (ISE)</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        placeholder="Obt"
                        value={course.intObt}
                        onChange={(e) => handleMarksChange('intObt', e.target.value, parseFloat(course.intMax))}
                        className="bg-[#252525] text-white w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none"
                    />
                    <span className="text-gray-600">/</span>
                    <input 
                        type="number" 
                        placeholder="Max"
                        value={course.intMax}
                        readOnly={course.isTheory}
                        onChange={(e) => updateCourse(index, 'intMax', e.target.value)}
                        className={`w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none ${course.isTheory ? 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed' : 'bg-[#252525] text-gray-400'}`}
                    />
                </div>
            </div>
            <div>
                <label className="block text-[10px] text-gray-500 mb-1 uppercase">
                    {course.isTheory ? 'Theory (ESE)' : 'External (ESE/EE)'}
                </label>
                <div className="flex items-center gap-2">
                    <input 
                        type="number" 
                        placeholder="Obt"
                        value={course.extObt}
                        onChange={(e) => handleMarksChange('extObt', e.target.value, parseFloat(course.extMax))}
                        className="bg-[#252525] text-white w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none"
                    />
                    <span className="text-gray-600">/</span>
                    <input 
                        type="number" 
                        placeholder="Max"
                        value={course.extMax}
                        readOnly={course.isTheory}
                        onChange={(e) => updateCourse(index, 'extMax', e.target.value)}
                        className={`w-full p-2 rounded text-sm focus:ring-1 focus:ring-[#555] outline-none ${course.isTheory ? 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed' : 'bg-[#252525] text-gray-400'}`}
                    />
                </div>
            </div>
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