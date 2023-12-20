import { createContext, useState } from "react";

interface SelectionContextType {
    selectedIndexesCtx: number[];
    updateSelectedIndexesCtx: (indexes: number[]) => void;
}

export const SelectionContext = createContext<SelectionContextType>({} as SelectionContextType);
export const SelectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedIndexesCtx, setSelectedIndexesCtx] = useState<number[]>([]);

    function updateSelectedIndexesCtx(indexex: number[]) {
        setSelectedIndexesCtx(indexex);
    }

    return (
        <SelectionContext.Provider value={{ selectedIndexesCtx, updateSelectedIndexesCtx }}>
            {children}
        </SelectionContext.Provider>
    );
};