import React from "react";

// LoadingSpinner.jsx
// 사용법: import LoadingSpinner from './LoadingSpinner.jsx'
// <LoadingSpinner size={64} strokeWidth={6} color="#f59e0b" message="로딩 중..." overlay />

export default function LoadingSpinner({
  size = 48,
  strokeWidth = 4,
  color = "currentColor",
  className = "",
  message = "",
  overlay = false,
}) {
  const px = typeof size === "number" ? `${size}px` : size;
  const half = size / 2;
  const radius = half - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div>
      {overlay ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className={`flex flex-col items-center ${className}`}>
            <svg
              width={px}
              height={px}
              viewBox={`0 0 ${size} ${size}`}
              className="animate-spin"
              aria-hidden="true"
            >
              <circle
                cx={half}
                cy={half}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <circle
                cx={half}
                cy={half}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${circumference * 0.75} ${circumference}`}
              />
            </svg>
            {message ? <div className="mt-3 text-white text-sm">{message}</div> : null}
          </div>
        </div>
      ) : (
        <div className={`inline-flex flex-col items-center justify-center ${className}`} role="status" aria-live="polite">
          <svg
            width={px}
            height={px}
            viewBox={`0 0 ${size} ${size}`}
            className="animate-spin"
            aria-hidden="true"
          >
            <circle
              cx={half}
              cy={half}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={half}
              cy={half}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${circumference * 0.75} ${circumference}`}
            />
          </svg>
          {message ? <div className="mt-2 text-sm text-gray-600">{message}</div> : null}
        </div>
      )}
    </div>
  );
}
