import { createRoot } from "react-dom/client";
import React, { StrictMode, lazy, Suspense } from "react";
import { kcContext } from "./KcApp/kcContext";
import BGParticles from "./KcApp/BGParticles";

const App = lazy(() => import("./App"));
const KcApp = lazy(() => import("./KcApp"));

if (kcContext !== undefined) {
    console.log(kcContext);
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>{kcContext === undefined ? <App /> : <>
            <BGParticles/>
            <KcApp kcContext={kcContext} />
        </>}</Suspense>
    </StrictMode>,
);
