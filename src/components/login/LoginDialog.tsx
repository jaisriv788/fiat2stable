import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setIsUserConnected } from "@/store/slices/userSlice";

export function LoginDialog() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Logging in with email:", email);

    const form = e.currentTarget;
    if (form.checkValidity()) {
      navigate("/dashboard");
      dispatch(setIsUserConnected({ isConnected: true }));
    } else {
      form.reportValidity();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#5728A6] cursor-pointer transition ease-in-out duration-300">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        <form onSubmit={handleLogin}>
          <DialogHeader>
            <DialogTitle className="flex items-center font-bold gap-2">
              <img
                className="logo rotate-15"
                src="/fiat/login/icon2.svg"
                alt="icon"
                width={25}
              />
              Login
            </DialogTitle>
            <DialogDescription>
              By connecting, you agree to the{" "}
              <span className="text-[#5728A6] cursor-pointer">
                Terms of Service{" "}
              </span>
              &
              <span className="text-[#5728A6] cursor-pointer">
                {" "}
                Privacy Policy
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Email</Label>
              <Input
                id="name-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="name"
                placeholder="Enter your email."
                className="focus:ring-[#5728A6]"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 transition ease-in-out duration-300"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer transition ease-in-out bg-[#5728A6] hover:bg-black duration-300"
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
