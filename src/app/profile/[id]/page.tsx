"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useUserStore } from "@/features/user/presentation/providers/user.store";
import { useAuth } from "@/lib/auth-context";
import NotFound from "@/app/not-found";
import { LoadingPage } from "@/components/LoadingPage";
import { IUser } from "@/features/user/domain/entities/user.entity";
import { UserForm } from "@/features/user/presentation/components/UserForm";
import { Meteors } from "@/components/ui/meteors";
import DarkVeil from "@/components/DarkVeil";

export default function Page() {
  const findOne = useUserStore((state) => state.findOne);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, getToken } = useAuth();

  const [entity, setEntity] = useState<IUser | undefined>();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-700/20 to-accent/10 px-4 relative">
      <Meteors />
      <DarkVeil speed={0.3} hueShift={39} />
      <div className=" inset-0 absolute flex items-center justify-center flex-col">
        <div className=" w-400 justify-center items-center ">

          <UserForm entity={entity} withOpacity withBlur backUrl='/profile'/>
        </div>
      </div>
    </div>
  );
}
