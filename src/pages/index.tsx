import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "./components/Layout";
import Panel from "./components/Panel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
<Panel/>
    </Layout>
  );
}

