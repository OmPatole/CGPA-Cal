// src/components/SemesterCard.jsx
import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import CourseRow from './CourseRow';
import { getGradePoint } from '../../utils/constants';

const SemesterCard = ({ semester, semIndex, updateSemester, removeSemester }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const addCourse = () => {
    const newCourse = { 
        name: `Course ${semester.courses.length + 1}`, 
        credits: 3, 
        grade: '', 
        intObt: '', intMax: '30', 
        extObt: '', extMax: '70',
        isTheory: false 
    };
    const updatedCourses = [...semester.courses, newCourse];
    updateSemester(semIndex, updatedCourses, semester.title);
  };

  const updateCourse = (courseIndex, field, value) => {
    const updatedCourses = [...semester.courses];
    updatedCourses[courseIndex] = { ...updatedCourses[courseIndex], [field]: value };
    updateSemester(semIndex, updatedCourses, semester.title);
  };

  const removeCourse = (courseIndex) => {
    const updatedCourses = semester.courses.filter((_, i) => i !== courseIndex);
    updateSemester(semIndex, updatedCourses, semester.title);
  };

  const sgpa = (() => {
    let totalPoints = 0;
    let totalCredits = 0;
    let hasGradedCourses = false;

    semester.courses.forEach(c => {
        if (c.grade && c.grade !== '') { 
            totalPoints += getGradePoint(c.grade) * c.credits;
            totalCredits += c.credits;
            hasGradedCourses = true;
        }
    });
    
    if (!hasGradedCourses || totalCredits === 0) return '0.00';
    return (totalPoints / totalCredits).toFixed(2);
  })();

  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden mb-6 shadow-lg border border-[#222]">
      <div 
        className="bg-[#1a1a1a] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`p-2 rounded-lg bg-[#222] text-[#a8d5ba]`}>
                <BookOpen size={18} />
            </div>
            <div>
                <h3 className="text-[#e0e0e0] font-semibold">{semester.title}</h3>
                <span className="text-xs text-gray-500">{semester.courses.length} Courses</span>
            </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:pl-0 pl-12">
            <div className="text-right">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest">SGPA</span>
                <span className="text-xl font-mono text-[#8ab4f8]">{sgpa}</span>
            </div>
            {isExpanded ? <ChevronUp size={20} className="text-gray-600" /> : <ChevronDown size={20} className="text-gray-600" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          {semester.courses.map((course, idx) => (
            <CourseRow 
                key={idx} 
                index={idx} 
                course={course} 
                updateCourse={updateCourse} 
                removeCourse={removeCourse} 
            />
          ))}

          <div className="flex justify-between items-center mt-4 pt-2 border-t border-[#222]">
            <button 
                onClick={addCourse}
                className="flex items-center gap-2 text-sm text-[#a8d5ba] hover:text-[#8fc4a3] transition-colors"
            >
                <Plus size={16} /> Add Custom Course
            </button>
            <button 
                onClick={() => removeSemester(semIndex)}
                className="text-xs text-[#d5a8a8] hover:text-[#ff6b6b] transition-colors"
            >
                Remove Semester
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterCard;