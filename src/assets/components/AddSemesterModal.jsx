// src/components/AddSemesterModal.jsx
import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { SEMESTER_DATA } from '../../utils/constants';

const AddSemesterModal = ({ isOpen, onClose, onAdd, existingSemesters = [] }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSem, setSelectedSem] = useState('');

    const years = Object.keys(SEMESTER_DATA);
    const semesters = selectedYear ? Object.keys(SEMESTER_DATA[selectedYear]) : [];
    
    const constructedTitle = `${selectedYear} - ${selectedSem}`;
    const isDuplicate = existingSemesters.includes(constructedTitle);

    const handleAdd = () => {
        if (!selectedYear || !selectedSem || isDuplicate) return;
        
        const presetCourses = SEMESTER_DATA[selectedYear][selectedSem].map(c => ({
            ...c,
            grade: '', 
            intObt: '',
            extObt: '',
            intMax: c.intMax ?? 30,
            extMax: c.extMax ?? 70,
            isLocked: true,
            penalty: 0 // Default: Regular Exam (0 penalty)
        }));

        onAdd(presetCourses, constructedTitle);
        onClose();
        setSelectedYear('');
        setSelectedSem('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-zinc-100">Add Semester</h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-100 transition-colors p-1 rounded-lg hover:bg-zinc-800">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase tracking-wider font-bold mb-3">Select Year</label>
                        <div className="grid grid-cols-2 gap-3">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => { setSelectedYear(year); setSelectedSem(''); }}
                                    className={`p-3.5 rounded-xl text-sm font-medium transition-all border ${
                                        selectedYear === year 
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50 shadow-sm' 
                                        : 'bg-zinc-800 text-zinc-400 border-zinc-800 hover:bg-zinc-700 hover:border-zinc-600'
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedYear && (
                        <div>
                            <label className="block text-xs text-zinc-500 uppercase tracking-wider font-bold mb-3">Select Semester</label>
                            <div className="grid grid-cols-1 gap-2">
                                {semesters.map(sem => (
                                    <button
                                        key={sem}
                                        onClick={() => setSelectedSem(sem)}
                                        className={`p-3.5 rounded-xl text-sm text-left font-medium transition-all border ${
                                            selectedSem === sem 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50 shadow-sm' 
                                            : 'bg-zinc-800 text-zinc-400 border-zinc-800 hover:bg-zinc-700 hover:border-zinc-600'
                                        }`}
                                    >
                                        {sem}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isDuplicate && (
                        <div className="flex items-center gap-3 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
                            <AlertCircle size={18} />
                            <span className="font-medium">This semester has already been added.</span>
                        </div>
                    )}

                    <button
                        disabled={!selectedYear || !selectedSem || isDuplicate}
                        onClick={handleAdd}
                        className={`w-full py-4 rounded-xl mt-2 font-bold text-base transition-all ${
                            selectedYear && selectedSem && !isDuplicate
                            ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-lg shadow-emerald-900/20' 
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                        }`}
                    >
                        {isDuplicate ? 'Semester Exists' : 'Load Subjects'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSemesterModal;