'use client'

import React, { useEffect, useState } from 'react'
import DashBoardHeader from './DashBoardHeader'
import StatsCards from './StatsCards'
import RecentPosts from './RecentPosts'
import RecentComments from './RecentComments'
import { dashboardAction, useCommentStore, usePostStore, useUserStore } from '@/features'
import { useAuth } from '@/lib'

export const AdminDashBoard = () => {
    const { user, getToken } = useAuth()
    const [token, setToken] = useState<string | null>(null)

    const getPosts = usePostStore((state) => state.getData);
    const posts = usePostStore((state) => state.items);
    const dashboard = useUserStore((state) => state.dashboard);
    const isLoading = useUserStore((state) => state.isLoading);

    const getComments = useCommentStore((state) => state.getData);
    const comments = useCommentStore((state) => state.items);
    
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalAdmins, setTotalAdmins] = useState(0)
    const [publishedPosts, setPublishedPosts] = useState(0)
    const [draftPosts, setDraftPosts] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [totalViews, setTotalViews] = useState(0)
  
    const recentPosts = posts.slice(0, 5)
    const recentComments = comments.slice(0, 5)


    useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        if (authToken){
          const resp = await dashboard(authToken)
          setTotalPosts(resp['total_post'])
          setTotalComments(resp['total_comment'])
          setPublishedPosts(resp['total_post_published'])
          setTotalAdmins(resp['total_user_admin'])
          setTotalUsers(resp['total_user'])
          setTotalViews(resp['total_view'])

          setToken(authToken)
          getComments(0, 5, authToken);
          getPosts(0, 5, authToken );
        }
      }
    }
    fetchToken()
  }, [user, token])

    
  return (
    <div className="space-y-6">
      {/* Header */}
      <DashBoardHeader />

      {/* Stats Cards */}
      <StatsCards 
        totalPosts={totalPosts}
        draftPosts={draftPosts}
        totalUsers={totalUsers}
        totalAdmins={totalAdmins}
        totalComments={totalComments}
        totalViews={totalViews}
        publishedPosts={publishedPosts}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <RecentPosts recentPosts={recentPosts} />

        <RecentComments recentComments={recentComments} />

      </div>
    </div>
  )
}
