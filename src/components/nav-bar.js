import { Component } from "react";
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
class NavBar extends Component {
handleLogout =()=>{
    
 this.componentWillUnmount(
    //this.props.dispatch(resetState())
 )
}
    render() {

        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "#f8f9fa",
                                    display: "block",
                                    padding: "0.5rem 1rem"
                                }}
                                to="/dashboard">
                                <p>Home</p>
                            </Link>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "#f8f9fa",
                                    display: "block",
                                    padding: "0.5rem 1rem"
                                }}
                                to="/add">
                                <p> New Question</p>
                            </Link>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "#f8f9fa",
                                    display: "block",
                                    padding: "0.5rem 1rem"
                                }}
                                to="/leaderboard">
                                <p> Leader Board </p>
                            </Link>
                        </Nav>
                        {this.props.authedUser && this.props.authedUser !== null
                            ? <div style={{ display: "block" }} >
                                <div style={{ display: "inline-block" }}>
                                    <p style={{ color: "#f8f9fa", display: "inline-block" }}>Hello , {this.props.user.name}</p>
                                </div>
                                <div style={{ display: "inline-block", paddingLeft: "10px" }} >
                                    <Image style={{ width: "15%", display: "inline-block" }} src={this.props.user.avatarURL} roundedCircle />
                                </div>
                                <div style={{ display: "inline-block" }}>
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "#f8f9fa",
                                            display: "block",
                                            padding: "0.5rem 1rem"
                                        }}
                                        to="/"
                                        onClick={(e) =>  this.handleLogout() } >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                            : ""}
                    </Container>
                </Navbar>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, users}) {

    return ({
        user: users[authedUser],
        authedUser
    })
}
export default connect(mapStateToProps)(NavBar)