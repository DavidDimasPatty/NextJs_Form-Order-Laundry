import Link from "next/link";
import React, { Suspense } from "react";
import Loading from "./loading";
const Dashboard = () => {
    // throw new Error("not Implemented aa");
    return (
          <Suspense fallback={<Loading />}>
            <ul className="mt-10">
              <li>Dashboard</li>
            </ul>
          </Suspense>
      );
}

export default Dashboard;