import Link from "next/link";
import React from "react";
const Users = () =>{
    return (
            <ul className="mt-10">
                <li><Link href={"/Users/1"}>User 1</Link></li>
                <li><Link href={"/Users/2"}>User 2</Link></li>
            </ul>
    );
}

export default Users;