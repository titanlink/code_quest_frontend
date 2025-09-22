"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";

import { useEffect } from "react";

import NotFound from "./not-found";
import { LoadingPage } from "@/components/LoadingPage";
import { useCategoryStore } from "@/features/category/presentation/providers/category.store";
import { EnhancedCommentsSection } from "@/features/comment/presentation/components/EnhancedComments";
import { PostContent } from "@/features/post/presentation/components/PostContent";
import { PostSidebar } from "@/features/post/presentation/components/PostSidebar";
import { RelatedPosts } from "@/features/post/presentation/components/RelatedPosts";
import { usePostStore } from "@/features/post/presentation/providers/post.store";
import { useAuth } from "@/lib/auth-context";

export default function PostPage() {
  const params = useParams<{ slug: string }>();

  const { user, getToken } = useAuth();

  const getCategories = useCategoryStore((state) => state.getData);
  const categories = useCategoryStore((state) => state.items);
  const findOneBySlug = usePostStore((state) => state.findOneBySlug);
  const isLoading = usePostStore((state) => state.isLoading);
  const selected = usePostStore((state) => state.selected);

  const getPosts = usePostStore((state) => state.getData);
  const relateds = usePostStore((state) => state.items);

  const slug = params.slug;

  useEffect(() => {
    const fetchData = async () => {
      let token = "";
      if (user) token = (await getToken()) ?? "";
      const resp = await findOneBySlug(slug, token);
      await getCategories(0, 100, token);
      if ("id" in resp) {
        await getPosts(0, 4, "", Number(resp?.category?.id), false);
      }
    };
    // if (selected?.slug != slug) 
    fetchData();
  }, [findOneBySlug, getCategories, getPosts, getToken, selected?.slug, slug, user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {!isLoading && !selected && <NotFound />}
      {isLoading && <LoadingPage />}

      {!isLoading && selected && (
        <article className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <PostContent post={selected} />
              <EnhancedCommentsSection
                post={selected}
                postId={selected.id ?? ""}
                postComments={selected.comments ?? []}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PostSidebar
                post={selected}
                categories={categories}
                relateds={relateds}
              />
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-16 border-t">
            <RelatedPosts posts={relateds} />
          </div>
        </article>
      )}
    </div>
  );
}