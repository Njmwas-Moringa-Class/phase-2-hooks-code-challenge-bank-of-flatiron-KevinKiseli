import React, { useEffect, useState, useCallback } from "react";
import Transaction from "./Transaction";
import AddTransactionForm from "./AddTransactionForm";

function TransactionsList({ handleSearch, searchTerm }) {
  const [transactionsData, setTransactionsData] = useState([]);

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const applySearchFilter = useCallback(
    (data) => {
      const filtered = data.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredTransactions(filtered);
    },
    [searchTerm]
  );

  useEffect(() => {
    // Fetch data from JSON server
    fetch("http://localhost:8001/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .then((data) => {
        setTransactionsData(data);
        applySearchFilter(data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchTerm, applySearchFilter]);

  const addTransaction = (newTransaction) => {
    //Post new transaction to backend
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the local state with new transaction
        setTransactionsData([...transactionsData, data]);
        applySearchFilter([...transactionsData, data]);

        // Update filtered transactions
        console.log("New transaction added:", data);
      })
      .catch((error) => {
        console.error("Error adding new transaction:", error);
      });
  };

  return (
    <div>
      <AddTransactionForm onAddTransaction={addTransaction} />

      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>

            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>

            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>

            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
          </tr>
          {filteredTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
