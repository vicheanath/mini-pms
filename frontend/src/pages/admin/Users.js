import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";

const Users = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  let uniqueKey = 1;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseOwners = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const responseCustomers = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        if (!responseOwners.ok) {
          throw new Error("Failed to fetch owners");
        }

        const ownersData = await responseOwners.json();
        setOwners(ownersData);
        const customerData = await responseCustomers.json();
        setCustomers(customerData);
        setFilteredData([...ownersData, ...customerData]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching owners:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //For Filtering according to owner or customer
  const handleFilterChange = (value) => {
    setSelectedFilter(value);

    if (value === "all") {
      setFilteredData([...owners, ...customers]);
    } else if (value === "owner") {
      setFilteredData(owners);
    } else if (value === "customer") {
      setFilteredData(customers);
    }
  };

  // For searching Users according to name
  const handleSearch = () => {
    const name = document.getElementById("searchByName").value.toLowerCase();

    const s = setFilteredData((prevData) =>
      prevData.filter((user) => user.title.toLowerCase().includes(name))
    );
    console.log(s);
  };

  return (
    <div>
      <nav>
        <Row className="mt-4">
          <Col>
            <div className="d-flex gap-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                id="searchByName"
              />
              <Button variant="outline-primary" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </Col>
          <Col>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">All</option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </Col>
        </Row>
      </nav>

      <div>
        <h2>User List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={uniqueKey++}>
                  <td>{user.title}</td>
                  <td>{user.id}</td>

                  <td>{user.completed ? "no" : "yes"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Users;
