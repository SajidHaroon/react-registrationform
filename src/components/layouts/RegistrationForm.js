import React, { Component } from 'react'
import InputField from '../customs/InputField'
import UserList from '../layouts/UserList'
import {nameRex, emailRex, phoneRex, positionRex}  from '../conditions/regExp'
import Notification from '../layouts/Notification'
import { uuid } from 'uuidv4'; // from https://www.npmjs.com/package/uuidv4, node command >> npm install uuidv4
// used in setState for user data as 'uuid()' in handleChange function on line 55
import { storeData, getData } from '../../helpers/localStorage'
class RegistrationForm extends Component {
    state = { 
        //If you dont want to use componentDidMount method then enable below given line and remvoe users:[]
        users: getData('userList') !== null ? getData('userList') : [], // 
        //users: getData('userList') ? getData('userList') : [], // 
        //users:[], 
        user: {
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            position:''
        },
        formErrors:{
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            position:''
        },
        notification:{
            msg:'',
            err:false
        }
    }

    componentDidUpdate(){
        storeData('userList', this.state.users)
    }

    //Use this line if you dont want to use the line 12: Declaring getData fuction
    // componentDidMount(){
    //     this.setState({
    //         users:getData('userList')
    //     })
    // }


    handleChange = (e) =>  {
        const {name, value} = e.target
        const {firstName, lastName, email, phone, position} = this.state.user
        let formErrors = {...this.state.formErrors}
        switch (name) {
            case 'firstName':
                formErrors.firstName = (firstName.match(nameRex)) ? null : "Must have 3 characters/no numbers & symbols! "
                break;
            case 'lastName':
                formErrors.lastName = (lastName.match(nameRex)) ? null : "Must have 3 characters/no numbers & symbols!"
                break;
            case 'email':
                formErrors.email = (email.match(emailRex)) ? null : "Your email ID is not valid"
                break;
            case 'phone':
                formErrors.phone = (phone.match(phoneRex)) ? null : "Your contact number is not valid"
                break;
            case 'position':
                formErrors.position = (position.match(positionRex)) ? null : "Given position not valid"
                break; 
            default:
                break;
        }
        this.setState({
            user:{
                ...this.state.user,   // Make a copy
                id: uuid(),
                [name]:value
            },
            formErrors:formErrors   /// Updating form errors after checking
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()

        // If all fields are empty
        let userValues = Object.values(this.state.user)
        userValues.forEach(value => {
            if (value ===''){
                this.setState({
                    notification:{
                        msg:"All fields are required.",
                        err:true
                    }
                })
            }
            setTimeout(() =>
                this.setState({
                    notification:{
                        msg:'',
                        err:false
                    }
                }),4000)
        });

        // If some fields have errors
        let errorValues = Object.values(this.state.formErrors)
        errorValues.forEach(err => {
            if (err !==''){
                this.setState({
                    notification:{
                        msg:"Some fields are still empty.",
                        err:true
                    }
                })
            }
        })

        //Check if all errors are Null so no problem, then register the user
        let allNullErrors = errorValues.filter(err => err === null)
        // To check if the user has already registered with the same email
        let filteredUser = this.state.users.filter( user => user.email === this.state.user.email)
        // To check how many times an email is matched from pevious user entries
        // if filterUser.length is >0, then user is matched
        console.log('filtered user is:', filteredUser.length)
        
        if (allNullErrors.length === 5 && filteredUser.length === 0) {
            this.setState({
                users: [...this.state.users, this.state.user],
                notification:{
                    msg:`${this.state.user.firstName} is registerd`,
                    err: false
                },
                user:{
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    position:''
                }
            })
        }

        if (filteredUser.length > 0) {
            this.setState({
                notification:{
                    //msg:`${this.state.user.firstName} is already registered with same email`,
                    msg:`A user with email: ${this.state.user.email} is already registered`,
                    err: true
                }
            })
        }

        setTimeout( () => 
            this.setState ({
                notification:{
                    msg:'',
                    err:false
                }
        }), 4000);
    }

    render() {
        //console.log(this.state.user)
        //console.log(localStorage.getItem('userList'))
        const {firstName, lastName, email, phone, position} = this.state.user
        const {formErrors} = this.state
        
        return (
            <div>
                <Notification notification={this.state.notification}/>
                <form style={styles.form} onSubmit={this.handleSubmit}>
                    <InputField 
                        type="text"
                        value={firstName}
                        name="firstName"
                        label="First Name: "
                        placeHolder="Enter your first name here! "
                        changeHandler={this.handleChange}
                        error={formErrors.firstName}
                        
                    />

                    <InputField
                        type="text"
                        value={lastName}
                        name="lastName"
                        label="Last Name: "
                        placeHolder="Enter your last name here! "
                        changeHandler={this.handleChange}
                        error={formErrors.lastName}
                        
                    />

                    <InputField
                        type="text"
                        value={email}
                        name="email"
                        label="Email: "
                        placeHolder="Enter your Email! "
                        changeHandler={this.handleChange}
                        error={formErrors.email}
                        
                    />


                    <InputField
                        type="number"
                        value={phone}
                        name="phone"
                        label="Phone: "
                        placeHolder="Enter your contact number here(e.g +358(4or5)12345678)! "
                        changeHandler={this.handleChange}
                        error={formErrors.phone}
                        
                    />

                    <InputField 
                        type="text"
                        value={position}
                        name="position"
                        label="Position: "
                        placeHolder="Enter your position! "
                        changeHandler={this.handleChange}
                        error={formErrors.position}
                        

                    />
                    <button style={styles.submitBtn} type="submit">Submit</button>
                    
                </form>
                {/* <button style={styles.submitBtn} onClick={() => localStorage.removeItem('userList')}>Clear Data</button> */}
                <UserList users={this.state.users} />
                
            </div>
        )
    }
}

const styles ={
    form:{
        minWidth:'70%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        margin:'2px',
        paddingTop:'3rem',
        fontSize:'1.5rem',
        
    },
    submitBtn:{
        minWidth:'120px',
        backgroundColor:'#333',
        color:'#fff',
        border:'1px solid black',
        padding:'5px',
        margin:'10px'
    }
}


export default RegistrationForm

// Older version
// class RegistrationForm extends Component {

//     render() {
//         return (
//             <div>
//                 <form>
//                     <div>
//                         <label>First Name:</label>
//                         <input type="text" placeholder="Enter your First Name...."/>
//                     </div>
//                     <div>
//                         <label>Last Name:</label>
//                         <input type="text" placeholder="Enter your Last Name...."/>
//                     </div>
//                     <div>
//                         <label>Email:</label>
//                         <input type="text" placeholder="Enter your Email...."/>
//                     </div>
//                     <div>
//                         <label>Phone No. :</label>
//                         <input type="text" placeholder="Enter your phone number...."/>
//                     </div>
//                     <button>Submit</button>
//                     <InputField/>

//                 </form>
                
//             </div>
//         )
//     }
// }