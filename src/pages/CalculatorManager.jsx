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
import injectHookies from '../utils/hooksInjection';
import RecordTable from '../components/RecordTable';
import Alert from '../components/Alert';

class CalculatorManager extends React.Component {
    constructor(props) {
        super(props);
        this.operationService = new OperationService();
        this.recordService = new RecordService();
        this.state = {
            a: 1,
            b: 1,
            operationId: 2,
            q: "",
            sorting: "",
            sortingField: "",
            pageNumber: 1,
            itemsPerPage: 5,
            operations: [],
            records: [],
            errorToInsert: ""
        }
    }

    componentDidMount () {
        this.#listOperations();
        this.#listRecords();
    }

    componentDidUpdate(_, prevState) {
        if (this.#hasChangedFilter(prevState)) {
            this.#listRecords();
        }
    }

    #hasChangedFilter = prevState => {
        return this.#hasChangedQury(prevState.q)
                || this.#hasChangedSorting(prevState.sorting)
                || this.#hasChangedSortingField(prevState.sortingField)
                || this.#hasChangedPageNumber(prevState.pageNumber)
                || this.#hasChangedItemsPerPage(prevState.itemsPerPage)
    }

    #hasChangedQury = prevQuery => {
        return prevQuery !== this.state.q;
    }

    #hasChangedSorting = prevSorting => {
        return prevSorting !== this.state.sorting;
    }

    #hasChangedSortingField = prevSortingField => {
        return prevSortingField !== this.state.sortingField;
    }

    #hasChangedPageNumber = prevPageNumber => {
        return prevPageNumber !== this.state.pageNumber;
    }

    #hasChangedItemsPerPage = prevItemsPerPage => {
        return prevItemsPerPage !== this.state.itemsPerPage;
    }

    #listOperations = async () => {
        const response = await this.operationService.list();
        const operations = response.map(o => {
            return <option value={o.id} key={o.id}>{o.type} - {o.cost}</option>
        });
        this.setState({ operations: operations });
    }

    #listRecords = async () => {
        let records = await this.recordService.list(
            this.state.q,
            this.state.itemsPerPage,
            (this.state.itemsPerPage * (this.state.pageNumber - 1)),
            this.state.sorting,
            this.state.sortingField
        );
        this.setState({ records: records });
    }

    #deleteRecord = async (selectedRecordId) => {
        await this.recordService.delete(selectedRecordId);
        this.#listRecords();
    }

    #insertRecord = async () => {
        const operationId = parseInt(this.state.operationId);
        const a = parseFloat(this.state.a);
        const b = parseFloat(this.state.b);
        const response = await this.recordService.insert(operationId, a, b);
        if (response) {
            this.setState({ errorToInsert: response.message });
        } else {
            this.#listRecords();
            this.setState({ errorToInsert: "" })
        };
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
                                {this.state.errorToInsert && <Alert >{this.state.errorToInsert}</Alert>}
                                <Form onSubmit={this.#handleInsert}>
                                    <div className="mb-4 align-middle" style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormGroup style={{ marginLeft: '1em', marginRight: '0.5em' }}>
                                            <Label for="operationId">Operation</Label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="operationIdSelect"
                                                value={this.state.operationId}
                                                onChange={e => this.setState({operationId: e.target.value})}
                                                invalid={false}>
                                                {this.state.operations}
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                                            <Label for="a">First value</Label>
                                            <Input
                                                type="number"
                                                value={this.state.a}
                                                onChange={e => this.setState({a: e.target.value})}
                                                invalid={false}>
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '0.5em', marginRight: '1em' }}>
                                            <Label for="b">Second value</Label>
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
                        <br/>
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.#handleInsert}>
                                    <div className="mb-4 align-middle" style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormGroup style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                                            <Label for="q">Query</Label>
                                            <Input
                                                type="text"
                                                value={this.state.q}
                                                onChange={e => this.setState({q: e.target.value})}
                                                invalid={false}>
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '1em', marginRight: '0.5em' }}>
                                            <Label for="sorting">Sorting</Label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="sortingSelect"
                                                value={this.state.sorting}
                                                onChange={e => this.setState({sorting: e.target.value})}
                                                invalid={false}>
                                                <option value={"asc"} key={"asc"}>{"Ascending"}</option>
                                                <option value={"desc"} key={"desc"}>{"Descending"}</option>
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '1em', marginRight: '0.5em' }}>
                                            <Label for="sortingField">Sorting Field</Label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="sortingFieldSelect"
                                                value={this.state.sortingField}
                                                onChange={e => this.setState({sortingField: e.target.value})}
                                                invalid={false}>
                                                <option value={"operation-id"} key={"operation-id"}>{"Operation"}</option>
                                                <option value={"user-balance"} key={"user-balance"}>{"User Balance"}</option>
                                                <option value={"amount"} key={"amount"}>{"Amount"}</option>
                                                <option value={"operation-response"} key={"operation-response"}>{"Response"}</option>
                                                <option value={"date"} key={"date"}>{"date"}</option>
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '0.5em', marginRight: '1em' }}>
                                            <Label for="pageNumber">Page Number</Label>
                                            <Input
                                                type="number"
                                                value={this.state.pageNumber}
                                                onChange={e => this.setState({pageNumber: e.target.value})}
                                                invalid={false}>
                                            </Input>
                                        </FormGroup>

                                        <FormGroup style={{ marginLeft: '1em', marginRight: '0.5em' }}>
                                            <Label for="itemsPerPage">Items per page</Label>
                                            <Input
                                                type="select"
                                                name="select"
                                                id="sortingFieldSelect"
                                                value={this.state.itemsPerPage}
                                                onChange={e => this.setState({itemsPerPage: e.target.value})}
                                                invalid={false}>
                                                <option value={5} key={5}>{5}</option>
                                                <option value={10} key={10}>{10}</option>
                                                <option value={15} key={15}>{15}</option>
                                                <option value={20} key={20}>{20}</option>
                                                <option value={25} key={25}>{25}</option>
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <RecordTable data={this.state.records} onDelete={this.#deleteRecord}/>    
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default injectHookies(CalculatorManager);