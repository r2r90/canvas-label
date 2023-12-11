import dynamic from "next/dynamic";
import Head from "next/head";
const Canvas = dynamic(() => import("../components/canvas"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Labbel Application</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Canvas />
    </>
  );
}
