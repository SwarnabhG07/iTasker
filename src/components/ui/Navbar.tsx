import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-8 py-4 text-white">
      
      <div className="text-2xl font-bold tracking-tight">
        iTasker<span className="text-purple-500">.</span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <a href="#" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Dashboard</a>
        <a href="#" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Projects</a>
        <a href="#" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Settings</a>
      </div>

      <Button 
        variant="outline" 
        className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
      >
        My Account
      </Button>

    </nav>
  );
}