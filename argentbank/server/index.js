import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const PORT = 4001;
// Charger le fichier YAML de Swagger
const swaggerDocument = YAML.load('./transaction.yml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
const mockTransactions = [
  {
    id: "1",
    month: "2023-04",
    date: "2023-04-10",
    description: "Achat supermarché",
    amount: -50.0,
    balance: 950.0
  },
  {
    id: "2",
    month: "2023-04",
    date: "2023-04-15",
    description: "Salaire",
    amount: 2000.0,
    balance: 2950.0
  }
];

// GET One /api/v1/user/transactions/1
app.get('/api/v1/user/transactions/:id', (req, res) => {
  const transaction = mockTransactions.find(tx => tx.id === req.params.id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});
// GET All /api/v1/user/transactions
app.get('/api/v1/user/transactions', (req, res) => {
  res.json(mockTransactions);
});

// Autres routes à ajouter selon transaction.yml...

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});