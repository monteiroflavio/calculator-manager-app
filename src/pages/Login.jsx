import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody
} from 'reactstrap';

import ValidatorService from '../services/validators';
import UserService from '../services/users';
import injectHookies from '../utils/hooksInjection';
import Alert from '../components/Alert';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorEmail: "",
            errorPassword: "",
            errorLogin: ""
        };
        this.isValidEmail = this.#isValidEmail.bind(this);
        this.isValidPassword = this.#isValidPassword.bind(this);
        this.isValidLogin = this.#isValidPassword.bind(this);
        this.validateEmail = this.#validateEmail.bind(this);
        this.validatePassword = this.#validatePassword.bind(this);
        this.validateForm = this.#validateForm.bind(this);
        this.handleSubmit = this.#handleSubmit.bind(this);
        this.authenticate = this.#authenticate.bind(this);
        this.canAuthenticate = this.#canAuthenticate.bind(this);
    }

    componentDidUpdate = (_, __) => {
        if (this.#canAuthenticate()) {
            this.#authenticate();
        }
    }

    #validateEmail = () => {
        this.setState({
            errorEmail: ValidatorService.validateEmail(this.state.email)
        });
    }

    #validatePassword = () => {
        this.setState({
            errorPassword: ValidatorService.validatePassword(this.state.password)
        });
    }

    #isValidEmail = () => {
        return this.state.errorEmail.length === 0;
    }

    #isValidPassword = () => {
        return this.state.errorPassword.length === 0;
    }

    #isValidLogin = () => {
        return this.state.errorLogin.length === 0;
    }

    #validateForm = () => {
        this.#validateEmail();
        this.#validatePassword();
    };

    #authenticate = async () => {
        let isAuthenticated = await UserService.authenticate(this.state.email, this.state.password);
        if (isAuthenticated) {
            this.props.navigate('manager', { replace: true });
        } else {
            this.setState({ errorLogin: "Invalid username or password." });
        }
    }

    #canAuthenticate = () => {
        return this.#isValidEmail() && this.#isValidPassword() && this.#isValidLogin();
    }
    
    #handleSubmit = e => {
        e.preventDefault();
        this.#validateForm();
        this.setState({ errorLogin: "" });
    };

    render() {
        return (
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row>
                    <Col md={12}>
                    <Card>
                        <CardBody>
                        <Form onSubmit={this.#handleSubmit}>
                            <h2 className="text-center mb-4">Login</h2>
                        

                            <FormGroup>
                            {this.state.errorLogin && <Alert >{this.state.errorLogin}</Alert>}
                            <Label for="email">Email</Label>
                                {this.state.errorEmail && <Alert >{this.state.errorEmail}</Alert>}
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={e => this.setState({email: e.target.value})}
                                invalid={!this.#isValidEmail()}
                            />
                            </FormGroup>
                            
                            <FormGroup>
                            <Label for="password">Password</Label>
                            {this.state.errorPassword && <Alert >{this.state.errorPassword}</Alert> }
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                                invalid={!this.#isValidPassword()}
                            />
                            </FormGroup>
                            
                            <Button color="primary" block>
                            Login
                            </Button>
                        </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default injectHookies(Login);