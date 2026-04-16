const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC = path.join(__dirname, "public");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

const server = http.createServer((req, res) => {
  let file = req.url === "/" ? "/index.html" : req.url;
  file = path.normalize(file).replace(/^(\.\.[\\/])+/, "");
  const fullPath = path.join(PUBLIC, file);

  if (!fullPath.startsWith(PUBLIC)) {
    res.writeHead(403);
    res.end("Prohibido");
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("No encontrado");
      return;
    }
    const ext = path.extname(fullPath);
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
