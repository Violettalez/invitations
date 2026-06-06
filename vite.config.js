import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: "watch-rsvp-api",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === "POST" && req.url === "/api/rsvp") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              try {
                const data = JSON.parse(body);
                const guestsPath = path.resolve(
                  __dirname,
                  "public",
                  "data",
                  "guests.json",
                );

                // Читаем текущий файл
                const fileData = fs.readFileSync(guestsPath, "utf8");
                const guests = JSON.parse(fileData);

                // Ищем гостя и обновляем
                const idx = guests.findIndex((g) => g.code === data.code);
                if (idx !== -1) {
                  guests[idx] = {
                    ...guests[idx],
                    rsvp: true,
                    response: data.response || {},
                    updatedAt: data.timestamp || new Date().toISOString(),
                  };

                  // Записываем обратно
                  fs.writeFileSync(
                    guestsPath,
                    JSON.stringify(guests, null, 2),
                    "utf8",
                  );

                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ ok: true }));
                } else {
                  res.writeHead(404, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "Guest not found" }));
                }
              } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      },
    },
  ],
  base: "/violettalez.github.io/invitations/",
});
