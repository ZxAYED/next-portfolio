import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { profile } from "@/lib/portfolio";
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader resumeUrl={profile.resume.url} />
      {children}
      <SiteFooter />
    </>
  );
}
