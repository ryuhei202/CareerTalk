"use client";

import ErrorPage from "@/app/_components/page/ErrorPage";
import type { EmployeeDetailResponse } from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
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

export default function EmployeeCardContainer({
  employee,
}: {
  employee: EmployeeDetailResponse;
}) {
  const router = useRouter();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [state, formAction] = useFormState<FormState, FormData>(
    (prevState: FormState, formData: FormData) =>
      sendDMRequestAction(prevState, employee.userId, formData),
    {
      success: undefined,
      message: "",
      data: undefined,
    }
  );

  if (state.success === false) {
    return <ErrorPage message={state.message} data={state.data} />;
  }
  return (
    <>
      {isRequestFormOpen ? (
        <DMRequestCard
          onClickBack={() => setIsRequestFormOpen(false)}
          isSuccess={state.success}
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
