import type { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  onClick: () => void;
  variant?: "cancel" | "action";
}

function Button({ children, onClick, variant = "action" }: PropsType) {
  const base = "rounded-xl cursor-pointer px-6 py-3";

  const styles = {
    action:
      base +
      " bg-zinc-400 text-white font-semibold text-2xl hover:bg-zinc-600 transition",
    cancel:
      base +
      " bg-white text-black border border-gray-300 text-2xl hover:bg-gray-200/70 transition",
  };

  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

{
  /* <button
              onClick={handleToggle}
              className="rounded-xl cursor-pointer px-6 py-3 bg-white text-black border border-gray-300 text-2xl hover:bg-gray-200/70 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="rounded-xl cursor-pointer px-6 py-3 bg-zinc-400 text-white font-semibold text-2xl hover:bg-zinc-600 transition"
            >
              Save Changes
            </button> */
}
