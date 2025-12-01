// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Calculator } from 'lucide-react';

// Import components
import SemesterCard from './assets/components/SemesterCard';
import AddSemesterModal from './assets/components/AddSemesterModal';
import ConfirmModal from './assets/components/ConfirmModal';
import { getGradePoint } from './utils/constants';

export default function App() {
  const [semesters, setSemesters] = useState(() => {
    try {
      const savedData = localStorage.getItem('dot_cgpa_data');
      return savedData ? JSON.parse(savedData) : [];
    } catch (e) {
      console.error("Error loading from local storage", e);
      return [];
    }
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dot_cgpa_data', JSON.stringify(semesters));
    } catch (e) {
      console.error("Error saving to local storage", e);
    }
  }, [semesters]);

  const addSemester = (courses, title) => {
    setSemesters([...semesters, { title, courses }]);
  };

  const removeSemester = (index) => {
    const newSemesters = semesters.filter((_, i) => i !== index);
    setSemesters(newSemesters);
  };

  const updateSemester = (index, courses, title) => {
    const newSemesters = [...semesters];
    newSemesters[index] = { title, courses };
    setSemesters(newSemesters);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let hasGradedCourses = false;
    
    semesters.forEach(sem => {
        sem.courses.forEach(c => {
            if (c.grade && c.grade !== '') { 
                totalPoints += getGradePoint(c.grade) * c.credits;
                totalCredits += c.credits;
                hasGradedCourses = true;
            }
        });
    });

    if (!hasGradedCourses || totalCredits === 0) return '0.00';
    return (totalPoints / totalCredits).toFixed(2);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const performReset = () => {
    setSemesters([]);
    setIsResetModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-[#a8d5ba] selection:text-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222] p-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-[#a8d5ba] p-2 rounded-lg text-black">
                    <Calculator size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight">CGPA Calculator</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">School of Engineering and Technology</p>
                </div>
            </div>
            
            <div className="text-right">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total CGPA</span>
                <span className="text-3xl font-mono font-bold text-[#a8d5ba]">{calculateCGPA()}</span>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4 pb-24">
        {semesters.map((sem, idx) => (
            <SemesterCard 
                key={idx} 
                semester={sem} 
                semIndex={idx} 
                updateSemester={updateSemester}
                removeSemester={removeSemester}
            />
        ))}

        <div className="mt-8 flex flex-col gap-4 items-center justify-center text-center">
            {semesters.length === 0 && (
                <div className="text-gray-600 mb-4 p-8 border border-dashed border-[#333] rounded-xl w-full">
                    <p className="mb-2">No semesters added yet.</p>
                    <p className="text-sm">Click below to calculate your CGPA.</p>
                </div>
            )}
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 px-6 py-3 rounded-xl border border-[#333] transition-all w-full justify-center"
            >
                <div className="bg-[#333] group-hover:bg-[#444] p-1 rounded-full transition-colors">
                    <Plus size={18} />
                </div>
                <span>Add Semester</span>
            </button>
        </div>
      </main>

      <AddSemesterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addSemester}
      />

      <ConfirmModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={performReset}
        message="Are you sure you want to clear all data? This cannot be undone."
      />

      {/* Footer Controls */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button 
            onClick={handleResetClick}
            className="p-3 bg-[#1a1a1a] hover:bg-[#ff6b6b] hover:text-white text-gray-400 rounded-full shadow-lg border border-[#333] transition-colors"
            title="Reset All"
        >
            <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}