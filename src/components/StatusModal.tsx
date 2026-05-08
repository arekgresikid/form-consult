import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'loading';
  title: string;
  message: React.ReactNode;
}

export default function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={type !== 'loading' ? onClose : undefined}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="p-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                {type === 'success' && (
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                )}
                {type === 'error' && (
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                )}
                {type === 'loading' && (
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-black animate-spin" />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-black tracking-tight">{title}</h3>
                <div className="text-gray-500 leading-relaxed text-sm">
                  {message}
                </div>
              </div>

              {/* Action */}
              {type !== 'loading' && (
                <div className="mt-8">
                  <button
                    onClick={onClose}
                    className="w-full py-4 bg-black text-white rounded-2xl font-medium tracking-wide hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
                  >
                    Tutup
                  </button>
                </div>
              )}
            </div>

            {/* Close icon for non-loading */}
            {type !== 'loading' && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
