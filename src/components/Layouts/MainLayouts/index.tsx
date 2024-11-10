import React, { ReactNode } from 'react';
import Header from "@/components/Modules/Elements/Header";

interface MainLayoutsProps {
    children: ReactNode;
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="">
                {children}
            </div>
        </div>
    );
}

export default MainLayouts;
