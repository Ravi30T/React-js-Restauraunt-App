import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import {BiShow, BiHide} from 'react-icons/bi'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, updateShowErrorStatus] = useState(false)
  const [errorMsg, updateErrorMsg] = useState('')
  const [showPassword, updateShowPasswordStatus] = useState(false)

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  const onSubmitError = errMsg => {
    updateErrorMsg(errMsg)
    updateShowErrorStatus(prevState => !prevState)
  }

  const onClickLogin = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitError(data.error_msg)
    }
  }

  const onEnterUsername = event => {
    setUsername(event.target.value)
  }

  const onEnterPassword = event => {
    setPassword(event.target.value)
  }

  const onClickShowHidePassword = () => {
    updateShowPasswordStatus(prevState => !prevState)
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onClickLogin}>
        <h1 className="login-heading"> Login </h1>

        <div className="username-container">
          <label htmlFor="username" className="username-password-label-item">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="login-page-username-input-box"
            placeholder="Username"
            onChange={onEnterUsername}
            value={username}
          />
        </div>

        <div className="password-container">
          <label htmlFor="password" className="username-password-label-item">
            PASSWORD
          </label>
          <div className="password-box">
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-page-password-input-box"
              id="password"
              placeholder="Password"
              onChange={onEnterPassword}
              value={password}
            />
            {showPassword ? (
              <button
                type="button"
                className="password-hide-unhide-btn"
                onClick={onClickShowHidePassword}
              >
                {' '}
                <BiHide />{' '}
              </button>
            ) : (
              <button
                type="button"
                className="password-hide-unhide-btn"
                onClick={onClickShowHidePassword}
              >
                {' '}
                <BiShow />{' '}
              </button>
            )}
          </div>
        </div>

        {showError && <p className="login-error-msg"> {errorMsg} </p>}

        <div className="login-button-container">
          <button type="submit" className="login-button">
            {' '}
            Login{' '}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
