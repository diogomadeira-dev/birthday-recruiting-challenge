import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/redux/hooks"
import { deleteCustomer, getCustomers } from "@/redux/slices/customersSlice"
import { Trash2 } from "lucide-react"
import moment from "moment"

export const HomeTable = ({customers}: any) => {

    const dispatch = useAppDispatch()

    const deleteCustomerFromTable = (id) => {
        console.log('id', id)
        dispatch(deleteCustomer(id))
        .then(() => dispatch(getCustomers()))
    }

    return (
        <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 h-10">Name</th>
            <th className="border border-slate-300 h-10">Surname</th>
            <th className="border border-slate-300 h-10">Country</th>
            <th className="border border-slate-300 h-10">Birthday</th>
            <th className="border border-slate-300 h-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.map((customer: any, index: number) => {
            return (
              <tr key={index}>
                <td className="border border-slate-300 h-10">
                  {customer?.name}
                </td>
                <td className="border border-slate-300 h-10">
                  {customer?.surname}
                </td>
                <td className="border border-slate-300 h-10">
                  {customer?.country}
                </td>
                <td className="border border-slate-300h-10">
                  {moment(customer?.birthday).format("MM/DD/YY")}
                </td>
                <td className="border border-slate-300h-10">
                  <div className="space-x-2">
                    <Button type="button" variant="destructive" size="icon" onClick={() => deleteCustomerFromTable(customer?.customerId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
}