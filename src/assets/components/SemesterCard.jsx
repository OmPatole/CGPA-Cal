// src/components/SemesterCard.jsx
import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, BookOpen, Trash2 } from 'lucide-react';
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
    <div className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 shadow-sm hover:border-zinc-700 transition-colors">
      <div 
        className="bg-zinc-900 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className={`p-2.5 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:bg-zinc-700 transition-all`}>
                <BookOpen size={20} />
            </div>
            <div>
                <h3 className="text-zinc-100 font-bold text-lg">{semester.title}</h3>
                <span className="text-xs text-zinc-500 font-medium">{semester.courses.length} Courses</span>
            </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:pl-0 pl-14">
            <div className="text-right">
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">SGPA</span>
                <span className="text-2xl font-mono text-emerald-400 font-bold">{sgpa}</span>
            </div>
            <div className="p-1 rounded-full hover:bg-zinc-800">
                {isExpanded ? <ChevronUp size={20} className="text-zinc-500" /> : <ChevronDown size={20} className="text-zinc-500" />}
            </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 bg-zinc-900/30">
          <div className="space-y-3">
            {semester.courses.map((course, idx) => (
                <CourseRow 
                    key={idx} 
                    index={idx} 
                    course={course} 
                    updateCourse={updateCourse} 
                    removeCourse={removeCourse} 
                />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800/50">
            <button 
                onClick={addCourse}
                className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors py-2 px-3 hover:bg-emerald-500/10 rounded-lg"
            >
                <Plus size={16} /> Add Custom Course
            </button>
            <button 
                onClick={() => removeSemester(semIndex)}
                className="flex items-center gap-2 text-xs font-medium text-rose-400 hover:text-rose-300 py-2 px-3 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
                <Trash2 size={14} /> Remove Semester
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterCard;