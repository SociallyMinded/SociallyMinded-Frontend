import useCustomerHooks from "./customerHooks";


export const Customer = () => {
    const { data, error, loading, showCustomers, toggleShowCustomers } = useCustomerHooks();

    console.log(data)
    return (
        <div>
         <p>Usernames</p>
         <button onClick={toggleShowCustomers}>Show usernames</button>
         {showCustomers && data != null && data.map(d => 
            <div>
                <p>{d.customerId} : {d.username}</p>
            </div>
         )}
        </div>
    )

}