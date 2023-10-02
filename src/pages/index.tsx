import dynamic from "next/dynamic";
import Head from "next/head";

const Canvas = dynamic(() => import("../components/canvas"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Labbel Application</title>
      </Head>
      <div className="flex">
        <Canvas />
      </div>
    </>
  );
}
