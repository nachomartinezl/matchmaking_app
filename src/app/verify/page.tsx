// src/app/verify/page.tsx

import { Suspense } from 'react';
import VerifyClientComponent from './VerifyClientComponent';

// This is a minimal loading UI that Suspense will show instantly.
// It will be replaced by the real content from VerifyClientComponent once it loads.
function LoadingFallback() {
  return (
    <div className="form-container">
      <h2>Verifying your email…</h2>
      <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
        <div className="spinner" />
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <VerifyClientComponent />
      </Suspense>
    </div>
  );
}