import { useSnackbar } from "notistack";
import { useState } from "react";
import { type UserSignup, useAuth } from "@/store/useAuth";

export function useSubmit() {
  const [successMsg, setSuccessMsg] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user_information: defaultValues, login, signup } = useAuth();

  const submit = async (data: Partial<UserSignup>) => {
    try {
      const res = await fetch("/api/signup-form", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const promise = new Promise(resolve => {
          setTimeout(() => {
            resolve("");
          }, 500);
        });
        enqueueSnackbar("submit data success", { variant: "success" });
        console.log("success");

        await promise;
        signup(data);
        login();
      } else {
        throw new Error("something is wrong: " + res.status);
      }
    } catch (err: any) {
      console.log("submit form err: " + err.message);
    }
  };

  return { submit, defaultValues };
}
