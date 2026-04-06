#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

function resolveEntry() {
  const explicitEntry = process.env.QWEN_SBER_DOC_MCP_ENTRY;
  if (explicitEntry && fs.existsSync(explicitEntry)) {
    return explicitEntry;
  }

  const siblingDistEntry = path.resolve(__dirname, "../../qwen-sber-doc-mcp/dist/src/index.js");
  if (fs.existsSync(siblingDistEntry)) {
    return siblingDistEntry;
  }

  const localNodeModulesEntry = path.resolve(
    __dirname,
    "../node_modules/qwen-sber-doc-mcp/dist/src/index.js"
  );
  if (fs.existsSync(localNodeModulesEntry)) {
    return localNodeModulesEntry;
  }

  throw new Error(
    [
      "Unable to resolve qwen-sber-doc-mcp entry point.",
      "Set QWEN_SBER_DOC_MCP_ENTRY to the built dist/src/index.js path",
      "or place the qwen-sber-doc-mcp repository next to this extension.",
    ].join(" ")
  );
}

function main() {
  const entry = resolveEntry();
  const child = spawn(process.execPath, [entry], {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 1);
  });
}

main();
