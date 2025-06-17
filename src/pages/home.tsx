import React from "react";

function Home() {
    const [title, setTitle] = React.useState();

    return (
        <section>
            <div className="h-[10vh] flex flex-col items-center justify-center">
                <h1 className="font-bold text-slate-600 text-xl text-center">Merge Request Template Generator</h1>
            </div>
            <div className="flex gap-2">
                <div className="min-h-[90vh] w-full bg-red-200"></div>
                <div className="min-h-[90vh] w-full bg-yellow-200"></div>
            </div>
        </section>
    );
}
export default Home;
