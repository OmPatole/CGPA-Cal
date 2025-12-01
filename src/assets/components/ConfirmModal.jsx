// src/components/ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] rounded-xl border border-[#333] w-full max-w-sm p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-[#e0e0e0] mb-2">Confirm Action</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-[#2a2a2a] text-gray-300 hover:bg-[#333] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 rounded-lg bg-[#ff6b6b] text-white hover:bg-[#fa5252] transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;