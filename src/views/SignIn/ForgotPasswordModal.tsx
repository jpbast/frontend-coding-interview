import Button from "@/components/Button";

type ForgotPasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

const ForgotPasswordModal = ({ open, onClose }: ForgotPasswordModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-background-inverted/80 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-lg font-bold text-text-primary mb-4">
          Forgot Password?
        </h2>
        <p className="text-xs mb-4 leading-5">
          Check the project&apos;s environment variables for the actual
          credentials. If you don&apos;t have set them yet, please define{" "}
          <span className="font-bold text-text-secondary">AUTH_USERNAME</span>{" "}
          and{" "}
          <span className="font-bold text-text-secondary">AUTH_PASSWORD</span>{" "}
          into your{" "}
          <code className="p-1 bg-neutral-200 rounded">
            .env.development.local
          </code>{" "}
          file.
        </p>
        <Button onClick={onClose}>Got it!</Button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
