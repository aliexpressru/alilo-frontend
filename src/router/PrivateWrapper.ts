import React from "react";

interface PrivateWrapperProps {
    children: React.ReactNode;
}
// todo переписать с редиректом на 404
const PrivateWrapper: React.FC<PrivateWrapperProps> = ({children}) : React.ReactNode => {
    return children;
};

export default PrivateWrapper;
