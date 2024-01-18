import Sidebar from "@/components/Sidebar";
import Recommend from "./_components/Recommend";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <main className="min-h-screen flex justify-between sm:mx-0 mx-2">
      <aside className="sm:flex fixed min-h-screen sm:w-[300px] w-full sm:top-0 bottom-0 z-50 sm:pr-10">
        <Sidebar />
      </aside> 
      <div className="sm:ml-[300px] max-w-[600px] mx-auto ml-0 flex-1 h-screen flex items-start justify-center  mr-10 py-4">
        {children}
      </div>
      <div className="sm:w-[300px] sm:flex hidden w-0 top-0 z-50 pr-10 right-10">
        <Recommend />
      </div>
    </main>
    </html> 
  );
}
