// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Calculator, GraduationCap, Github, Mail, Linkedin } from 'lucide-react';

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
                // Ensure grade point is valid
                const gp = getGradePoint(c.grade);
                if (gp >= 0) {
                    totalPoints += gp * c.credits;
                    totalCredits += c.credits;
                    hasGradedCourses = true;
                }
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

  const existingSemesterTitles = semesters.map(s => s.title);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/20">
                    <GraduationCap size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight text-white">CGPA Calculator</h1>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">School of Engineering</p>
                </div>
            </div>
            
            <div className="text-right">
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Total CGPA</span>
                <span className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-sm">{calculateCGPA()}</span>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto w-full p-4 flex-grow">
        <div className="space-y-6">
            {semesters.map((sem, idx) => (
                <SemesterCard 
                    key={idx} 
                    semester={sem} 
                    semIndex={idx} 
                    updateSemester={updateSemester}
                    removeSemester={removeSemester}
                />
            ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 items-center justify-center text-center">
            {semesters.length === 0 && (
                <div className="text-zinc-500 p-10 border-2 border-dashed border-zinc-800 rounded-2xl w-full bg-zinc-900/30">
                    <div className="bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
                        <Calculator size={32} />
                    </div>
                    <p className="mb-2 font-medium text-zinc-300">No semesters added yet</p>
                    <p className="text-sm">Add your first semester to start calculating.</p>
                </div>
            )}
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-3 bg-zinc-100 hover:bg-white text-zinc-900 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-zinc-900/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                <div className="bg-zinc-300 group-hover:bg-zinc-200 p-1 rounded-full transition-colors">
                    <Plus size={20} />
                </div>
                <span>Add Semester</span>
            </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950/50 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
            
            {/* Reset Button */}
            <button 
                onClick={handleResetClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/50 transition-all text-xs font-medium group"
            >
                <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
                <span>Reset All Data</span>
            </button>

            <div className="w-full max-w-[200px] h-px bg-zinc-900"></div>

            <div className="flex items-center gap-5">
                <a 
                    href="https://github.com/ompatole" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-medium"
                >
                    <Github size={12} />
                    <span>GitHub</span>
                </a>
                <a 
                    href="https://www.linkedin.com/in/ompatole" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-medium"
                >
                    <Linkedin size={12} />
                    <span>LinkedIn</span>
                </a>
                <a 
                    href="mailto:contact@ompatole.com" 
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-medium"
                >
                    <Mail size={12} />
                    <span>Contact</span>
                </a>
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
                    <span>&copy; {new Date().getFullYear()} Om Patole. All rights reserved.</span>
                </div>
                <div className="text-[10px] text-zinc-600 flex items-center justify-center gap-1.5">
                    <span>Built with</span>
                    <span className="text-zinc-500">React</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-700"></span>
                    <span className="text-zinc-500">Vite</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-700"></span>
                    <span className="text-zinc-500">Tailwind</span>
                </div>
            </div>
        </div>
      </footer>

      <AddSemesterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addSemester}
        existingSemesters={existingSemesterTitles}
      />

      <ConfirmModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={performReset}
        message="Are you sure you want to clear all data? This cannot be undone."
      />
    </div>
  );
}