import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm Takaya. I'm a software engineer at SairiLab. You can
          contact me on Twitter: <a href='https://twitter.com'>@imataka7</a>
        </p>
        <p>And today, I show you how to make a cake.</p>
      </section>
    </Layout>
  );
}
