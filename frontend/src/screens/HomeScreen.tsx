import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import moment from "moment"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { z } from "zod"
import Spinner from "../components/Spinner"
import { useAppDispatch } from "../redux/hooks"
import { createCustomer, getCustomers } from "../redux/slices/customersSlice"


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  birthday: z.date({
    required_error: "A date of birth is required.",
  }),
})

const HomeScreen = () => {

  const dispatch = useAppDispatch()

  const { customers } = useSelector((state) => state.customers)

  const loading = false

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    console.log('data', data)

    dispatch(createCustomer(data))
  }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">        
        <div className="flex justify-center p-10 flex-col text-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10">Intive - FDV Exercise</h1>
            <div className="flex gap-10 w-full">
              <div className="flex justify-center flex-col">
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
                <button type="submit" disabled={loading} className="flex justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <Spinner /> : 'Save'}</button>
              </div>
              <div className="flex-1 border border-blue-500">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border border-slate-300 h-10">Name</th>
                    <th className="border border-slate-300 h-10">Country</th>
                    <th className="border border-slate-300 h-10">Birthday</th>
                  </tr>
                </thead>
                <tbody>
                  {customers && customers.map((customer, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-slate-300 h-10">
                          {customer?.name}
                        </td>
                        <td className="border border-slate-300 h-10">
                          {customer?.surname}
                        </td>
                        <td className="border border-slate-300h-10">
                          {moment(customer?.birthday).format("MM/DD/YY")}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            </div>

          </div>
        </form>
      </Form>
    )
  }
  
  export default HomeScreen