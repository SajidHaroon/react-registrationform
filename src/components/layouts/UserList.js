import React from 'react'
import User from './User'

const UserList = ({users}) => {
    //console.log('the Userlist prop is',users)
    return (
        <div>
            {users.length === 0 ?  '': <h3>Registered Users:</h3>}
            {console.log(users)}
            {users !== '' ? users.map( user => <User key={user.id} user={user}/>): null } 
            {/* Because users prop 'is' and has been sent as an array thats why map is used, */}
        </div>
        
    )
}

export default UserList
