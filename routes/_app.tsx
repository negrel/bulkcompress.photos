import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html className="min-h-screen">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bulk compress photos</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script type="module" src="/mod.mjs"></script>
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
        <Component />
      </body>
    </html>
  );
}
