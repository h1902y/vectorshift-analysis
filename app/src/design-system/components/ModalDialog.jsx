import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

/**
 * ModalDialog - Accessible broadsheet modal with backdrop blur, scroll locking, and ESC listener
 */
export function ModalDialog({
  isOpen,
  onClose,
  title,
  subtitle = null,
  children,
  maxWidth = '960px'
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="modal-container"
        style={{ maxWidth }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            {subtitle && (
              <div style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                color: 'var(--accent-burgundy)', 
                letterSpacing: '0.06em',
                marginBottom: '0.2rem'
              }}>
                {subtitle}
              </div>
            )}
            <h3 style={{ 
              fontFamily: 'var(--font-serif-headline)', 
              fontSize: '1.25rem', 
              color: 'var(--ink-primary)',
              lineHeight: 1.2
            }}>
              {title}
            </h3>
          </div>

          <Button
            variant="icon"
            onClick={onClose}
            title="Close dialog (Esc)"
            icon={<X size={18} />}
          />
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
