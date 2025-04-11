import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "react-bootstrap";
import {
  BsClipboardCheck,
  BsCreditCard,
  BsFileEarmarkText,
  BsTrash,
  BsTruck,
} from "react-icons/bs";

interface Arrivage {
  id: string;
  commande: string;
  fournisseur: string;
  dateCreation: string;
  tonnage: string;
  statut: string;
  dateArrivee: string;
  nomNavire?: string;
  lastDateOfShipment?: string;
}

interface PaysDataTableProps {
  data: Arrivage[];
  loading: boolean;
  translate: (key: string) => string;
  onDelete: (id: string) => void;
}

const ArrivageDataTable: React.FC<PaysDataTableProps> = ({
  data,
  loading,
  translate,
  onDelete,
}) => {
  const [first, setFirst] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate(); // ✅ initialize navigation

  const StatutTemplate = (rowData: Arrivage) => {
    const getBadgeClass = (status: string) => {
      switch (status) {
        case "En cours":
          return "badge-status badge-danger";
        case "Planifié":
          return "badge-status badge-light";
        case "En transit":
          return "badge-status badge-secondary";
        default:
          return "badge-status badge-muted";
      }
    };

    return (
      <span className={getBadgeClass(rowData.statut)}>{rowData.statut}</span>
    );
  };

  const ActionsTemplate = (rowData: Arrivage) => (
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

        <Dropdown.Item onClick={() => navigate(`/consultation/${rowData.id}`)}>
          <BsFileEarmarkText className="me-2" /> Consultation
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate(`/paiement/${rowData.id}`)}>
          <BsCreditCard className="me-2" /> Modalité de paiement
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate(`/logistique/${rowData.id}`)}>
          <BsTruck className="me-2" /> Logistique
        </Dropdown.Item>
        <Dropdown.Item disabled>
          <BsClipboardCheck className="me-2" /> Qualification
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          className="text-danger"
          onClick={() => onDelete(rowData.id)}
        >
          <BsTrash className="me-2" /> Supprimer
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

        .badge-status {
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .badge-danger {
          background-color:#fc5421;
          color: white;
        }

        .badge-light {
          background-color: #f1f3f5;
          color: #495057;
        }

        .badge-secondary {
          background-color: #dee2e6;
          color: #495057;
        }

        .badge-muted {
          background-color: #e9ecef;
          color: #6c757d;
        }
      `}</style>

      <DataTable
        value={data}
        paginator
        rows={pageSize}
        first={first}
        onPage={(e: { first: number }) => setFirst(e.first)}
        loading={loading}
        emptyMessage={translate("NO_DATA_FOUND")}
        dataKey="id"
        responsiveLayout="scroll"
      >
        <Column
          field="id"
          header="ID Arrivage"
          body={(rowData) => <strong>{rowData.id}</strong>}
        />
        <Column field="commande" header="N° LC" />
        <Column field="fournisseur" header="Fournisseur" />
        <Column field="nomNavire" header="Nom du navire" />
        <Column field="dateCreation" header="Date création" />
        <Column field="tonnage" header="Tonnage" />
        <Column field="statut" header="Statut" body={StatutTemplate} />
        <Column field="dateArrivee" header="EDA" />
        <Column
          header={<span style={{ color: "red" }}>LDS</span>}
          body={(rowData: Arrivage) =>
            rowData.lastDateOfShipment ? (
              <span>
                {new Date(rowData.lastDateOfShipment).toLocaleDateString(
                  "fr-FR"
                )}
              </span>
            ) : (
              <span className="text-muted fst-italic">Non défini</span>
            )
          }
        />

        <Column
          header="Actions"
          body={(rowData) => ActionsTemplate(rowData)}
          style={{ textAlign: "center", width: "6rem" }}
        />
      </DataTable>
    </div>
  );
};

export default ArrivageDataTable;
