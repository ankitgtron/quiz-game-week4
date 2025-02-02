const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public"); // Path to the public folder
const QUESTIONS_FILE = path.join(__dirname, "questions.json");

const server = http.createServer((req, res) => {
  // Serve questions from the /questions endpoint
  if (req.url === "/questions") {
    fs.readFile(QUESTIONS_FILE, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read questions" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else {
    // Serve static files from the public folder
    const filePath = path.join(
      PUBLIC_DIR,
      req.url === "/" ? "index.html" : req.url
    );
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      } else {
        // Set the correct content type based on the file extension
        const ext = path.extname(filePath);
        let contentType = "text/html";
        if (ext === ".css") {
          contentType = "text/css";
        } else if (ext === ".js") {
          contentType = "application/javascript";
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
