"use client";

import type { EmployeeDetailResponse } from "@/usecase/dto/Employee/EmployeeDetailDto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { sendDMRequestAction } from "../actions/sendDMRequestAction";
import DMRequestCard from "./DMRequestCard";
import EmployeeCard from "./EmployeeCard";

export type FormState = {
  success: boolean | undefined;
  message: string;
  data: { [key: string]: FormDataEntryValue } | undefined;
};

type ConversationPurpose = {
  id: number;
  reason: string;
};

export default function EmployeeCardContainer({
  employee,
  options,
  applicantUserId,
}: {
  employee: EmployeeDetailResponse;
  options: ConversationPurpose[];
  applicantUserId: string;
}) {
  const router = useRouter();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [state, formAction] = useFormState<FormState, FormData>(
    (prevState: FormState, formData: FormData) =>
      sendDMRequestAction(
        prevState,
        applicantUserId,
        employee.userId,
        formData
      ),
    {
      success: undefined,
      message: "",
      data: undefined,
    }
  );
  return (
    <>
      {isRequestFormOpen ? (
        <DMRequestCard
          onClickBack={() => setIsRequestFormOpen(false)}
          options={options}
          state={state}
          action={formAction}
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
