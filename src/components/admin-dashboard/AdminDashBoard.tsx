'use client'

import React, { useEffect, useState } from 'react'
import DashBoardHeader from './DashBoardHeader'
import StatsCards from './StatsCards'
import RecentPosts from './RecentPosts'
import RecentComments from './RecentComments'
import { useCommentStore, usePostStore, useUserStore } from '@/features'
import { useAuth } from '@/lib'

export const AdminDashBoard = () => {
    const { user, getToken } = useAuth()
    const [token, setToken] = useState<string | null>(null)

    const getPosts = usePostStore((state) => state.getData);
    const posts = usePostStore((state) => state.items);

    const getUsers = useUserStore((state) => state.getData);
    const users = useUserStore((state) => state.items);

    const getComments = useCommentStore((state) => state.getData);
    const comments = useCommentStore((state) => state.items);
    
    const totalPosts = posts.length
    const publishedPosts = posts.filter((p) => p?.published).length
    const draftPosts = posts.filter((p) => !p.published).length
    const totalUsers = users.length
    const totalComments = comments.length
    const totalViews = posts.reduce((sum, post) => sum + (post?.viewsCount ?? 0), 0)
  
    const recentPosts = posts.slice(0, 5)
    const recentComments = comments.slice(0, 5)


    useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const authToken = await getToken() ?? ''
        setToken(authToken)
        getComments(0, 1000, authToken);
        getPosts(0, 1000, authToken );
        getUsers(0, 1000, authToken);
      }
    }
    fetchToken()
  }, [user, getToken])

    // useEffect(() => {
    //     getUsers(0, 50);
    // }, [getUsers]);
    
    // useEffect(() => {
    //     getPosts(0, 50);
    // }, [getPosts]);

    // useEffect(() => {
    //     getComments(0, 50);
    // }, [getComments]);
    
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
