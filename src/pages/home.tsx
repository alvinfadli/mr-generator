import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function Home() {
    return (
        <section className="h-screen flex flex-col">
            {/* Header Section */}
            <div className="h-[10vh] flex items-center justify-center">
                <h1 className="font-bold text-slate-600 text-xl text-center">
                    Merge Request Template Generator
                </h1>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 overflow-hidden">
                {/* Scrollable Left Panel */}
                <div className="w-1/2 h-full overflow-y-auto p-8 space-y-3">
                    <div>
                        <Label htmlFor="title" className="pl-1">Title</Label>
                        <Input name="title" type="text" placeholder="" className="mt-2"/>      
                    </div>
                    <div>
                        <Label htmlFor="team_link" className="pl-1">MS Team Link</Label>
                        <Input name="team_link" type="text" placeholder="" className="mt-2"/>      
                    </div>        
                    <div>
                        <Label htmlFor="title" className="pl-1">Deployment Step</Label>
                        <Input name="title" type="text" placeholder="" className="mt-2"/>      
                    </div>
                    <div>
                        <Label htmlFor="title" className="pl-1">Database Backup</Label>
                        <Input name="title" type="text" placeholder="" className="mt-2"/>      
                    </div>                   
                </div>

                {/* Result Section */}
                <div className="w-1/2 h-full p-8">
                    <div className="w-full h-full border border-slate-200 rounded-md">

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
