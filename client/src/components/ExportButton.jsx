import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

const ExportButton = ({ data }) => {
  const headers = [
    { label: "#", key: "index" },
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
  ];

  const csvData = data.map((item, index) => ({
    index: index + 1,
    id: item.id,
    name: item.name,
    address: item.address,
    phone: item.phone,
  }));

  return (
    <div className="export-button">
      <CSVLink data={csvData} headers={headers} filename="users.csv">
        Export to CSV
      </CSVLink>
    </div>
  );
};

ExportButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExportButton;
