import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          padding: "8px 16px",
          borderRadius: "16px",
          lineHeight: "24px",
          color: "#1f1c14",
          background: "#f8f8f1",
        },
        duration: 10000,
      }}
    />
  );
};

export default ToastProvider;
