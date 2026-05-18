import React from 'react'
import "../auth.form.scss"

const Login = () => {
    return (
        <main>
            <div className='login-container'>
                <h1>Login</h1>

                <form>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"
                            placeholder='Enter email address' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"
                            placeholder='Enter password' />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login
