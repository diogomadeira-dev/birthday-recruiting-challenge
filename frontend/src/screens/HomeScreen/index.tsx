import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getCountries } from "@/redux/slices/countriesSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import Spinner from "../../components/Spinner"
import { useAppDispatch } from "../../redux/hooks"
import { createCustomer, getCustomers } from "../../redux/slices/customersSlice"
import { HomeTable } from "./table"


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  country: z
    .string({
      required_error: "Please select a country.",
    }),
  birthday: z.date({
    required_error: "A date of birth is required.",
  }),
})

const HomeScreen = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const { customers, error, loading } = useSelector((state: any) => state.customers)
  const { userInfo } = useSelector((state: any) => state.auth)
  const { countries } = useSelector((state: any) => state.countries)

  useEffect(() => {
    dispatch(getCustomers())
    dispatch(getCountries())
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(createCustomer(data)).then(() => dispatch(getCustomers()))
  }

  return (

    <div className="flex justify-center p-10 flex-col text-center">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10">Intive - FDV Exercise</h1>
      <div className="flex gap-10 w-full">
        <div className="flex justify-center flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {userInfo ? (
                <>
                  <div className="flex-1 justify-center flex-col text-left w-96 mb-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 justify-center flex-col text-left w-96 mb-6">
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surname</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 justify-center flex-col text-left w-96 mb-6">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries && countries.map((country: { name: string }, index: number) => {
                                return <SelectItem value={country?.name} key={index}>{country?.name}</SelectItem>
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 justify-center flex-col text-left w-96 mb-6">
                    <FormField
                      control={form.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal w-full",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <button type="submit" disabled={loading} className="flex mb-2 justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <Spinner /> : 'Save'}</button>
                </>
              ) : (
                <>
                  <FormMessage className="mb-2">You are not authenticated. Authenticate to register new customers.</FormMessage>
                  <Button onClick={() => navigate("/login")}>Go to Login</Button>
                </>
              )}
              {error &&
                (
                  <>
                    <FormMessage>Authentication Error. Try to login again.</FormMessage>
                    <Button onClick={() => navigate("/login")}>Go to Login</Button>
                  </>
                )}
            </form>
          </Form>
        </div>
        <div className="flex-1 border border-blue-500">
          <HomeTable customers={customers} />
        </div>
      </div>
    </div>

  )
}

export default HomeScreen