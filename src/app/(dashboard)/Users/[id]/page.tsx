import React from "react";
const UserID= ({params}:{params:{id:string}}) =>{
 const {id} =params;
    return(<h1>User Detail {id}</h1>);
}

export default UserID;