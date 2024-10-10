import { SidePanel } from "@/components";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex p-[10px] gap-[10px] w-full bg-neutral-200">
      <SidePanel />
      {children}
    </div>
  );
}
