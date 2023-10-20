import React from "react";
import BaseTable from './BaseTable';
import { Button } from 'reactstrap';

class RecordTable extends React.Component {
    #columns = [
        {
            Header: "RecordId",
            accessor: "id",
        },
        {
            Header: "Operation",
            accessor: "operation.type",
        },
        {
            Header: "OperationId",
            accessor: "operation.id",
        },
        {
            Header: "User Balance",
            accessor: "user-balance",
        },
        {
            Header: "Amount",
            accessor: "amount",
        },
        {
            Header: "Response",
            accessor: "operation-response",
        },
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: " ",
            accessor: "actions",
            Cell: ({ cell }) => (
                <Button color={"danger"} value={cell.row.values.name} onClick={ _ => this.props.onDelete(cell.row.values.id) }>
                    Delete
                </Button>
            )
        }
    ];
    render() {
        return (
            <BaseTable columns={this.#columns} data={this.props.data}/>
        );
    }
}

export default RecordTable;