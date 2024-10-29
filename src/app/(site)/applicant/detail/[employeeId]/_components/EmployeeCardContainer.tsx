"use client";

import type { EmployeeDetailResponse } from "@/usecase/dto/Employee/EmployeeDetailDto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DMRequestCard from "./DMRequestCard";
import EmployeeCard from "./EmployeeCard";
type ConversationPurpose = {
  id: number;
  reason: string;
};

export default function EmployeeCardContainer({
  employee,
  options,
}: {
  employee: EmployeeDetailResponse;
  options: ConversationPurpose[];
}) {
  const router = useRouter();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  console.log(isRequestFormOpen);

  return (
    <>
      {isRequestFormOpen ? (
        <DMRequestCard
          onClickBack={() => setIsRequestFormOpen(false)}
          options={options}
        />
      ) : (
        <EmployeeCard
          employee={employee}
          onClickBack={() => router.back()}
          onClickOpenDMRequest={() => setIsRequestFormOpen(true)}
        />
      )}
    </>
  );
}
