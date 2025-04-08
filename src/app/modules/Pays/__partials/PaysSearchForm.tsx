import React from "react";
import { Formik, Form, Field } from "formik";

interface SearchFormProps {
  onSearch: (searchTerm: string, status: string) => void;
  translate: (key: string) => string;
}

const PaysSearchForm: React.FC<SearchFormProps> = ({ onSearch, translate }) => {
  return (
    // <div className="card mb-4">
      <div className="card-body">
        <Formik
          initialValues={{ searchTerm: "", status: "" }}
          onSubmit={(values) => {
            onSearch(values.searchTerm, values.status);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row align-items-end">
                <div className="col-md-5 mb-3">
                  <label className="form-label">
                    🔍 {translate("RECHERCHE")}
                  </label>
                  <Field
                    name="searchTerm"
                    className="form-control"
                    placeholder="Rechercher par ID, commande ou fournisseur…"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">{translate("STATUT")}</label>
                  <Field as="select" name="status" className="form-select">
                    <option value="">Tous les statuts</option>
                    <option value="En cours">En cours</option>
                    <option value="Planifié">Planifié</option>
                    <option value="En transit">En transit</option>
                  </Field>
                </div>
                <div className="col-md-3 mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    {translate("FILTRER")}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    // </div>
  );
};

export default PaysSearchForm;
