import  { type ReactNode } from "react";

import { ScrollProgress } from "./reveal";
import DroneButton from "./dronebutton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
    
      
    
      <main className="flex-1">{children}</main>
      
      
     
    </div>
  );
}


