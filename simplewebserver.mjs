import { createApp } from "https://servestjs.org/@v1.1.0/mod.ts"; // https://servestjs.org/

const api = (token, path, req) => {
  const res = {
    yourToken: token,
    yourPath: path,
    nActions: req.actions.length,
  };
  return res;
};

const CONTENT_TYPE = {
  "html": "text/html; charset=utf8",
  "js": "application/javascript",
  "mjs": "application/javascript",
  "jpg": "image/jpeg",
  "png": "image/png",
};

const app = createApp();
app.handle(/\/*/, async (req) => {
  try {
    /*
    const token = req.headers.get("Authorization");
    const json = await req.json();
    console.log("req", json);
    const res = api(token, req.path, json);
    console.log("res", res);
    await req.respond({
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(res),
    });
    */
    const fn = req.path === "/" ? "/index.html" : req.path;
    console.log(fn);
    const n = fn.lastIndexOf('.');
    const ext = n < 0 ? "html" : fn.substring(n + 1);
    const data = Deno.readFileSync(fn.substring(1));
    console.log(data);
    const ctype = CONTENT_TYPE[ext] || "text/plain";
    await req.respond({
      status: 200,
      headers: new Headers({ "content-type": ctype }),
      body: data,
    });
  } catch (e) {
    console.log("err", e.stack);
  }
});
app.listen({ port: 8880 });

/*
on a console
$ deno run --allow-net main.mjs

on another console
$ curl -H 'Authorization: token1' -X POST http://localhost:8880/action -d '{"actions":[{"agentID": 2, "dx": 1, "dy": 1, "type": "move"}, {"agentID": 3, "dx": 1, "dy": 1, "type": "move"}]}'
*/
