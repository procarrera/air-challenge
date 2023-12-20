import { Shell } from "lucide-react";

export default function LoadingMedia() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Shell
                className="w-8 h-8 text-gray-200 animate-spin"
                size={32}
                strokeWidth={2} />
        </div>
    );
};