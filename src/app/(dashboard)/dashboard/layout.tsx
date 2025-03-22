import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            Root Dashboard
            {children}
        </div>
    )
}

export default Layout;