import React, { useRef, useState } from "react";
import {
  Card,
  Form,
  Button,
  Table,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { BsSearch, BsThreeDotsVertical, BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AddArrivage: React.FC = () => {
  const [formData, setFormData] = useState({
    toleranceTonnage: "",
    dateBooking: "",
    dateFixBuyers: "",
    coutFinancement: "",
    fretPrixDevise: "",
    dateReceptionFP: "",
    dateDepotLC: "",
    dispatchDemurrage: false,
  });

  const [searchCommandeQuery, setSearchCommandeQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [typeDocument, setTypeDocument] = useState("");
    const navigate = useNavigate();
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [commandes, setCommandes] = useState<
    {
      id: string;
      numeroFactureProforma: string;
      fournisseur: string;
      devise: string;
      qualite: string;
      tonnage: number;
      tauxChange: number;
      delaiPaiement: string;
      prixUnitaire: number;
      incoterm: string;
    }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSearchCommande = () => {
    setIsSearching(true);
    // Simuler un appel API
    setTimeout(() => {
      setCommandes([
        {
          id: "CMD-2025-001",
          numeroFactureProforma: "FP-2025-1001",
          fournisseur: "ArcelorMittal",
          devise: "EUR",
          qualite: "A36",
          tonnage: 5000,
          tauxChange: 10.5,
          delaiPaiement: "30 jours",
          prixUnitaire: 450,
          incoterm: "CIF",
        },
        {
          id: "CMD-2025-002",
          numeroFactureProforma: "FP-2025-1002",
          fournisseur: "Tata Steel",
          devise: "USD",
          qualite: "S235",
          tonnage: 3000,
          tauxChange: 10.3,
          delaiPaiement: "60 jours",
          prixUnitaire: 420,
          incoterm: "FOB",
        },
      ]);

      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="card-header-title mb-1">Création d'arrivage</h3>
      <Card>
        <div className="card border-0 shadow-sm rounded-3 p-8">
          <Card.Body>
            {/* ✅ GESTION DES COMMANDES */}
            <div className="mb-5">
              <h1 className="card-header-title mb-2">Importation des commandes</h1>

              <Form>
                <Row className="align-items-end">
                  <Col md={6}>
                    <Form.Group controlId="searchCommande">
                      <Form.Label>N° de commande</Form.Label>
                      <Form.Control
                        type="text"
                        value={searchCommandeQuery}
                        onChange={(e) => setSearchCommandeQuery(e.target.value)}
                        placeholder="Entrez un numéro de commande"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="auto">
                    <Button
                      variant="primary"
                      onClick={handleSearchCommande}
                      disabled={isSearching}
                      className="d-flex align-items-center"
                    >
                      {isSearching ? (
                        <>
                          Recherche...{" "}
                          <Spinner
                            animation="border"
                            size="sm"
                            className="ms-2"
                          />
                        </>
                      ) : (
                        <>
                          Rechercher <BsSearch className="ms-2" />
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>

              {commandes.length > 0 && (
                <Table bordered responsive className="mt-4">
                  <thead className="table-light">
                    <tr>
                      <th>N° Facture Proforma</th>
                      <th>Fournisseur</th>
                      <th>Devise</th>
                      <th>Qualité</th>
                      <th>Tonnage</th>
                      <th>Taux de change</th>
                      <th>Délai de paiement</th>
                      <th>Prix unitaire Final</th>
                      <th>Incoterm</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandes.map((commande) => (
                      <tr key={commande.id}>
                        <td>{commande.numeroFactureProforma}</td>
                        <td>{commande.fournisseur}</td>
                        <td>{commande.devise}</td>
                        <td>{commande.qualite}</td>
                        <td>{commande.tonnage} tonnes</td>
                        <td>{commande.tauxChange}</td>
                        <td>{commande.delaiPaiement}</td>
                        <td>{commande.prixUnitaire} €/tonne</td>
                        <td>{commande.incoterm}</td>
                        <td className="text-end">
                          <DropdownButton
                            as={ButtonGroup}
                            variant="light"
                            title={<BsThreeDotsVertical />}
                            align="end"
                            size="sm"
                          >
                            <Dropdown.Item>Modifier</Dropdown.Item>
                            <Dropdown.Item>Voir détails</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger">
                              Supprimer
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Card.Body>
        </div>
      </Card>
      <style>{`


        .card-header-title {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
        }

        .card-header-subtitle {
          color: #64748b;
          font-size: 1.1rem;
        }

      `}</style>
      {/* ✅ FORMULAIRE D’ARRIVAGE */}
      <Card  className="mt-3">
        <div className="card border-0 shadow-sm rounded-3 p-8 ">
          <h5 className="card-header-title mb-1">
            Formulaire de création d'arrivage
          </h5>
          <p className="card-header-subtitle mb-4" style={{ fontSize: "1rem" }}>
            Remplissez les informations pour créer un nouvel arrivage
          </p>
          <Card.Body>
            <Form>
              {/* Ligne 1 : Description + Facture */}
              <Row className="mb-3">
                <Col md={15}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Description de l'arrivage"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Numéro Facture Proforma</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroFactureProforma"
                      placeholder="Ex: FP-2025-0458"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Réception Facture Proforma</Form.Label>
                    <Form.Control type="date" name="dateReceptionFP" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 2 : Date réception FP + Pays */}
              <Row className="mb-2">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Pays</Form.Label>
                    <Form.Select name="pays">
                      <option>Sélectionner un pays</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Fournisseur</Form.Label>
                    <Form.Select name="fournisseur">
                      <option>Sélectionner un fournisseur</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Devise</Form.Label>
                    <Form.Select name="devise">
                      <option>Sélectionner une devise</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 4 : Tonnage + Tolérance */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tonnage Total</Form.Label>
                    <Form.Control
                      type="number"
                      name="tonnageTotal"
                      placeholder="Ex: 5000"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tolérance Tonnage</Form.Label>
                    <Form.Control
                      type="number"
                      name="toleranceTonnage"
                      placeholder="Ex: 5"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 5 : Booking + Financement */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Date Booking</Form.Label>
                    <Form.Control type="date" name="dateBooking" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 6 : Fret + Taxes */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Coût Financement</Form.Label>
                    <Form.Control
                      type="number"
                      name="coutFinancement"
                      placeholder="Ex: 25000.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Coût Fret En Devise</Form.Label>
                    <Form.Control
                      type="number"
                      name="fretPrixDevise"
                      placeholder="Ex: 350000.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Montant Taxes</Form.Label>
                    <Form.Control
                      type="number"
                      name="montantTaxes"
                      placeholder="Ex: 20000.00"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 7 : Signature + Banque */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Signature Contrat</Form.Label>
                    <Form.Control type="date" name="dateSignatureContrat" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Banque</Form.Label>
                    <Form.Select name="banque">
                      <option>Sélectionner une banque</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Dépôt Lettre Crédit</Form.Label>
                    <Form.Control type="date" name="dateDepotLC" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 8 : Dépôt LC + Demande Licence */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Demande Licence Import</Form.Label>
                    <Form.Control type="date" name="dateDemandeLicence" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Obtention Licence Import</Form.Label>
                    <Form.Control type="date" name="dateObtentionLicence" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 9 : Obtention + Port */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Port Chargement</Form.Label>
                    <Form.Select name="portChargement">
                      <option>Sélectionner un port</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 10 : Date limite + début chargement */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Limite Chargement</Form.Label>
                    <Form.Control type="date" name="dateLimiteChargement" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Début Chargement</Form.Label>
                    <Form.Control type="date" name="dateDebutChargement" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 11 : Poids */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Poids Départ</Form.Label>
                    <Form.Control
                      type="number"
                      name="poidsDepart"
                      placeholder="Ex: 5000.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Poids Arrivée</Form.Label>
                    <Form.Control
                      type="number"
                      name="poidsArrivee"
                      placeholder="Ex: 4980.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Poids Moyen</Form.Label>
                    <Form.Control
                      type="number"
                      name="poidsMoyen"
                      placeholder="Ex: 4990.00"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 12 : Qualités */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Qualité Départ</Form.Label>
                    <Form.Select name="qualiteDepart">
                      <option>Sélectionner une qualité</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Qualité Arrivée</Form.Label>
                    <Form.Select name="qualiteArrivee">
                      <option>Sélectionner une qualité</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Qualité Moyenne</Form.Label>
                    <Form.Select name="qualiteMoyenne">
                      <option>Sélectionner une qualité</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 13 : NOR + Déchargement */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Heure NOR</Form.Label>
                    <Form.Control type="date" name="dateHeureNOR" />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Taux Déchargement</Form.Label>
                    <Form.Control type="date" name="tauxDechargement" />
                  </Form.Group>
                </Col>

                <Col md={4} className="pt-11">
                  <Form.Group controlId="dispatchDemurrage">
                    <Form.Check
                      type="switch"
                      name="dispatchDemurrage"
                      label="Dispatch Demurrage"
                      onChange={handleCheckboxChange}
                      checked={formData.dispatchDemurrage}
                      className="custom-switch-orange"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ligne 15 : Conditions & Infos contractuelles */}
              <Row className="mb-3">
                <Col md={15}>
                  <Form.Group>
                    <Form.Label>Conditions Achat</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="conditionsAchat"
                      placeholder="Conditions d'achat"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={15}>
                  <Form.Group>
                    <Form.Label>Informations Contractuelles</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="informationsContractuelles"
                      placeholder="Informations contractuelles"
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* Ligne 16 : Type de document + Téléversement */}
              <Row className="mb-3 align-items-end">
                <Col md={10}>
                  <Form.Group>
                    <Form.Label>Type de document</Form.Label>
                    <Form.Select
                      name="typeDocument"
                      value={typeDocument}
                      onChange={(e) => setTypeDocument(e.target.value)}
                    >
                      <option value="">Sélectionner un type de document</option>
                      <option value="facture">Facture proforma</option>
                      <option value="contrat">Contrat</option>
                      <option value="lc">
                        Demande LC ou L'engagement d'import
                      </option>
                      <option value="licence">Licence d'import</option>
                      <option value="radio">
                        Certification de non-radio activité
                      </option>
                      <option value="explosif">
                        Certificat de non explosif
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  {/* Bouton stylé qui déclenche l'upload */}
                  <Button
                    style={{
                      backgroundColor: "#fc5421",
                      borderColor: "#fc5421",
                    }}
                    className="w-100 d-flex align-items-center justify-content-center text-white"
                    onClick={handleUploadClick}
                    disabled={typeDocument === ""}
                  >
                    <BsUpload className="me-2" />
                    Télécharger
                  </Button>

                  {/* Champ réel de type "file", masqué */}
                  <Form.Control
                    type="file"
                    ref={fileInputRef}
                    name="document"
                    style={{ display: "none" }}
                  />
                </Col>
              </Row>

              <div className="text-end mb-4  mt-10">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Annuler
              </button>
                <Button type="submit">Créer l'arrivage</Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default AddArrivage;
