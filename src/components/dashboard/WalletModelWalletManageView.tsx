import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useShowError } from "@/hooks/useShowError";
import { useShowSuccess } from "@/hooks/useShowSuccess";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { Spinner } from "../ui/spinner";
import {
  fetchBalanceThunk,
  getBalance,
  setBalance,
} from "@/store/slices/priceSlice";

const formSchema = z.object({
  walletAddress: z.string().length(42, {
    message: "Wallet address must be of 42 characters.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Amount must be greater than 0." }),
  token: z.enum(["usdt", "usdc"]),
});

type FormSchema = z.infer<typeof formSchema>;

interface WalletModelViewProps {
  setView: React.Dispatch<React.SetStateAction<number>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletModelWalletManageView: React.FC<WalletModelViewProps> = ({
  setView,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const baseUrl = useSelector((state: RootState) => state?.consts?.baseUrl);
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const token = useSelector((state: RootState) => state?.user?.token);
  const refetchBalance = useSelector(
    (state: RootState) => state?.price?.fetchBalance
  );

  const { showError } = useShowError();
  const { showSuccess } = useShowSuccess();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      walletAddress: "",
      amount: undefined as unknown as number,
      token: "usdt",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/fund-transfer`,
        {
          user_id: userData?.id,
          amount: values.amount,
          type: values.token,
          send_wallet_address: values.walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      if (response.data.status == "false") {
        showError("Transaction Failed.", response.data.message);
        setView(0);
        return;
      }
      showSuccess("Transfer Successful", "Funds Transfered Successfully");
      setView(0);
      dispatch(setBalance({ balance: null }));
      dispatch(getBalance({ fetchBalance: !refetchBalance }));
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdt">
                      <img src="usdt.svg" className="w-7 aspect-square" /> USDT
                    </SelectItem>
                    <SelectItem value="usdc">
                      <img src="usdc.svg" className="w-7 aspect-square" /> USDC
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="0xab2...9ha6Q"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="w-full cursor-pointer bg-[#5728A6] hover:bg-black transition ease-in-out duration-300"
          type="submit"
        >
          {loading ? <Spinner className="size-6" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default WalletModelWalletManageView;
