import React, { useRef, useState, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';

export function ProfileCard({ className = '' }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.25 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h1902y-profile-card-wrapper ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* ── BLUEPRINT DRAFTING BOARD FRAMING (SHARP 90° CAD VERTICES) ── */}
      <div className="h1902y-blueprint-frame" aria-hidden="true">
        <span className="corner-node tl" />
        <span className="corner-node tr" />
        <span className="corner-node bl" />
        <span className="corner-node br" />
        <span className="pill-handle left" />
        <span className="pill-handle right" />
      </div>

      {/* ── AMBIENT MULTI-COLOR BACK-BLOOM ── */}
      <div
        aria-hidden="true"
        className={`h1902y-profile-back-bloom ${isHovered ? 'hovered' : ''}`}
      />

      {/* ── TOP FLOATING STATUS CHIP ── */}
      <div className="h1902y-profile-status-bar" style={{ justifyContent: 'flex-end' }}>
        <div className="h1902y-status-chip telemetry">
          <span>🇮🇳 Bengaluru, IST</span>
        </div>
      </div>

      {/* ── 3D TRANSFORMED CARD CONTAINER ── */}
      <div
        className="h1902y-profile-card-3d"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Mouse-Tracking Sheen / Glare Overlay */}
        <div
          aria-hidden="true"
          className="h1902y-profile-glare-overlay"
          style={{
            background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
          }}
        />

        {/* High-Resolution Portrait Filling Center */}
        <div
          className="h1902y-profile-portrait-container"
          style={{
            transform: `translateZ(15px) translateY(${isHovered ? '-2px' : '0px'})`,
          }}
        >
          <img
            src="/images/harshit_max_out.png"
            alt="Harshit · AI Product Manager & Architect"
            className="h1902y-profile-portrait-img"
            loading="eager"
          />

          {/* Bottom Card Bio / Portfolio Caption Strip */}
          <a
            href="https://h1902y.com"
            target="_blank"
            rel="noreferrer"
            className="h1902y-profile-caption-strip"
            title="Visit h1902y.com"
          >
            <div className="h1902y-caption-info">
              <span className="h1902y-caption-name">Harshit Choudhary</span>
              <span className="h1902y-caption-title">AI Product Manager &middot; h1902y.com</span>
            </div>
            <ExternalLink size={13} className="h1902y-caption-link-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
