
export const EquipmentView = ({ type, isTripped }: { type: string, isTripped: boolean }) => {
  
  // --- 1. BUS VIEW ---
  if (type === 'bus') {
    return (
      <svg viewBox="0 0 400 300" width="100%" height="300">
        <rect x="50" y="100" width="300" height="20" fill={isTripped ? "#e53e3e" : "#2d3748"} rx="4" />
        <text x="50" y="90" fontSize="12" fontWeight="bold" fill="#4a5568">ZONE 87B DIFFERENTIAL BUS</text>
        {isTripped && (
          <g>
            <circle cx="200" cy="110" r="40" fill="none" stroke="#e53e3e" strokeWidth="2" strokeDasharray="4,4">
                <animate attributeName="r" values="30;50;30" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="155" y="160" fill="#e53e3e" fontWeight="bold" fontSize="14">🔥 BUS FAULT</text>
          </g>
        )}
      </svg>
    );
  }

  // --- 2. LINE VIEW ---
  if (type === 'line') {
    return (
      <svg viewBox="0 0 400 300" width="100%" height="300">
        <path d="M50,250 L80,50 L110,250 M60,100 L100,100" stroke="#4a5568" fill="none" strokeWidth="3" />
        <path d="M290,250 L320,50 L350,250 M300,100 L340,100" stroke="#4a5568" fill="none" strokeWidth="3" />
        <line x1="80" y1="50" x2="320" y2="50" stroke={isTripped ? "#cbd5e0" : "#2d3748"} strokeWidth="2" strokeDasharray={isTripped ? "5,5" : "0"} />
        <text x="130" y="40" fontSize="10" fill="#718096">ANSI 21 DISTANCE PROTECTION ZONE</text>
        {isTripped && <text x="140" y="80" fill="#e53e3e" fontWeight="bold">⚡ LINE FAULT</text>}
      </svg>
    );
  }

  // --- 3. MOTOR & TRANSFORMER (ONE-LINE VIEW) ---
  const isMotor = type === 'motor';

  return (
    <svg viewBox="0 0 400 300" width="100%" height="300">
      {/* Top Bus */}
      <line x1="50" y1="30" x2="350" y2="30" stroke="#2d3748" strokeWidth="6" />
      
      {/* Breaker / Contactor */}
      <g transform="translate(175, 70)">
        <rect x="0" y="0" width="50" height="60" fill={isTripped ? "#fff5f5" : "#f0fff4"} stroke={isTripped ? "#e53e3e" : "#48bb78"} strokeWidth="3" rx="4" />
        <line x1="25" y1="10" x2={isTripped ? "45" : "25"} y2={isTripped ? "20" : "50"} stroke={isTripped ? "#e53e3e" : "#48bb78"} strokeWidth="4" style={{ transition: 'all 0.4s' }} />
        <text x="5" y="-5" fontSize="9" fontWeight="bold" fill="#4a5568">{isMotor ? "CONTACTOR" : "BREAKER 52"}</text>
      </g>

      <line x1="200" y1="30" x2="200" y2="70" stroke="#2d3748" strokeWidth="3" />
      <line x1="200" y1="130" x2="200" y2="170" stroke={isTripped ? "#cbd5e0" : "#2d3748"} strokeWidth="3" />

      {/* Load View */}
      <g transform="translate(200, 170)">
        {isMotor ? (
          <g>
            <circle cx="0" cy="50" r="45" fill="none" stroke="#2d3748" strokeWidth="5" />
            <g style={{ transformOrigin: '0px 50px', animation: isTripped ? 'none' : 'spin 2s linear infinite' }}>
              <circle cx="0" cy="50" r="30" fill="#edf2f7" />
              <rect x="-2" y="25" width="4" height="50" fill="#4a5568" />
              <rect x="-25" y="48" width="50" height="4" fill="#4a5568" />
            </g>
            <text x="-12" y="55" fontWeight="bold" fill="#2d3748" fontSize="16">M</text>
          </g>
        ) : (
          <g>
            <circle cx="0" cy="25" r="25" fill="none" stroke="#2d3748" strokeWidth="4" />
            <circle cx="0" cy="55" r="25" fill="none" stroke="#2d3748" strokeWidth="4" />
            {isTripped && (
              <path d="M-10,40 L10,30 L-10,20 L10,10" stroke="#ecc94b" strokeWidth="3" fill="none">
                <animate attributeName="opacity" values="0;1;0" dur="0.2s" repeatCount="indefinite" />
              </path>
            )}
            <text x="-15" y="100" fontWeight="bold" fill="#2d3748" fontSize="12">TX-01</text>
          </g>
        )}
      </g>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </svg>
  );
};
