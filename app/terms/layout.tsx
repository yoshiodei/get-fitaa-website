import PageShell from "@/components/PageShell";
import SimpleFooter from "@/components/SimpleFooter";
import SimpleNavbar from "@/components/SimpleNavbar";

/** Layout with the FULL navbar (logo, page links, Login, Book a Clean). */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <SimpleNavbar />
      <main>{children}</main>
      <SimpleFooter />
    </PageShell>
  );
}