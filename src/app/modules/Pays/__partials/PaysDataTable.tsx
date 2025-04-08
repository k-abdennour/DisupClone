import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Arrivage {
  id: string;
  commande: string;
  fournisseur: string;
  dateCreation: string;
  tonnage: string;
  statut: string;
  dateArrivee: string;
}

interface PaysDataTableProps {
  data: Arrivage[];
  loading: boolean;
  translate: (key: string) => string;
  onDelete: (id: string) => void;
}

const PaysDataTable: React.FC<PaysDataTableProps> = ({
  data,
  loading,
  translate,
  onDelete,
}) => {
  const [first, setFirst] = useState(0);
  const pageSize = 10;

  const StatutTemplate = (rowData: Arrivage) => {
    const getBadgeClass = (status: string) => {
      switch (status) {
        case "En cours":
          return "badge bg-danger-subtle text-danger fw-semibold";
        case "Planifié":
          return "badge bg-light text-dark fw-semibold";
        case "En transit":
          return "badge bg-secondary-subtle text-secondary fw-semibold";
        default:
          return "badge bg-light text-muted";
      }
    };

    return (
      <span
        className={getBadgeClass(rowData.statut)}
        style={{ padding: "6px 12px", borderRadius: "12px" }}
      >
        {rowData.statut}
      </span>
    );
  };

  const ActionsTemplate = () => (
    <button className="btn btn-light">
      <i className="bi bi-three-dots-vertical"></i>
    </button>
  );

  return (
    <div className=" ">
      <DataTable
        value={data}
        paginator
        rows={pageSize}
        first={first}
        onPage={(e: { first: React.SetStateAction<number> }) => setFirst(e.first)}
        loading={loading}
        emptyMessage={translate("NO_DATA_FOUND")}
        dataKey="id"
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID Arrivage" />
        <Column field="commande" header="N° Commande" />
        <Column field="fournisseur" header="Fournisseur" />
        <Column field="dateCreation" header="Date création" />
        <Column field="tonnage" header="Tonnage" />
        <Column field="statut" header="Statut" body={StatutTemplate} />
        <Column field="dateArrivee" header="Date arrivée" />
        <Column header="Actions" body={ActionsTemplate} style={{ textAlign: "center", width: "6rem" }} />
      </DataTable>
    </div>
  );
};

export default PaysDataTable;
