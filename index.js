import config from "./configLoader.js";
import startProposalMonitor from "./monitor.js";

console.log("Loaded config:", config);
startProposalMonitor(config);
