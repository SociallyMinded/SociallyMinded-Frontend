import useCustomerHooks from "./customerHooks";
import styled from 'styled-components'
import { SubmitButton } from "../common/Button/SubmitButton";
import { DeleteButton } from "../common/Button/DeleteButton";
import { EditButton } from "../common/Button/EditButton";
import { PageTemplate } from "../common/styles";
import { UserAuth } from '../../context/AuthContext'

export const Customer = () => {
    const { data, error, loading, 
        showCustomers, toggleShowCustomers, 
        input, handleInput,
        response, handlers 
    } = useCustomerHooks();

    const {user} = UserAuth()

    console.log(user.uid)
    return (
        <div>       
            <h1>Customers</h1>     
            <label>Create customer</label>
            <form>
                <br></br><input onChange={handleInput}></input>
            
            </form>

            {/* <p>You typed : {input}</p>
            <button onClick={() => toggleShowCustomers}>Show usernames</button>
            <Table>
                <TableRow>
                    <TableHeader>Nos</TableHeader>
                    <TableHeader>Customer username</TableHeader>
                </TableRow>
                {showCustomers && data != null && data.map(d => 
                        <TableRow>
                            <TableDataCell>{d.customerId}</TableDataCell>
                            <TableDataCell>{d.username}</TableDataCell>
                        </TableRow>
                )} */}
            {/* </Table> */}
            {/* <SubmitButton onClick={(e) => handlers.createCustomer(e)}/>
            <DeleteButton onClick={(e) => handlers.createCustomer(e)}/>
            <EditButton onClick={(e) => handlers.createCustomer(e)}/> */}
            {/* <Table>
                <TableRow>
                    <TableHeader>Nos</TableHeader>
                    <TableHeader>Customer username</TableHeader>
                </TableRow>
                {showCustomers && data != null && data.map(d => 
                        <TableRow>
                            <TableDataCell>{d.customerId}</TableDataCell>
                            <TableDataCell>{d.username}</TableDataCell>
                        </TableRow>
                )}
            </Table> */}
        </div>
    )

}

const Table = styled.table`
    margin-left: 42%;
    margin-top:2%;
    border:1px solid;
    border-collapse:collapse;
`
const TableRow = styled.tr`
    padding:5%;
`

const TableHeader = styled.th`
    border: 1px solid;
`
const TableDataCell = styled.td`
    border: 1px solid;
    padding:5%;
`
