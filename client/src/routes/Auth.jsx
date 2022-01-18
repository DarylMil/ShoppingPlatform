import { ArrowRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import BaseInput from '../components/BaseInput';

const authStyles = {
    position: 'relative',
    top: '40vh',
    left: '45vw',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5vh',
    transform: 'translate(-50%, -50%)'
}

const spanStyles = {
    width: '30vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1vw',
    fontSize: '0.75rem',
    fontWeight: '900',
    textTransform: 'capitalize'
}

const Auth = () => {
    let [ action, toggleAction ] = useState('login');
    
    const login = async e => {
        try {
            e.preventDefault();

            const body = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            };
    
            const res = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            const { success, userId } = await res.json();

            if (success) {
                localStorage.setItem("user", userId);
                document.cookie = "loggedIn=true;path=/;";
                return window.location.reload();
            }

            alert(data.message)
        } catch (err) { console.error(err) };
    };

    const signup = async e => {
        try {
            e.preventDefault();

            const body = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                address: document.getElementById("address").value,
                phoneNumber: document.getElementById("number").value
            };
    
            const res = await fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            const data = await res.json();

            if (data.success == true) {
                alert("Account successfully created, please log in to continue.")
                return toggleAction('login');
            }

            alert(data.message)
        } catch (err) { console.error(err) };
    }

    return (
        <form style={authStyles}>
            <h1>{ action.toUpperCase() }</h1>

            <BaseInput field="username" />
            <BaseInput type="email" field="email" hide={action=='login'} />
            <BaseInput field="password" />
            <BaseInput field="address" hide={action=='login'} />
            <BaseInput type="number" field="number" hide={action=='login'} />

            <span style={spanStyles}>
                <h3 id="switch" onClick={ action == 'login'? () => toggleAction('signup') : () => toggleAction('login')} style={{fontWeight:'100', cursor: 'pointer'}}>{ action == "login"? 'New? Sign up here' : 'Back to login' }</h3>
                <button onClick={action == 'login'? login : signup} style={buttonStyles}>{ action } <ArrowRightIcon style={{height:'3vh'}} /></button>
            </span>
        </form>
    )
}

export default Auth