import LinksClient from "./LinksClient";
import socialsData from "@/data/socials.json";

export const metadata = {
  title: "Links | Jr Prod",
  description: "Connect with Jr Prod on all platforms.",
};

export default function LinksPage() {
  return <LinksClient socials={socialsData.socials} />;
}
