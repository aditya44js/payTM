import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

import { useEffect, useState } from "react"
import axios from "axios"

export const Dashboard = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk")
            .then(response => {
                setUsers(response.data.user);
            })
    }, []);

    return (
        <div>
            <Appbar user={"Aditya"} />

            <div>
                <Balance value={"10,000"} />

                <Users users={users} />
            </div>
        </div>
    )
}