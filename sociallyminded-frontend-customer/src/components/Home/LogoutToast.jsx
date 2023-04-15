import { WhiteToast } from "../common/Toast/WhiteToast";

export const LogoutToast = ({onCloseAction}) => {
    return (
        <WhiteToast
            onCloseAction={onCloseAction}
            headerText={"Log Out"}
            bodyText={"You have been logged out!"}
        />
    )
}


