import React, { FC } from 'react'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    nav({
      pathname: '/login',
      search: 'b=2',
    })
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <Button onClick={clickHandler}>登录</Button>
        <Link to="/register?a=10">注册</Link>
      </div>
    </div>
  )
}

export default Home
