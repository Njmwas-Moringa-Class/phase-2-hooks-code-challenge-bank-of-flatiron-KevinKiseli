import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";

function AccountContainer() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <TransactionsList searchTerm={searchTerm} handleSearch={handleSearch} />
    </div>
  );
}

export default AccountContainer;
