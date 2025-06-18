import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import React from "react";

function Home() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
            <div className="min-w-4xl min-h-[80vh] bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
                <div className="px-5 py-5 flex-1 h-full flex flex-col">
                    <div id="title" className="text-center text-lg font-medium text-slate-700">Merge Request Generator</div>
                    <div className="flex gap-5 mt-5 h-full flex-1">
                        <div className="w-full h-full">
                            <div className="space-y-2">
                                <Label className="pl-1">Request Title</Label>
                                <Input type="text"/>
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label className="pl-1">Teams Link</Label>
                                <Input type="text"/>
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label className="pl-1">Deployment Steps</Label>
                                <div className="flex gap-2">
                                    <Input type="text"/>
                                    <Button><PlusIcon className="text-slate-500"/></Button>
                                </div>
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label className="pl-1">DB Backup</Label>
                                <div className="flex gap-2">
                                    <Input type="text"/>
                                    <Button><PlusIcon className="text-slate-500"/></Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-full flex-1 h-full flex flex-col">
                                <div className="border border-slate-200/75 rounded-md w-full flex-1 overflow-auto bg-slate-50/30">
                                </div>
                                <div className="mt-2 flex justify-end">
                                    <Button className="text-slate-600">Copy Template</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
