import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-1.5">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:text-white transition-all ${
                        error ? "border-rose-500 focus:ring-rose-500" : ""
                    } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
