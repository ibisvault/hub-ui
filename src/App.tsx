import { EiconReachIcon } from "@/components/brand";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <EiconReachIcon width={80} />
      <h1 className="font-heading text-4xl font-bold">hub-ui</h1>
      <ThemeToggle />
    </div>
  );
}

export default App;
