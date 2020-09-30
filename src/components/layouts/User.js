import React, { Component } from 'react'

class User extends Component {
    state = {
        detail: false,
        
    }

    handleView = () => {
        this.setState({
            detail: !this.state.detail
        })
    }

    handleDelete = (user_id) => {
        console.log('Delete clicked', user_id)
        
        const users = JSON.parse(localStorage.getItem('userList'))
        console.log(users)
        const remainingUsers = users.filter((user) => user.id !== user_id)
        console.log(remainingUsers)
        localStorage.setItem('userList', JSON.stringify(remainingUsers))
        window.location.reload()
    }


    render() {
        // console.log(this.state.detail)
        
        const { user } = this.props

        //console.log('user: ', user)
        return (
            <div style={styles.container}>
                
                <div style={styles.details}>
                    <p>{user.firstName} {user.lastName} {user.position}</p>
                    <div style={styles.formbtns}>
                        <button style = {styles.btns} onClick={this.handleView}>{this.state.detail ? 'Hide' : 'View'}</button>
                        <button style = {styles.btns} onClick={() => this.handleDelete(user.id)} title="Delete">X</button>
                    </div>
                </div>
                
                {this.state.detail ? 
                    <table>
                    <tr>
                        <td>First Name: </td>
                        <td>{user.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name: </td>
                        <td>{user.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Contact Number: +</td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td>Position: </td>
                        <td>{user.position}</td>
                    </tr>
                </table>
                :
                null
                }
                
            </div>
        )

    }
    
}

const styles = {
    container:{
        // display:'flex',
        // flexDirection:'space-between',
        // justifyCotent:'space beween',
        border:'1px solid darkgreen',
        borderRadius:'10px',
        
        padding:'5px',
        maxWidth:'400px',
    },
    details: {
        display:'flex',
        justifyContent:'space-between'
    },
    btns : {
        margin:'3px',
        fontSize:'1rem'
    },
    formbtns : {
        display:'flex',
        alignItems:'center'
        
    }

}

export default User
