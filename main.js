import { dotnet } from './_framework/dotnet.js'

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

// ---- LOADING TEXT ANIMATION ----
const loadingEl = document.querySelector(".loading");

let dots = 0;
const loadingInterval = setInterval(() => {
    if (!loadingEl) return;
    loadingEl.textContent = "Loading" + ".".repeat(dots);
    dots = (dots + 1) % 4;
}, 500);
// --------------------------------

const dotnetRuntime = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

const config = dotnetRuntime.getConfig();

clearInterval(loadingInterval);

await dotnetRuntime.runMain(config.mainAssemblyName, [globalThis.location.href]);
