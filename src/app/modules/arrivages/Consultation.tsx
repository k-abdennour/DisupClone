import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Card, Accordion } from "react-bootstrap";

const Consultation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    description: "",
    numeroFactureProforma: "",
    dateReception: "",
    pays: "",
    fournisseur: "",
    devise: "",
    tonnage: "",
    tolerance: "",
    dateBooking: "",
    dateFixBuyers: "",
    coutFinancement: "",
    fretPrixDevise: "",
    dateDepotLC: "",
  });

  useEffect(() => {
    const fakeData = {
      id: "ARR-2025-001",
      description: "Arrivage de ferraille E1 et E2",
      numeroFactureProforma: "FP-2025-0458",
      dateReception: "2025-01-10",
      pays: "France",
      fournisseur: "ArcelorMittal",
      devise: "EUR",
      tonnage: "2000",
      tolerance: "5",
      dateBooking: "2025-01-20",
      dateFixBuyers: "2025-01-25",
      coutFinancement: "20000",
      fretPrixDevise: "10000",
      dateDepotLC: "2025-01-30",
    };

    setFormData(fakeData);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex align-items-center mb-4">
        <Button variant="light" onClick={() => navigate(-1)} className="me-3">
          <i className="bi bi-arrow-left"></i>
        </Button>
        <div>
          <h1 className="card-header-title mb-1">Détails de l'arrivage {id}</h1>
        </div>
      </div>

      <Card className="mt-3">
        <div className="card border-0 shadow-sm rounded-3 p-8">
          <h1 className="card-header-title mb-1">Détails d'arrivage</h1>
          <p className="card-header-subtitle mb-4" style={{ fontSize: "1rem" }}>
            Consultez et modifiez les informations de l'arrivage
          </p>

          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Col md={15}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Réception Facture Proforma</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateReception"
                      value={formData.dateReception}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Numéro Facture Proforma</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroFactureProforma"
                      value={formData.numeroFactureProforma}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Pays</Form.Label>
                    <Form.Select
                      name="pays"
                      value={formData.pays}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner un pays</option>
                      <option value="Maroc">Maroc</option>
                      <option value="France">France</option>
                      <option value="Espagne">Espagne</option>
                      <option value="Allemagne">Allemagne</option>
                      <option value="Italie">Italie</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Fournisseur</Form.Label>
                    <Form.Select
                      name="fournisseur"
                      value={formData.fournisseur}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner un fournisseur</option>
                      <option value="ArcelorMittal">ArcelorMittal</option>
                      <option value="Tata Steel">Tata Steel</option>
                      <option value="POSCO">POSCO</option>
                      <option value="Nippon Steel">Nippon Steel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Devise</Form.Label>
                    <Form.Select
                      name="devise"
                      value={formData.devise}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner une devise</option>
                      <option value="MAD">MAD</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tonnage Total</Form.Label>
                    <Form.Control
                      type="text"
                      name="tonnage"
                      value={formData.tonnage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Tolérance Tonnage</Form.Label>
                    <Form.Control
                      type="text"
                      name="tolerance"
                      value={formData.tolerance}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Booking</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateBooking"
                      value={formData.dateBooking}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
                           {/* Accordéon React-Bootstrap */}
                           <Accordion className="mt-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header><h2>Plus de détails</h2></Accordion.Header>
                  <Accordion.Body>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Montant Taxes</Form.Label>
                          <Form.Control
                            type="number"
                            name="montantTaxes"
                            value={formData.montantTaxes}
                            onChange={handleChange}
                            placeholder="Ex: 20000.00"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Signature Contrat</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateSignatureContrat"
                            value={formData.dateSignatureContrat}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Banque</Form.Label>
                          <Form.Control
                            type="text"
                            name="banque"
                            value={formData.banque}
                            onChange={handleChange}
                            placeholder="Nom de la banque"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Demande Licence Import</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateDemandeLicence"
                            value={formData.dateDemandeLicence}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Obtention Licence Import</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateObtentionLicence"
                            value={formData.dateObtentionLicence}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Port Chargement</Form.Label>
                          <Form.Control
                            type="text"
                            name="portChargement"
                            value={formData.portChargement}
                            onChange={handleChange}
                            placeholder="Ex: Port de Marseille"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Limite Chargement</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateLimiteChargement"
                            value={formData.dateLimiteChargement}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Début Chargement</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateDebutChargement"
                            value={formData.dateDebutChargement}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Poids Départ</Form.Label>
                          <Form.Control
                            type="number"
                            name="poidsDepart"
                            value={formData.poidsDepart}
                            onChange={handleChange}
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
                            value={formData.poidsArrivee}
                            onChange={handleChange}
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
                            value={formData.poidsMoyen}
                            onChange={handleChange}
                            placeholder="Ex: 4990.00"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Qualité Départ</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualiteDepart"
                            value={formData.qualiteDepart}
                            onChange={handleChange}
                            placeholder="Qualité départ"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Qualité Arrivée</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualiteArrivee"
                            value={formData.qualiteArrivee}
                            onChange={handleChange}
                            placeholder="Qualité arrivée"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Qualité Moyenne</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualiteMoyenne"
                            value={formData.qualiteMoyenne}
                            onChange={handleChange}
                            placeholder="Qualité moyenne"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date Heure NOR</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateHeureNOR"
                            value={formData.dateHeureNOR}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Taux Déchargement</Form.Label>
                          <Form.Control
                            type="date"
                            name="tauxDechargement"
                            value={formData.tauxDechargement}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="pt-4 mt-7">
                        <Form.Group controlId="dispatchDemurrage">
                          <Form.Check
                            type="switch"
                            name="dispatchDemurrage"
                            label="Dispatch Demurrage"
                            onChange={handleChange}
                            checked={formData.dispatchDemurrage}
                            className="custom-switch-orange"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Conditions Achat</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="conditionsAchat"
                            value={formData.conditionsAchat}
                            onChange={handleChange}
                            placeholder="Conditions d'achat"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Informations Contractuelles</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="informationsContractuelles"
                            value={formData.informationsContractuelles}
                            onChange={handleChange}
                            placeholder="Informations contractuelles"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div className="text-end mb-3 mt-7">
                <Button variant="primary">Enregistrer les modifications</Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Consultation;
