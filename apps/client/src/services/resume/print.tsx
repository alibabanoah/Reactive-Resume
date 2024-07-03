import { t } from "@lingui/macro";
import { UrlDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";

export const printResume = async (data: { id: string }) => {
  try{
  const response = await axios.get<UrlDto>(`/resume/print/${data.id}`);
  console.log("Print resume response:", response.data);

  return response.data;
  }catch(error){
  console.error("Error in printResume service:", error);
  throw error;
  }
};

export const usePrintResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: printResumeFn,
  } = useMutation({
    mutationFn: printResume,
    onError: (error) => {
      const message = error.message;

      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: message,
      });
    },
  });

  return { printResume: printResumeFn, loading, error };
};
