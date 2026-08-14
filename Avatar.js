// @ts-nocheck
import React from 'react';
import { cn } from '../../lib/utils';

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
};

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}

const bgColors = [
  'bg-indigo-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-rose-500',
  'bg-cyan-500', 'bg-violet-500', 'bg-pink-500', 'bg-teal-500',
];

export function Avatar({ src = null, name = '', size = 'md', className = '' }) {
  const colorIndex = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % bgColors.length;

  return (
    <div className={cn(
      'relative inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden',
      'font-medium text-white',
      sizeClasses[size] || sizeClasses.md,
      !src && (bgColors[colorIndex] || bgColors[0]),
      className
    )}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

export default Avatar;
