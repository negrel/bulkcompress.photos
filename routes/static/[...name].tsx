import { Handlers } from "$fresh/server.ts";
import { extname } from "$std/path/extname.ts";

const contentTypes = new Map([
  [".html", "text/plain"],
  [".ts", "application/typescript"],
  [".js", "application/javascript"],
  [".tsx", "text/tsx"],
  [".jsx", "text/jsx"],
  [".json", "application/json"],
  [".wasm", "application/wasm"],
]);

export const handler: Handlers = {
  async GET(req, _ctx) {
    console.log("static");
    const reqUrl = new URL(req.url);
    const filepath = "./static" + reqUrl.pathname.slice("/static".length);

    const headers = new Headers();

    const contentType = contentTypes.get(extname(filepath));
    headers.set("Content-Type", contentType ?? "text/plain");
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");

    const file = await Deno.open(filepath);
    return new Response(file.readable, { headers });
  },
};
