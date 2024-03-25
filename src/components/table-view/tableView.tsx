// @ts-expect-error - import react based on eslint rules
import React from 'react';
import './tableView.css';
import CalendarService from '../../services/calendar.service';
import TableViewDaily from '../table-view-daily/table-view-daily';
import TableViewMonthly from '../table-view-monthly/table-view-monthly';

/**
 * TableView
 * @description Table view component
 * @param {object} props
 * @returns {JSX.Element}
 */
function TableView(props: { currency: string; view: string }): JSX.Element {
    const { currency, view } = props;

    const tableViewProps = {
        data: CalendarService.tableData,
        currency,
    };

    return (
        <div>
            {view === 'daily' ? (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TableViewDaily {...tableViewProps} />
            ) : (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TableViewMonthly {...tableViewProps} />
            )}
        </div>
    );
}

export default TableView;
