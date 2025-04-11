import React from "react";
import { Formik, Form, Field } from "formik";

interface SearchFormProps {
  onSearch: (searchTerm: string, status: string, view?: string) => void;
  translate: (key: string) => string;
}

const ArrivageSearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  translate,
}) => {
  return (
    <div className="card-body">
      {/* CSS intégré avec champs plus grands */}
      <style>
        {`
        .search-form .form-control,
        .search-form .form-select {
            border-radius: 12px;
            border: 1px solid #dee2e6;
            padding: 1rem 1.25rem;
            font-size: 1rem;
            height: 54px;
        }

        .search-form .form-control::placeholder {
            color: #adb5bd;
            font-size: 0.95rem;
        }

        /*  Bouton filtre avec bordure propre et effet hover */
        .search-form .btn-filter i {
        border: 2px solid #dee2e6; 
        border-radius: 6px;        
        padding: 15px;             
        font-size: 1rem;          
        }



        .search-form .btn-filter:hover i{
        background-color: #fc5421;
        }


        .search-icon-wrapper {
            position: relative;
        }

        .search-icon-wrapper i {
            position: absolute;
            top: 50%;
            left: 16px;
            transform: translateY(-50%);
            color: rgb(189, 173, 173);
            font-size: 1.2rem;
        }

        .search-icon-wrapper input {
            padding-left: 2.5rem !important;
        }

        @media (max-width: 768px) {
            .search-form .row > div {
            margin-bottom: 1rem;
            }
        }
        `}
      </style>

      <Formik
        initialValues={{ searchTerm: "", status: "", view: "" }}
        onSubmit={(values) => {
          onSearch(values.searchTerm, values.status, values.view);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="search-form">
            <div className="row align-items-center">
              {/* Champ de recherche avec icône */}
              <div className="col-md-7 mb-3 search-icon-wrapper">
                <i className="bi bi-search"></i>
                <Field
                  name="searchTerm"
                  className="form-control"
                  placeholder="Rechercher par ID, commande ou fournisseur…"
                />
              </div>

              {/* Sélecteur de statut */}
              <div className="col-md-2 mb-3">
                <Field as="select" name="status" className="form-select">
                  <option value="">{translate("Tous les statuts")}</option>
                  <option value="En cours">En cours</option>
                  <option value="Planifié">Planifié</option>
                  <option value="En transit">En transit</option>
                </Field>
              </div>
              <div className="col-md-2 mb-3">
                <Field as="select" name="view" className="form-select">
                  <option value="">Toutes les vues</option>
                  <option value="Vue Service Achat">Vue Service Achat</option>
                  <option value="Vue Service Finance">
                    Vue Service Finance
                  </option>
                  <option value="Vue Service Logistique">
                    Vue Service Logistique
                  </option>
                </Field>
              </div>
              {/* Bouton filtre avec icône */}
              <div className="col-md-1 mb-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-filter with-border">
                  <i className="bi bi-funnel"></i>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArrivageSearchForm;
