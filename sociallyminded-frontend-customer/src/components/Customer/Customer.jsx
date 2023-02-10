import useCustomerHooks from "./customerHooks";
import styled from 'styled-components'

export const Customer = () => {
    const { data, error, loading, 
        showCustomers, toggleShowCustomers, 
        input, handleInput,
        response, handlers 
    } = useCustomerHooks();

    console.log(data)
    return (
        <div>       
            <h1>Customers</h1>     
            <label>Create customer</label>
            <form>
                <br></br><input onChange={handleInput} value={input}></input>
                <button onClick={(e) => handlers.createCustomer(e)}>Submit</button>
            </form>
            <p>You typed : {input}</p>
            <button onClick={toggleShowCustomers}>Show usernames</button>
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
                )}
            </Table>
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
    padding:7%;
`

const TableHeader = styled.th`
    border: 1px solid;
`
const TableDataCell = styled.td`
    border: 1px solid;
    padding:5%;
`
