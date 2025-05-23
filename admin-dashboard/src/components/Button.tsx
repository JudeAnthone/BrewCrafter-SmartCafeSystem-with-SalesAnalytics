interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({ 
  variant = "primary", 
  size = "md", 
  children,
  className = "", 
  ...props 
}: ButtonProps) {
  const baseClasses = "rounded-lg font-medium transition-colors";
  
  const variantClasses = {
    primary: "bg-[#3e2723] text-white hover:bg-[#5d4037]",
    secondary: "bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white",
    outline: "bg-transparent border border-[#e4c9a7] text-[#3e2723] hover:bg-[#f8f4e5]"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}