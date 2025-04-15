import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "react-bootstrap";
import { BsEye, BsPersonCheck } from "react-icons/bs";

interface Shift {
  id: number;
  date: string;
  heureOuverture: string;
  heureFermeture: string;
}

interface DataTableShiftsProps {
  shifts: Shift[];
  onConsulter: (id: number) => void;
  onAffecter: (id: number) => void;
}

const DataTableShifts: React.FC<DataTableShiftsProps> = ({
  shifts,
  onConsulter,
  onAffecter,
}) => {
  const ActionsTemplate = (rowData: Shift) => (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        size="sm"
        className="border-0 no-caret-toggle"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Actions</Dropdown.Header>

        <Dropdown.Item onClick={() => onConsulter(rowData.id)}>
          <BsEye className="me-2" /> Consulter flotte
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onAffecter(rowData.id)}>
          <BsPersonCheck className="me-2" /> Affecter flotte
        </Dropdown.Item>
      </Dropdown.Menu>

      <style>{`
        .no-caret-toggle::after {
          display: none !important;
        }
      `}</style>
    </Dropdown>
  );

  return (
    <div>
      <style>{`
        .p-datatable {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          font-size: 0.95rem;
        }

        .p-datatable .p-datatable-thead > tr > th {
          background-color: #f8f9fa;
          padding: 1rem;
          font-weight: 600;
          color: #495057;
          font-size: 0.95rem;
          border-right: none !important;
          border-bottom: 1px solid #dee2e6;
        }

        .p-datatable .p-datatable-tbody > tr > td {
          padding: 1rem;
          border: none;
        }

        .p-datatable .p-datatable-tbody > tr {
          border-bottom: 1px solid #dee2e6;
        }
      `}</style>

      <DataTable value={shifts} responsiveLayout="scroll">
        <Column
          field="id"
          header="N"
          body={(rowData) => <strong>{rowData.id}</strong>}
        />
        <Column field="date" header="Date" />
        <Column field="heureOuverture" header="Heure d’ouverture" />
        <Column field="heureFermeture" header="Heure de fermeture" />
        <Column
          header="Actions"
          body={ActionsTemplate}
          style={{ textAlign: "center", width: "8rem" }}
        />
      </DataTable>
    </div>
  );
};

export default DataTableShifts;
