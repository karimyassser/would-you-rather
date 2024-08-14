import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { Card, Image, Button, Form, ProgressBar } from 'react-bootstrap'
import { handleSaveAnswer } from '../actions/Questions'
import { handleModidyUser } from '../actions/Users'
import { useNavigate } from 'react-router'

const QuestionDetails = ({ dispatch, users, questions, authedUser }) => {
    let { id } = useParams()
    let [choice, setChoice] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = () => {
        dispatch(handleSaveAnswer(id, choice))
        dispatch(handleModidyUser(id, choice))
        navigate(`/questions/${id}`, { replace: true })
    }
    const unAnsweredQuestions = Object.values(questions).filter((question) => {
        return (
            !question.optionOne.votes.includes(authedUser) &&
            !question.optionTwo.votes.includes(authedUser)
        )
    })
    const AnsweredQuestions = Object.values(questions).filter((question) => {
        return (
            question.optionOne.votes.includes(authedUser) ||
            question.optionTwo.votes.includes(authedUser)
        )
    })
    return (
        <div>
            {unAnsweredQuestions.filter((question) => question.id === id).length > 0 &&
                <div align="center" style={{ paddingTop: "2%" }}>
                    <Card style={{ width: '40rem' }} className="mb-2" >
                        <Card.Header>
                            <h4 style={{ float: "left" }}>  {users[questions[id].author].name} asks :</h4>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <Image style={{ width: "30%", float: "left" }} src={users[questions[id].author].avatarURL} roundedCircle />
                                <h2>Would You Rather!</h2>
                                <Form style={{ paddingLeft: "35%" }} >
                                    {['radio'].map((type) => (
                                        <div key={`default-${type}`} >
                                            <Form.Check style={{ float: "none" }}
                                                type={type}
                                                id={`default-${type}`}
                                                label={questions[id].optionOne.text}
                                                name="group1"
                                                value={"optionOne"}
                                                onChange={(e) => choice = setChoice(choice = e.target.value)}
                                            />
                                            <Form.Check style={{ float: "none" }}
                                                type={type}
                                                id={`disabled-default-${type}`}
                                                label={questions[id].optionTwo.text}
                                                name="group1"
                                                value={"optionTwo"}
                                                onChange={(e) => setChoice(choice = e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </Form>
                                <div>
                                    <Button variant="primary" size="sm" className="me-5" disabled={choice == null} onClick={(e) => handleSubmit()}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>}
            {AnsweredQuestions.filter((question) => question.id === id).length > 0 &&
                <div>

                    <div align="center" style={{ paddingTop: "2%" }}>
                        <Card style={{ width: '40rem' }} className="mb-2" >
                            <Card.Header>
                                <h4 style={{ float: "left" }}> Asked By : {users[questions[id].author].name} </h4>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Image style={{ width: "30%", float: "left" }} src={users[questions[id].author].avatarURL} roundedCircle />
                                    <h2> Results</h2>
                                </div>
                                <div>
                                    <Card style={{ ...questions[id].optionOne.votes.includes(authedUser) && { backgroundColor: "gray" }, width: '20rem' }} className="mb-2">
                                        <Card.Body>
                                            <strong> Would you Rather {questions[id].optionOne.text}</strong>
                                            <ProgressBar label={`${((questions[id].optionOne.votes.length) / Object.keys(users).length) * 100}%`} />
                                            <p style={{ paddingTop: "2%" }}>{questions[id].optionOne.votes.length}  Out OF {Object.keys(users).length}</p>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div >
                                    <Card style={{ ...questions[id].optionTwo.votes.includes(authedUser) && { backgroundColor: "gray" }, width: '20rem' }} className="mb-2">
                                        <Card.Body>
                                            <strong> Would you Rather {questions[id].optionTwo.text}</strong>
                                            <ProgressBar label={`${((questions[id].optionTwo.votes.length) / Object.keys(users).length) * 100}%`} />
                                            <p style={{ paddingTop: "2%" }}>{questions[id].optionTwo.votes.length}  Out OF {Object.keys(users).length}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>}

        </div>
    )
}

function mapStateToProps({ authedUser, questions, users }) {
    return ({
        authedUser,
        questions,
        users
    })
}
export default connect(mapStateToProps)(QuestionDetails)