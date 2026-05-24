import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
    return (
        <Toaster
            position="top-right"
            containerStyle={{
                top: 80,
                right: 10,
            }}
            toastOptions={{
                
                style: {
                    minWidth: "280px",
                    maxWidth: "360px",
                    textAlign: "center",
                    background: "var(--butter-cream-100)",
                    color: "var(--deep-lavender-500)",
                    border: "1px solid var(--soft-lavender-300)",
                    borderRadius: "0px",
                    padding: "12px 16px",
                    fontWeight: "500",
                },

                success: {
                    style: {
                        
                        borderLeft: "3px solid #61d345",
                        color: "var(--deep-lavender-500)",
                    },
                },

                error: {
                    style: {
                        
                        borderLeft: "3px solid #E63946",
                        color: "var(--deep-lavender-500)",
                    },
                },
            }}
        />
    );
}