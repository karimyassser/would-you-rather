import { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Question extends Component {

    render() {
        return (
            <div>
                <Card style={{ width: '35rem' }} className="mb-2" >
                    <Card.Header>
                        <h4 style={{ float: "left" }}>  {this.props.users[this.props.question.author].name} asks :</h4>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <Image style={{ width: "15%", float: "left" }} src={this.props.image.avatarURL} roundedCircle />
                            <strong>Would You Rather!</strong>
                            <p >  {this.props.question.optionOne.text}</p>
                            <Link to={`/questions/${this.props.question.id}`} state={{ id : this.props.question.id }}>
                                <Button variant="primary" size="sm" >
                                    View Poll
                                </Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
function mapStateToProps({ questions, users }, { id, toggle }) {
    const question = questions[id]
    return ({
        question: question,
        image: users[question.author],
        toggle,
        users

    })
}
export default connect(mapStateToProps)(Question)