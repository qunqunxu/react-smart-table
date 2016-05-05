/**
 * @author xile611
 */
import React, { PropTypes, Component } from 'react';
import Column from './Column';
import { findAllByType, isFunction } from './utils';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const getDisplayName = (el) => (
  el && el.type && (el.type.displayName || el.type.name)
);

const hasNames = (columns) => {
  let result = false;

  for (let i = 0, len = columns.length; i < len; i++) {
    const col = columns[i];
    const { name } = col.props;

    if (name && name !== '') {
      result = true;
    }
  }

  return result;
};

const getStyle = ({ width, align }) => {
  const style = {};

  if (width) {
    style.width = width;
  }
  if (align) {
    style.textAlign = align;
  }

  return style;
};

const renderThs = (columns) => (
  columns.map((col, index) => {
    const { name, dataKey, th } = col.props;
    const props = { name, dataKey, colIndex: index };
    let content;
    let className;

    if (React.isValidElement(th)) {
      content = React.cloneElement(th, props);
      className = getDisplayName(th);
    } else if (isFunction(th)) {
      content = th(props);
      className = th.name;
    } else {
      content = name || '';
    }

    return (
      <th
        key={`th-${index}`}
        style={getStyle(col.props)}
        className={`react-smart-table-th col-${index} col-${dataKey} ${className || ''}`}
      >
        {content}
      </th>
    );
  })
);

const renderTds = (data, entry, columns, rowIndex) => (
  columns.map((col, index) => {
    const { dataKey, td } = col.props;
    const value = entry[dataKey];
    const props = { data, rowData: entry, tdValue: value, dataKey, rowIndex, colIndex: index };

    let content;
    let className;

    if (React.isValidElement(td)) {
      content = React.cloneElement(td, props);
      className = getDisplayName(td);
    } else if (isFunction(td)) {
      content = td(props);
      className = td.name;
    } else {
      content = value;
    }

    return (
      <td
        key={`td-${index}`}
        style={getStyle(col.props)}
        className={`react-smart-table-td col-${index} col-${dataKey} ${className || ''}`}
      >
        {content}
      </td>
    );
  })
);

const renderRows = (data, columns) => {
  if (!data || !data.length) {return null;}

  return data.map((entry, index) => (
    (
      <tr key={`tr-${index}`} className="react-smart-table-tr">
        {renderTds(data, entry, columns, index)}
      </tr>
    )
  ));
};

function Table(props) {
  const { children, data, className } = props;
  const columns = findAllByType(children, Column);

  return (
    <div className={`react-smart-table-container ${className || ''}`}>
      <table className="react-smart-table">
        {hasNames(columns) && (
          <thead className="react-smart-table-thead">
            <tr className="react-smart-table-tr">
              {renderThs(columns)}
            </tr>
          </thead>
        )}
        <tbody className="react-smart-table-tbody">
          {renderRows(data, columns)}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = propTypes;

export default Table;
