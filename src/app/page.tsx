import { client, SITE_SETTINGS_QUERY, FOOTER_QUERY } from "@/lib/sanity";
import HomepageClient from "./HomepageClient";

export default async function Home() {
  const [siteSettings, footer] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 0 } }),
    client.fetch(FOOTER_QUERY, {}, { next: { revalidate: 0 } })
  ]);

  return <HomepageClient siteSettings={siteSettings} footer={footer} />;
}
