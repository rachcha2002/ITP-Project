import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Row,
  Stack,
  OverlayTrigger,
  Tooltip,
  Col,
  Form,
} from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import SalaryDetailsModal from "./SalaryDetailsModal";
import html2pdf from "html2pdf.js";
import { CSVLink } from "react-csv";
import HRConfirmModal from "./HRConfirmModal";
import { StaffAuthContext } from "../../../context/StaffAuthContext";
import logo from "../../../images/logoblack_trans.png";

function Salary({ toggleLoading }) {
  const { userId, userPosition } = useContext(StaffAuthContext);

  //const navigate = useNavigate();
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [salaryReload, setSalaryReload] = useState(false);

  //for search part
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmployeeID, setSearchEmployeeID] = useState("");
  const [searchPosition, setSearchPosition] = useState("");

  const [noPayLog, setNoPayLog] = useState(false);
  const [showNoPayConfirm, setShowNopayConfirm] = useState(false);

  useEffect(() => {
    // Fetch salary records from the backend when the component mounts
    const fetchSalaryRecords = async () => {
      try {
        toggleLoading(true);
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/salaries`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);

        setSalaryRecords(data);
        setSalaryReload(false);
      } catch (error) {
        console.error("Error fetching salary records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchSalaryRecords();
    fetchLogsForToday();
  }, [salaryReload]);

  const handleMoreButtonClick = (id) => {
    setSelectedRecordId(id);
    setShowSalaryModal(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowSalaryModal(false);
    setSalaryReload(true);
  };

  // Filter table data based on search queries
  useEffect(() => {
    const filteredData = salaryRecords.filter((salary) => {
      const nameMatches = salary.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const employeeIDMatches = salary.empId
        .toLowerCase()
        .includes(searchEmployeeID.toLowerCase());
      const positionMatches = salary.position
        .toLowerCase()
        .includes(searchPosition.toLowerCase());
      return nameMatches && employeeIDMatches && positionMatches;
    });
    setFilteredTableData(filteredData);
  }, [salaryRecords, searchName, searchEmployeeID, searchPosition]);

  const clearFilters = () => {
    setSearchName("");
    setSearchEmployeeID("");
    setSearchPosition("");
  };

  //CSV Data generation
  const generateCSVData = () => {
    const currentDate = new Date().toLocaleDateString();

    // Add table name and generated date as the first two rows
    const csvData = [
      ...filteredTableData.map((record) => ({
        Id: record.empId,
        Name: record.name,
        Position: record.position,
        Basic: record.basicSalary,
        Allowance: record.allowance,
        "Total Salary": record.totalSal,
        "No Pay": record.noPay,
        "ETF-3%": record.ETF,
        "EPF-8%": record.EPFE,
        "Net Salary": record.netSal,
        "EPF-12%": record.EPFC,
        Bank: record.bank,
        Branch: record.branch,
        "Account No": record.account,
      })),
      { Id: "Salary Records" },
      { Id: `Generated Date: ${currentDate}` },
      { Id: `Generated by: Neo Tech Motors & Services` },
    ];

    return csvData;
  };

  // Generate PDF content with table rows and other details
  const generatePDF = () => {
    const currentDate = new Date().toLocaleDateString();

    // Generate table rows dynamically based on the current state of table data
    const tableRows = filteredTableData
      .map((record) => {
        return `
        <tr>
          <td>${record.empId}</td>
          <td>${record.name}</td>
          <td>${record.position}</td>
          <td>Rs.${record.basicSalary}</td>
          <td>Rs.${record.allowance}</td>
          <td>Rs.${record.totalSal}</td>
          <td>Rs.${record.noPay}</td>
          <td>Rs.${record.ETF}</td>
          <td>Rs.${record.EPFE}</td>
          <td>Rs.${record.netSal}</td>
          <td>Rs.${record.EPFC}</td>
        </tr>
      `;
      })
      .join("");

    // Generate PDF content with table rows and other details
    const content = `
      <div style="margin: 20px;">
      <div >
      <h4 class="float-end font-size-15">Human Resources</h4>
      <div class="mb-4">
        <img src="${logo}" alt="Invoice Logo" width="200px" />
      </div>
      <div class="text-muted">
      <p class="mb-1"><i class="bi bi-geo-alt-fill"></i>323/1/A Main Street Battaramulla</p>
      <p class="mb-1">
      <i class="bi bi-envelope-fill me-1"></i> info@neotech.com
      </p>
      <p>
      <i class="bi bi-telephone-fill me-1"></i> 0112887998
      </p>

      </div>
      <hr/>
    </div>
        <h3 style="background-color: black; color: white; padding: 10px;">Salary Records of Employees</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
  
          <thead>
            <tr style="background-color: black; color: white;">
              <th style="border: 1px solid white; padding: 10px;">Id</th>
              <th style="border: 1px solid white; padding: 10px;">Name</th>
              <th style="border: 1px solid white; padding: 10px;">Position</th>
              <th style="border: 1px solid white; padding: 10px;">Basic</th>
              <th style="border: 1px solid white; padding: 10px;">Allowance</th>
              <th style="border: 1px solid white; padding: 10px;">Total Salary</th>
              <th style="border: 1px solid white; padding: 10px;">No Pay</th>
              <th style="border: 1px solid white; padding: 10px;">ETF-3%</th>
              <th style="border: 1px solid white; padding: 10px;">EPF-8%</th>
              <th style="border: 1px solid white; padding: 10px;">Net Salary</th>
              <th style="border: 1px solid white; padding: 10px;">EPF-12%</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <p style="text-align: right; margin-top: 20px;">Authorized By: ${userPosition}</p>
        
        <p style="text-align: right; margin-top: 20px;">Generated Date: ${currentDate}</p>
        <p style="text-align: right; margin-top: 20px;">Neo Tech Motors & Services</p>
      </div>
    `;

    // Generate PDF from the content
    const options = {
      margin: 0.5,
      filename: `Salary_Records_generated_${currentDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" }, // Set orientation to landscape
    };

    html2pdf().from(content).set(options).save();
  };

  //pass salary to finance
  const handleSetMonth = async () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonthIndex = currentDate.getMonth();

    let previousMonthIndex;
    let previousYear;

    if (currentMonthIndex === 0) {
      previousMonthIndex = 11; // December (0-based index)
      previousYear = currentDate.getFullYear() - 1;
    } else {
      previousMonthIndex = currentMonthIndex - 1;
      previousYear = currentDate.getFullYear();
    }

    const previousMonth = new Date(
      previousYear,
      previousMonthIndex
    ).toLocaleString("default", { month: "long" });
    const monthToSet =
      currentDay > 10
        ? currentDate.toLocaleString("default", { month: "long" })
        : previousMonth;
    console.log("Selected Month:", monthToSet);

    try {
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/pass-salary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month: monthToSet }), // Send the selected month in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set month");
      }

      const data = await response.json();
      console.log("Response:", data); // Log the response from the server
      if (data) {
        alert("Salary records sent to finance successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Salary records sent to finance unsuccessfull.Try Again.");
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  //no pay operations
  /* useEffect(() => {
    fetchLogsForToday();
  }, []);*/

  const fetchLogsForToday = async () => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr//nopaylogs/today`
      ); // Assuming this is the route you set up
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      if (data.length > 0) {
        setNoPayLog(true);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  const handleNoPayClick = async () => {
    setShowNopayConfirm(true);
  };

  const handleNoPayOp = async () => {
    try {
      toggleLoading(true); // Set loading to true before API call

      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/nopay`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to trigger function");
      }
      const data = await response.json();
      console.log("Function triggered successfully:", data);
      setShowNopayConfirm(false);
      if (data) {
        alert("No Pay deducts successfully");
      }
    } catch (error) {
      console.error("Error triggering function:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
    <section>
      <Row>
        <Stack direction="horizontal">
          <div className="p-2">
            <Button variant="success" size="md" style={{ margin: "10px" }}>
              <CSVLink
                data={generateCSVData()}
                filename={`Salary_Records_${new Date().toLocaleDateString()}.csv`}
              >
                Create Report(CSV)
                <span
                  className="bi bi-file-excel"
                  style={{ marginRight: "5px" }}
                ></span>
              </CSVLink>
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={generatePDF}
              style={{ margin: "10px" }}
            >
              Create Report(PDF)
              <span
                className="bi bi-file-pdf"
                style={{ marginRight: "5px" }}
              ></span>
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={handleSetMonth}
              style={{ margin: "10px" }}
            >
              Send to Finance
            </Button>
            {!noPayLog ? (
              <Button
                variant="dark"
                size="md"
                onClick={handleNoPayClick}
                style={{ margin: "10px" }}
              >
                Deduct Yesterday Nopay
              </Button>
            ) : null}
          </div>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-top">
                Cannot create or delete leave profiles in here.Beacuse
                operations like that can only perform with employee relavant
                operations only.(When employee create or delete his/her profile
                automatically change in here.)
              </Tooltip>
            }
          >
            <div>
              <i
                className="bi bi-info-circle"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
              ></i>
            </div>
          </OverlayTrigger>
        </Stack>
      </Row>
      <hr />
      <Form>
        <Row>
          <Col md={3}>
            <Form.Group controlId="searchName">
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="searchEmployeeID">
              <Form.Control
                type="text"
                placeholder="Search by employee ID..."
                value={searchEmployeeID}
                onChange={(e) => setSearchEmployeeID(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="searchPosition">
              <Form.Control
                type="text"
                placeholder="Search by position..."
                value={searchPosition}
                onChange={(e) => setSearchPosition(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={clearFilters}>
              Clear Search
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      {/* Render the table with salary records */}
      <div className="table">
        <table className="table table-rounded">
          <thead>
            <tr>
              <th style={{ backgroundColor: "black", color: "white" }}>Id</th>
              <th style={{ backgroundColor: "black", color: "white" }}>Name</th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Position
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Basic
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Allowance
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Total Salary
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Deductions
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Net Salary
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}></th>
            </tr>
          </thead>

          <tbody>
            {filteredTableData.map((record) => (
              <tr key={record.id}>
                {/* Render data for each salary record */}
                <td>{record.empId}</td>
                <td>{record.name}</td>
                <td>{record.position}</td>
                <td>Rs.{record.basicSalary}</td>
                <td>Rs.{record.allowance}</td>
                <td>Rs.{record.totalSal}</td>
                <td>
                  Rs.
                  {record.noPay + record.EPFE}
                </td>
                <td>Rs.{record.netSal}</td>
                <td>
                  {/* More button with onClick handler */}
                  <Button
                    variant="dark"
                    className="d-flex mx-auto"
                    onClick={() => handleMoreButtonClick(record._id)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render the SalaryDetailsModal with appropriate props */}
      <SalaryDetailsModal
        show={showSalaryModal}
        handleClose={handleCloseModal}
        id={selectedRecordId}
        toggleLoading={toggleLoading}
      />

      {/* No Pay confirmation modal */}
      <HRConfirmModal
        show={showNoPayConfirm}
        onHide={() => setShowNopayConfirm(false)}
        title="No Pay Deduct Confirmation"
        message="Are you sure you want to update no pay deductions for yesterday? This process cannot be undone."
        onConfirm={handleNoPayOp}
        btnColor={"warning"}
        btnName={"Deduct No Pay"}
      />
    </section>
  );
}

export default Salary;
