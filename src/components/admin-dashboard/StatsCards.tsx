import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { FileText, Users, MessageSquare, Eye, TrendingUp } from 'lucide-react'
import React from 'react'
import { CustomCard, NumberTicker } from '..';
import { useCommentStore, usePostStore, useUserStore } from '@/features';


interface Props {
  publishedPosts: number;
  totalPosts: number;
  draftPosts: number;
  totalUsers: number;
  totalComments: number;
  totalViews: number;
}

const StatsCards = ({publishedPosts, totalPosts, draftPosts, totalUsers, totalComments, totalViews}: Props) => {

  const postsLoading = usePostStore((state) => state.isLoading);
  const usersLoading = useUserStore((state) => state.isLoading);
  const commentsLoading = useCommentStore((state) => state.isLoading);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CustomCard withHover={true} isLoading={postsLoading}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Posts
            </CardTitle>
          <FileText className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <NumberTicker value={totalPosts} delay={0.10}
              className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
          <p className="text-xs text-muted-foreground">
            {publishedPosts} publicados, {draftPosts} borradores
          </p>
        </CardContent>
      </CustomCard>

      <CustomCard withHover={true} isLoading={usersLoading}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
          <Users className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"> 
            <NumberTicker value={totalUsers} delay={0.10}
              className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
          </div>
          <p className="text-xs text-muted-foreground">Usuarios registrados</p>
        </CardContent>
      </CustomCard>

      <CustomCard withHover={true} isLoading={commentsLoading}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <NumberTicker value={totalComments} delay={0.10}
              className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
          <p className="text-xs text-muted-foreground">Comentarios totales</p>
        </CardContent>
      </CustomCard>

      <CustomCard withHover={true}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
          <Eye className="h-12 w-12 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <NumberTicker value={totalViews} delay={0.10}
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
  )
}

export default StatsCards