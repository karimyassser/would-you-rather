import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Form } from 'react-bootstrap';
import { recieveAuthedusers } from '../actions/authedUser';
import { Link, useLocation } from 'react-router-dom';
const Login = ({ dispatch, userID }) => {
    const [check, setCheck] = useState(null)
    const location = useLocation()

    let { state } = location
    const handleLogin = (check) => {
        dispatch(recieveAuthedusers(check))
    }
    return (
        <div>
            <div align="center" style={{ paddingTop: "2%" }}>
                <Card style={{ width: '25rem' }}>
                    <Card.Header><strong>Welcome to the Would You Rather App!</strong><p>Please SignIn To Continue</p></Card.Header>
                    <Card.Img style={{ width: "70%", margin: "auto" }} variant="top" src='/logo192.png' />
                    <Card.Body>
                        <Form.Select aria-label="Default select example" onChange={(e) => setCheck({ check: e.target.value })} >
                            <option>Select User</option>
                            {userID.map((id) =>
                                <option value={id} key={id}> {id} </option>
                            )}
                        </Form.Select>
                        {check !== null
                            ? <Link to={state?.from || '/dashboard'} onClick={(e) => handleLogin(Object.values(check).toString())} >
                                <Button className="mt-5" variant="primary" >Sign In</Button>
                            </Link>
                            : <Button className="mt-5" variant="primary">Sign In</Button>
                        }

                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
function mapStateToProps({ users }) {
    return ({
        userID: Object.keys(users),
        users
    })
}
export default connect(mapStateToProps)(Login)