import CustomerNav from "@/components/customer/CustomerNav";
import CustomerFooter from "@/components/customer/CustomerFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomerNav />
      <main className="pt-24">{children}</main>
      <CustomerFooter />
    </>
  );
}
