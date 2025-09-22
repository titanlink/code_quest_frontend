
import { FileText, Users, MessageSquare, Eye } from "lucide-react";
import React from "react";
import { CustomCard } from "../CustomCard";
import { NumberTicker } from "../magicui/number-ticker";
import { CardHeader, CardTitle, CardContent } from "../ui/card";


interface Props {
  publishedPosts: number;
  totalPosts: number;
  draftPosts: number;
  totalUsers: number;
  totalAdmins: number;
  totalComments: number;
  totalViews: number;
  isLoading?: boolean;
}

const StatsCards = ({
  totalAdmins,
  publishedPosts,
  totalPosts,

  totalUsers,
  totalComments,
  totalViews,
  isLoading,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CustomCard withHover={true} isLoading={isLoading} withOpacity>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <NumberTicker
            value={totalPosts}
            delay={0.1}
            className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
          />
          <p className="text-xs text-muted-foreground">
            {publishedPosts} publicados, {totalPosts - publishedPosts}{" "}
            borradores
          </p>
        </CardContent>
      </CustomCard>

      <CustomCard withHover={true} isLoading={isLoading} withOpacity>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Usuarios
          </CardTitle>
          <Users className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <NumberTicker
              value={totalUsers}
              delay={0.1}
              className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {totalAdmins} Administradores, {totalUsers - totalAdmins} Usuarios
          </p>
        </CardContent>
      </CustomCard>

      <CustomCard withHover={true} isLoading={isLoading} withOpacity>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <NumberTicker
            value={totalComments}
            delay={0.1}
            className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
          />
          <p className="text-xs text-muted-foreground">Comentarios totales</p>
        </CardContent>
      </CustomCard>

      <CustomCard withHover={true} isLoading={isLoading} withOpacity>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
          <Eye className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <NumberTicker
              value={totalViews}
              delay={0.1}
              className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
          </div>
          {/* <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +12% este mes
          </p> */}
        </CardContent>
      </CustomCard>
    </div>
  );
};

export default StatsCards;
