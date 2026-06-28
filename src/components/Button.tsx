type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  children,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}