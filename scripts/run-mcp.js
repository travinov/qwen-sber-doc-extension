#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

function resolveLaunchTarget() {
  const explicitEntry = process.env.QWEN_SBER_DOC_MCP_ENTRY;
  if (explicitEntry && fs.existsSync(explicitEntry)) {
    return { mode: "node-entry", entry: explicitEntry };
  }

  const siblingDistEntry = path.resolve(__dirname, "../../qwen-sber-doc-mcp/dist/src/index.js");
  if (fs.existsSync(siblingDistEntry)) {
    return { mode: "node-entry", entry: siblingDistEntry };
  }

  const localNodeModulesEntry = path.resolve(
    __dirname,
    "../node_modules/qwen-sber-doc-mcp/dist/src/index.js"
  );
  if (fs.existsSync(localNodeModulesEntry)) {
    return { mode: "node-entry", entry: localNodeModulesEntry };
  }

  return { mode: "npx-package" };
}

function main() {
  const target = resolveLaunchTarget();
  const spawnArgs =
    target.mode === "node-entry"
      ? [process.execPath, [target.entry]]
      : [process.platform === "win32" ? "npx.cmd" : "npx", ["--yes", "qwen-sber-doc-mcp"]];

  const child = spawn(spawnArgs[0], spawnArgs[1], { stdio: "inherit", env: process.env });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 1);
  });
}

main();
