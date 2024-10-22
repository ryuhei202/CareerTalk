// import { describe, test } from "vitest";
// import { CompanyRepositoryDummy } from "../../Company/repository/CompanyRepository.dummy";
// import { createSuccess } from "@/util/result";
// import { companyDummies, companyDummy } from "../../Company/Company.dummy";

// describe('validateRegisterEmployeeInput', () => {

//   test("ユーザーが存在しない場合、エラーを返す", async () => {
//     const validateRegisterEmployeeInput = buildValidateRegisterEmployeeInput({
//       userRepository: new UserRepositoryDummy({
//         findByIdReturnValue: createFailure(new UserNotFoundError())
//       }),
//       companyRepository: new CompanyRepositoryDummy({
//         findByIdReturnValue: createSuccess(companyDummy),
//       })
//     })
//   })
// })
