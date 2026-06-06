import http from "http";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const PORT = process.env.PORT || 5174;
const guestsPath = path.resolve(process.cwd(), "public", "data", "guests.json");

function sendJSON(res, code, obj) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (req.method === "POST" && req.url === "/api/rsvp") {
    try {
      let body = "";
      for await (const chunk of req) body += chunk;
      const data = JSON.parse(body || "{}");

      if (!data.code) return sendJSON(res, 400, { error: "Missing code" });

      const raw = await readFile(guestsPath, "utf8");
      const guests = JSON.parse(raw);
      const idx = guests.findIndex((g) => g.code === data.code);
      if (idx === -1) return sendJSON(res, 404, { error: "Guest not found" });

      // attach response data and timestamp
      guests[idx] = {
        ...guests[idx],
        rsvp: true,
        response: data.response || {},
        updatedAt: data.timestamp || new Date().toISOString(),
      };

      await writeFile(guestsPath, JSON.stringify(guests, null, 2), "utf8");

      return sendJSON(res, 200, { ok: true, guest: guests[idx] });
    } catch (err) {
      console.error("RSVP API error:", err);
      return sendJSON(res, 500, { error: "Server error" });
    }
  }

  // fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`),
);
