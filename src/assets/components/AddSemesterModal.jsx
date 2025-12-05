// src/assets/components/AddSemesterModal.jsx
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
        // Fixed syntax error here (removed 'Hz')
        if (!selectedYear || !selectedSem || isDuplicate) return;
        
        const presetCourses = SEMESTER_DATA[selectedYear][selectedSem].map(c => ({
            ...c,
            grade: '', 
            intObt: '',
            extObt: '',
            intMax: c.intMax ?? 30,
            extMax: c.extMax ?? 70,
            isLocked: true,
            isReExam: false // Initialize re-exam state
        }));

        onAdd(presetCourses, constructedTitle);
        onClose();
        setSelectedYear('');
        setSelectedSem('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1e1e1e] rounded-xl border border-[#333] w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#e0e0e0]">Add Semester</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Select Year</label>
                        <div className="grid grid-cols-2 gap-2">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => { setSelectedYear(year); setSelectedSem(''); }}
                                    className={`p-3 rounded-lg text-sm border transition-all ${
                                        selectedYear === year 
                                        ? 'bg-[#a8d5ba] text-black border-[#a8d5ba] font-bold' 
                                        : 'bg-[#2a2a2a] text-gray-300 border-[#333] hover:border-[#555]'
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedYear && (
                        <div>
                            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Select Semester</label>
                            <div className="grid grid-cols-1 gap-2">
                                {semesters.map(sem => (
                                    <button
                                        key={sem}
                                        onClick={() => setSelectedSem(sem)}
                                        className={`p-3 rounded-lg text-sm text-left border transition-all ${
                                            selectedSem === sem 
                                            ? 'bg-[#8ab4f8] text-black border-[#8ab4f8] font-bold' 
                                            : 'bg-[#2a2a2a] text-gray-300 border-[#333] hover:border-[#555]'
                                        }`}
                                    >
                                        {sem}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isDuplicate && (
                        <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-sm">
                            <AlertCircle size={16} />
                            <span>This semester has already been added.</span>
                        </div>
                    )}

                    <button
                        disabled={!selectedYear || !selectedSem || isDuplicate}
                        onClick={handleAdd}
                        className={`w-full py-4 rounded-xl mt-4 font-bold transition-all ${
                            selectedYear && selectedSem && !isDuplicate
                            ? 'bg-[#e0e0e0] text-black hover:bg-white' 
                            : 'bg-[#333] text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isDuplicate ? 'Already Added' : 'Load Subjects'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSemesterModal;