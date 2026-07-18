import { FolderKanban } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  value: string;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white hover:border-slate-700 transition-all hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-slate-400">
          {title}
        </CardTitle>

        <FolderKanban className="h-5 w-5 text-slate-500" />
      </CardHeader>

      <CardContent>
        <h2 className="text-4xl font-bold">
          {value}
        </h2>

        <p className="mt-2 text-sm text-green-400">
          +12% this month
        </p>
      </CardContent>
    </Card>
  );
}