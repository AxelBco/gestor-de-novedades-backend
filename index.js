const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema y modelo
const ActividadSchema = new mongoose.Schema({
  nombre: String,
  lugar: String,
  horario: String,
  fechaFin: Date,
  detalles: String
});
const Actividad = mongoose.model('Actividad', ActividadSchema);

// Endpoints
app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/actividades', async (req, res) => {
  const actividades = await Actividad.find();
  res.json(actividades);
});

app.put('/actividades/:id', async (req, res) => {
  const actividadActualizada = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actividadActualizada);
});

app.post('/actividades', async (req, res) => {
  console.log('POST /actividades body:', req.body);
  const nueva = new Actividad(req.body);
  await nueva.save();
  res.json(nueva);
});

app.delete('/actividades/:id', async (req, res) => {
  await Actividad.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Usar el puerto asignado por Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));