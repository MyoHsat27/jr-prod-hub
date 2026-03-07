import LinksClient from "./LinksClient";
import { readSocials } from "@/lib/gdrive";
import { SocialLink } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Links | Jr Prod",
  description: "Connect with Jr Prod on all platforms.",
};

export default async function LinksPage() {
  const data = await readSocials();
  return <LinksClient socials={data.socials as unknown as SocialLink[]} />;
}
