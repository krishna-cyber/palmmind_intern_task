"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v3"

const formSchema = z.object({
  name:z.string().nonempty("Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().nonempty("Password is required"),
  confirmPassword: z.string().nonempty("Confirm Password is required")
}).superRefine((val,ctx)=>{
    if(val.password !==val.confirmPassword){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"Password is not same as confirm password",
            path:["confirmPassword"]
        })
    }
})

const RegisterUser = () => {
     const router = useRouter()
      const form = useForm<z.infer<typeof formSchema>>({
         defaultValues: {
            name:"",
           email: "",
           password: "",
           confirmPassword:""
         },
         resolver: zodResolver(formSchema),
       })

       const onSubmit = async (data: z.infer<typeof formSchema>) => {

           const { error } = await authClient.signUp.email({
             email: data.email, // required
             password: data.password, // required
            name: data.name, // required
             callbackURL: "/chat",
             fetchOptions: {
               onSuccess(context) {
                  toast.success("Account created successfully")
                  router.push("/sign-in")
               },
               onError(ctx) {
                 toast.error(ctx.error.message)
               },
             },
           })
         }
  return (
 
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-gradient-to-b from-muted/50 to-card px-8 py-8 shadow-lg/5 dark:from-transparent dark:shadow-xl">
        <div
          className="absolute inset-0 -top-px -left-px z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, color-mix(in srgb, var(--card-foreground) 8%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--card-foreground) 8%, transparent) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)
      `,
            WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="relative isolate flex flex-col items-center">
          <p className="mt-4 text-xl font-semibold tracking-tight">
           Register your account
          </p>

         

          <Form {...form}>
            <form
              className="w-full space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username{" "}
                      <span className="relative right-2.5 bottom-1/3 text-xs font-light text-red-600">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Username"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email{" "}
                      <span className="relative right-2.5 bottom-1/3 text-xs font-light text-red-600">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password{" "}
                      <span className="relative right-2 bottom-1/3 text-xs font-light text-red-600">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password{" "}
                      <span className="relative right-2 bottom-1/3 text-xs font-light text-red-600">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Register Account
              </Button>
            </form>
          </Form>

          <div className="mt-5 space-y-5">
            <p className="text-center text-sm">
              Already have an account?
              <Link
                className="ml-1 text-muted-foreground underline"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default RegisterUser