import AppHeader from "./AppHeader/AppHeader";
import { Card } from "@/components/ui/card";
import AppTable from "./AppTable/AppTable";
import { useAppTheme } from "./useAppTheme";

export default function Home() {
  const bgColor = useAppTheme();

  return (
    <div className={`poppins p-5 ${bgColor} border w-full min-h-screen`}>
      <Card className="flex flex-col shadow-none p-2">
        <AppHeader />
        <AppTable />
      </Card>
    </div>
  );
}
