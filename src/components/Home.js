import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class BeginScreen extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to={`/login`}>LOGIN</Link>
        </div>
        
        <div>
          <Link to={`/signup`}>SIGNUP</Link>
        </div>
       
       
      </div>
    )
  }
}