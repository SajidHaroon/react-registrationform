import React from 'react'

const Notification = ({notification}) => {

    const { msg, err } = notification
    if (!msg) {
        return null
    }

    return (
        <div style={err ? styles.error: styles.success}>

            <p>{msg}</p>
            
        </div>
    )
}

const styles = {
    error: {
        color:'red',
        border:'1px solid blue',
        borderRadius:'20px',
        margin:'auto 10px',
        padding:'10px',
        maxWidth:'400px',
        textAlign:'center'
    },
    success :{
        color:'green',
        border:'1 px solid blue',
        borderRadius:'20px',
        margin:'auto'
    }
}

export default Notification

