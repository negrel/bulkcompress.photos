import { PageProps } from "$fresh/server.ts";

function Layout({ Component }: PageProps) {
  return (
    <>
      <Component />
    </>
  );
}

export default Layout;
