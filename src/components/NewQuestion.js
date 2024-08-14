import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'
import { handleAddQuestion } from '../actions/Questions'
import { useNavigate } from 'react-router-dom'
const NewQuestion = ({ dispatch }) => {

    let [firstOption, setFirstOption] = useState('')
    let [secondOption, setSecondOption] = useState('')
    const navigate = useNavigate()
    const handleSubmit = ((firstOption, secondOption) => {
        dispatch(handleAddQuestion(firstOption, secondOption))
        navigate('/dashboard', { replace: true })
    })
    return (
        <div>
            <div align="center" style={{ paddingTop: "2%" }}>
                <Card style={{ width: '40rem' }}>
                    <Card.Header>
                        <h2>Create New Question</h2>
                    </Card.Header>

                    <Card.Body>
                        <p>Complete This Question</p>
                        <strong>Would You Rather ...</strong>
                        <div style={{ paddingTop: "3%" }}>
                            <InputGroup className="mb-3">
                                <FormControl onChange={(e) => setFirstOption({ firstOption: e.target.value })}
                                    placeholder="Enter: option one text here"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    type="text"
                                />
                            </InputGroup>
                        </div>
                        <strong>OR</strong>
                        <div style={{ paddingTop: "3%" }}>
                            <InputGroup className="mb-3" >
                                <FormControl onChange={(e) => setSecondOption({ secondOption: e.target.value })}
                                    placeholder="Enter: option Two text here"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    type="text"
                                />
                            </InputGroup>
                        </div>
                        <div className="d-grid gap-2" style={{ padding: "3%" }}>
                            <Button variant="primary" size="lg" disabled = {Object.values(firstOption).toString() === '' || Object.values(secondOption).toString() === ''} onClick={(e) => handleSubmit(Object.values(firstOption).toString(), Object.values(secondOption).toString())}>
                                Submit
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
function mapStateToProps({ authedUser, users }) {
    return ({
        authedUser,
        user: users[authedUser]
    })
}
export default connect(mapStateToProps)(NewQuestion)