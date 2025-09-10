import { mockPosts, mockUsers, mockComments } from '@/lib/mock-data'
import React from 'react'
import DashBoardHeader from './DashBoardHeader'
import StatsCards from './StatsCards'
import RecentPosts from './RecentPosts'
import RecentComments from './RecentComments'
import { allCommentAction, allPostAction, allUserAction, IPost } from '@/features'

export const AdminDashBoard = async () => {
    const posts  = await allPostAction({ page: 1, limit: 100});
    const users  = await allUserAction({ page: 1, limit: 100});
    const comments  = await allCommentAction({ page: 1, limit: 100});

    const totalPosts = posts.length
    const publishedPosts = posts.filter((p) => p?.published).length
    const draftPosts = posts.filter((p) => !p.published).length
    const totalUsers = users.length
    const totalComments = comments.length
    const totalViews = posts.reduce((sum, post) => sum + post.viewsCount, 0)
  
    const recentPosts = posts.slice(0, 5)
    const recentComments = comments.slice(0, 5)
    
  return (
    <div className="space-y-6">
      {/* Header */}
      <DashBoardHeader />

      {/* Stats Cards */}
      <StatsCards publishedPosts={publishedPosts}
        totalPosts={totalPosts}
        draftPosts={draftPosts}
        totalUsers={totalUsers}
        totalComments={totalComments}
        totalViews={totalViews}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <RecentPosts recentPosts={recentPosts} />

        <RecentComments recentComments={recentComments} />

        {/* <pre><b>{JSON.stringify(recentComments, null, 2) } </b> </pre>  */}
      </div>
    </div>
  )
}
