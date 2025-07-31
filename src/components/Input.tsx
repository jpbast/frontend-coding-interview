type InputProps = {
  label: string;
  onForgotPassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, onForgotPassword, ...props }: InputProps) => {
  return (
    <label className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between flex-wrap gap-1">
        <span className="text-sm font-bold">{label}</span>
        {props.type === "password" && (
          <button
            className="text-sm text-text-secondary cursor-pointer transition hover:brightness-85"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword?.();
            }}
          >
            Forgot password?
          </button>
        )}
      </div>
      <input
        {...props}
        className="w-full h-11 rounded-lg px-2 border border-border-default"
      />
    </label>
  );
};

export default Input;
