import useCustomerHooks from "./customerHooks";
import styled from 'styled-components'
import { SubmitButton } from "../common/Button/SubmitButton";
import { DeleteButton } from "../common/Button/DeleteButton";
import { EditButton } from "../common/Button/EditButton";
import { PageTemplate } from "../common/styles";
import { UserAuth } from '../../context/AuthContext'
import LoggedInHeader from "../common/Header/LoggedInHeader"

export const Customer = () => {
    const { data, error, loading, 
        showCustomers, toggleShowCustomers, 
        input, handleInput,
        response, handlers 
    } = useCustomerHooks();

    const {user} = UserAuth()

    // console.log(user.uid)
    // console.log(user.displayName)
    // console.log(user.email)

    return (
        <PageTemplate>   
            <LoggedInHeader></LoggedInHeader>    
          
        </PageTemplate>
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
