// Write your server logic here
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/questions") {
      const questions = await fs.promises.readFile("questions.json", "utf8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(questions);
      return;
    }

    let filePath = path.join(
      PUBLIC_DIR,
      req.url === "/" ? "index.html" : req.url
    );
    const ext = path.extname(filePath);

    const contentTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".json": "application/json",
    };

    const contentType = contentTypes[ext] || "text/plain";

    const data = await fs.promises.readFile(filePath, "utf8");
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(500);
      res.end("Server error");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
