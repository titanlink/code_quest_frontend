"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import { LoadingPage } from "@/components/LoadingPage";
import { ICategory } from "@/features/category/domain/entities/category.entity";
import { CategoryForm } from "@/features/category/presentation/components/CategoryForm";
import { useCategoryStore } from "@/features/category/presentation/providers/category.store";
import { useAuth } from "@/lib/auth-context";


export default function Page() {
  const findOne = useCategoryStore((state) => state.findOne);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, getToken } = useAuth();

  const [entity, setEntity] = useState<ICategory | undefined>();
  const [loading, setLoading] = useState(true);

  const idParam = params.id;
  const isNew = idParam === "new";
  const id = !isNew ? Number(idParam) : 0;

  useEffect(() => {
    const fetchData = async () => {
      if (id > 0) {
        if (user) {
          const token = await getToken();
          const response = await findOne(id.toString(), token ?? "");
          if (response && "id" in response) {
            setEntity(response);
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isNew, getToken, router, user, findOne]);

  if (loading) return <LoadingPage />;
  if (!loading && !isNew && !entity) return <NotFound />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CategoryForm entity={entity} />
      </div>
    </div>
  );
}
