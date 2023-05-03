import React from "react";

const aggregateData = (data, getValue) => {
  return data.reduce((acc, item) => {
    const value = getValue(item);
    if (acc[value]) {
      acc[value] += item.amount;
    } else {
      acc[value] = item.amount;
    }
    return acc;
  }, {});
};

const AggregatedTransactions = ({ data, getValue }) => {
  const aggregatedTransactions = aggregateData(data, getValue);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(aggregatedTransactions).map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>{aggregatedTransactions[category]}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <td colSpan="1" className="long-cell"></td>
        </tfoot>
      </table>
    </div>
  );
};

export default AggregatedTransactions;
