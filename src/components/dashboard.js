import { Component } from 'react'
import { connect } from 'react-redux'
import { Card, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Question from './Question';
class Dashboard extends Component {
    state = {
        toggle: "unAnswered",
        AuthedUser : ""
    }
    render() {
        const unAnsweredQuestions = Object.values(this.props.questions).filter((question) => {
            return (
                !question.optionOne.votes.includes(this.props.authedUser) &&
                !question.optionTwo.votes.includes(this.props.authedUser)
            )
        })
        const AnsweredQuestions = Object.values(this.props.questions).filter((question) => {
            return (
                question.optionOne.votes.includes(this.props.authedUser) ||
                question.optionTwo.votes.includes(this.props.authedUser)
            )
        })
        return (
            <div >
                <div align="center" style={{ paddingTop: "2%" }}>
                    <Card style={{ width: '40rem' }}>
                        <Card.Header>
                            <ToggleButtonGroup type="checkbox" defaultValue={1} className="mb-2">
                                <ToggleButton id="tbg-check-1" className="me-3" value={"unAnswered"} onChange={(e) => this.setState({ toggle: e.target.value })} >
                                    UnAnswered Questions
                                </ToggleButton>
                                <ToggleButton id="tbg-check-2" value={"Answered"} onChange={(e) => this.setState({ toggle: e.target.value })}>
                                    Answered Questions
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Card.Header>
                        <Card.Body>

                            {this.state.toggle === "unAnswered"
                                ? unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp).map((question) => <Question id={question.id} key={question.id} toggle={this.state.toggle} />)
                                : ""}
                            {this.state.toggle === "Answered"
                                ? AnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp).map((question) => <Question id={question.id} key={question.id} toggle={this.state.toggle} />)
                                : ""}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, questions }) {

    return ({
        authedUser,
        questions,
    })
}
export default connect(mapStateToProps)(Dashboard)