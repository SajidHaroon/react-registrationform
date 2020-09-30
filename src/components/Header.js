import React from 'react'

const Header = () => {
    return (
        <div style={styles.header}>
            <h2>Registration Form</h2>
        </div>
    )
}

const styles = {
    header: {
        backgroundColor:'grey',
        color:'#eee',
        fontSize:'1.5rem',
        minWidth: '100%',
        minHeight:'90px',
        position: 'relative',
        textAlign:'center',
        padding:'10px'
    }

}

export default Header