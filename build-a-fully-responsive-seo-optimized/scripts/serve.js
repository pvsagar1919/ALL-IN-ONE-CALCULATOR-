const fs = require("fs");
const http = require("http");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const startPort = Number(process.env.PORT || 4173);
const host = "127.0.0.1";
const portFile = path.join(rootDir, ".server-port");
const errorFile = path.join(rootDir, ".server-error.log");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

function createServer() {
  return http.createServer((request, response) => {
    const requestUrl = new URL(request.url, "http://" + request.headers.host);
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.includes("\0")) {
      response.writeHead(400);
      response.end("Bad request");
      return;
    }

    let filePath = path.resolve(rootDir, "." + pathname);
    if (!filePath.startsWith(rootDir)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    } else if (!path.extname(filePath)) {
      const cleanUrlPage = path.join(filePath, "index.html");
      if (fs.existsSync(cleanUrlPage)) {
        filePath = cleanUrlPage;
      }
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }
      const ext = path.extname(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      response.end(content);
    });
  });
}

function listen(port) {
  const server = createServer();
  server.on("error", error => {
    if (error.code === "EADDRINUSE" && port < startPort + 20) {
      listen(port + 1);
      return;
    }
    fs.writeFileSync(errorFile, error.stack || String(error), "utf8");
    throw error;
  });
  server.listen(port, host, () => {
    fs.writeFileSync(portFile, "http://" + host + ":" + port + "/\n", "utf8");
  });
}

listen(startPort);
