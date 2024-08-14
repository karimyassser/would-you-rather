import { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'react-bootstrap';
class LeaderBoard extends Component {

    render() {
        return (
            <div>
                <div>
                    {Object.values(this.props.users).sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)).map((user) =>
                        <div align="center" style={{ paddingTop: "2%" }} key={user.id}>
                            <Card style={{ width: '40rem' }}>
                                <Card.Body>
                                    <div style={{ display: "inline-block", float: "left" }}>
                                        <Image style={{ width: "51%" }} src={user.avatarURL} roundedCircle />
                                    </div>
                                    <div style={{ display: "inline-block", float: "left" }}>
                                        <h3>{user.name}</h3>
                                        <p>Answered Questions {Object.keys(user.answers).length}</p>
                                        <p>Created Questions  {user.questions.length}</p>
                                    </div>
                                    <div style={{ display: "inline-block", float: "right" }}>
                                        <Card style={{ width: '7rem' }}>
                                            <Card.Header>
                                                score
                                            </Card.Header>
                                            <p> {Object.keys(user.answers).length + user.questions.length}</p>
                                        </Card>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
function mapStateToProps({ users }) {
    return ({
        users
    })
}
export default connect(mapStateToProps)(LeaderBoard)