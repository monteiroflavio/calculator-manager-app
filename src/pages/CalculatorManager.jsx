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

import RecordService from '../services/records';
import OperationService from '../services/operations';

class CalculatorManager extends React.Component {
    constructor(props) {
        super(props);
        this.operationService = new OperationService();
        this.recordService = new RecordService();
        this.state = {
            a: 0,
            b: 0,
            operationId: 0,
            operations: [],
            listOperations: this.#listOperations.bind(this),
            listRecords: this.#listRecords.bind(this),
            deleteRecord: this.#deleteRecord.bind(this),
            insertRecord: this.#insertRecord.bind(this),
            handleInsert: this.#handleInsert.bind(this)
        }
        this.#listOperations();
        // this.#listRecords();
        // this.#deleteRecord(14);
        // this.#insertRecord();
    }

    componentDidUpdate (_, __) {
    }

    #listOperations = async () => {
        const response = await this.operationService.list();
        const operations = response.map(o => {
            return <option value={o.id} key={o.id}>{o.type}</option>
        });
        this.setState({ operations: operations });
    }

    #listRecords = async () => {
        let records = await this.recordService.list(null, null, null, null, null);
        console.log(records);
    }

    #deleteRecord = async (selectedRecordId) => {
        let response = await this.recordService.delete(selectedRecordId);
        console.log(response);
    }

    #insertRecord = async () => {
        let response = await this.recordService.insert(2, 10, 11);
        console.log(response);
    }

    #handleInsert = async e => {
        e.preventDefault();
        await this.#insertRecord(this.state.operationId, this.state.a, this.state.b);
    }

    render() {
        return (
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row>
                    <Col md={12}>
                        <h1 className="text-center mb-4">Calculator Manager</h1>
                        <Card>
                            <CardBody>
                                <h2 className="text-center mb-4">Insert a new calculation</h2>
                                <Form onSubmit={this.#handleInsert}>
                                    <div className="mb-4 align-middle" style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormGroup style={{ marginLeft: '1em', marginRight: '0.5em' }}>
                                            <Label for="operationId">Operation</Label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="exampleSelect"
                                                value={this.state.operationId}
                                                onChange={e => this.setState({operationId: e.target.value})}
                                                invalid={false}>
                                                {this.state.operations}
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                                            <Label for="operationId">First value</Label>
                                            <Input
                                                type="number"
                                                value={this.state.a}
                                                onChange={e => this.setState({a: e.target.value})}
                                                invalid={false}>
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '0.5em', marginRight: '1em' }}>
                                            <Label for="operationId">Second value</Label>
                                            <Input
                                                type="number"
                                                value={this.state.b}
                                                onChange={e => this.setState({b: e.target.value})}
                                                invalid={false}>
                                            </Input>
                                        </FormGroup>
                                    </div>

                                    <Button color="primary" block>Calculate</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CalculatorManager;