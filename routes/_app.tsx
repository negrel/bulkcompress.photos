import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html className="min-h-screen relative">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bulk compress photos</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* @ts-ignore */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:site_name" content="Bulk photos compressor" />
        <meta property="og:title" content="Bulk photos compressor" />
        <meta
          property="og:description"
          content="Fast and efficient image compressor"
        />
        <meta
          property="og:url"
          content="https://www.bulkcompress.photos/"
        />
        <meta
          property="og:image"
          content="https://www.bulkcompress.photos/og_banner.png"
        />
        <meta
          name="twitter:title"
          content="Bulk photos compressor"
        />
        <meta
          name="twitter:description"
          content="Fast and efficient image compressor"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://www.bulkcompress.photos/og_banner.png"
        />
        <meta name="twitter:site" content="negrel_dev" />
        <meta itemprop="name" content="Bulk photos compressor" />
        <meta
          itemprop="description"
          content="Fast and efficient image compressor"
        />
        <meta
          itemprop="image"
          content="https://www.bulkcompress.photos/og_banner.png"
        />
        <meta
          name="description"
          content="Fast and efficient image compressor"
        />
        <meta
          name="keywords"
          content="Image Compression, JPEG Compression, PNG Compression, Lossy Compression, Web Optimization, File Size Reduction, Fast Image Compression, Online Image Compressor, Free Image Compression, Browser-based Compression, Image Quality Preservation, Efficient Compression Tool, Image File Optimization, Reduce Image Size, Website Performance, Email Attachment Limits, Local Compression, User-friendly Compression, High-Quality Compression, Optimized Images"
        />
        <script
          src="https://app.prismeanalytics.com/static/m.js"
          data-prisme-verification-id="704bea60-1e15-4d37-8586-6a4d5ea45c62"
          async
        >
        </script>
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 pb-40 sm:pb-16">
        <Component />
      </body>
    </html>
  );
}
