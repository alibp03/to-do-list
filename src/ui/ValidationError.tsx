import type { ReactNode } from "react";

function ValidationError({ error }: { error: ReactNode }) {
  return (
    <>
      {error && (
        <span className="text-xl text-red-600 tracking-wider">{error}</span>
      )}
    </>
  );
}

export default ValidationError;
