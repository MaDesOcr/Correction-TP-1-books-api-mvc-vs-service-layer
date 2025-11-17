const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());

app.use('/books', bookRoutes);

// error handler global
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Erreur interne du serveur',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Books API (v2 - Service Layer) listening on http://localhost:${PORT}`);
});
