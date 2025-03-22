import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            Root User
            {children}
        </div>
    )
}

export default Layout;