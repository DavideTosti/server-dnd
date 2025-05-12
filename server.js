import express from "express";
import cors from "cors";
import { personaggi } from "./personaggi.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/personaggi", (req, res) => {
  if (personaggi) {
    res.json(personaggi);
  } else if (personaggi.length == 0) {
    res.status(404).json({ message: "Nessun personaggio trovato" });
  } else {
    res.status(404).json({ messagi: "Banca dati non disponibile" });
  }
});

app.get("/personaggi/taglia", (req, res) => {
  const { taglia } = req.query;
  if (taglia) {
    const personaggiFiltrati = personaggi.filter((personaggio) => {
      return personaggio.taglia.toLowerCase() === taglia.toLowerCase();
    });
    if (personaggiFiltrati.length > 0) {
      res.json(personaggiFiltrati);
    } else {
      res.status(404).json({ message: "Nessun personaggio trovato" });
    }
  } else {
    if (personaggi) {
      res.json(personaggi);
    } else if (personaggi.length == 0) {
      res.status(404).json({ message: "Nessun personaggio trovato" });
    } else {
      res.status(404).json({ messagi: "Banca dati non disponibile" });
    }
  }
});

app.get("/personaggi/:id", (req, res) => {
  const { id } = req.params;
  const personaggio = personaggi.find((personaggio) => personaggio.id == id);
  if (personaggio) {
    res.json(personaggio);
  } else {
    res.status(404).json({ message: "Personaggio non trovato" });
  }
});

app.post("/personaggi", (req, res) => {
  if (req.body) {
    const { id, nome, taglia, allineamento, tipo, classeArmatura } = req.body;
    if (id && nome) {
      const personaggio = {
        id,
        nome,
        taglia: taglia || null,
        allineamento: allineamento || null,
        tipo: tipo || null,
        classeArmatura: classeArmatura || null,
      };

      const idEsistente = personaggi.find((personaggio) => {
        return personaggio.id == id;
      });
      const nomeEsistente = personaggi.find((personaggio) => {
        return personaggio.nome.toLowerCase() === nome.toLowerCase();
      });

      if (idEsistente) {
        return res.status(400).json({ message: "ID già esistente" });
      }
      if (nomeEsistente) {
        return res.status(400).json({ message: "Nome già esistente" });
      }

      personaggi.push(personaggio);
      res.status(201).json(personaggio);
    }
  } else {
    res.status(400).json({ message: "Richiesta non valida" });
  }
});

app.put("/personaggi/:id", (req, res) => {
  const { id } = req.params;
  const personaggio = personaggi.find((personaggio) => {
    personaggio.id == id;
  });
  if (req.body && personaggio) {
    const { nome, taglia, allineamento, tipo, classeArmatura } = req.body;
    personaggio.nome = nome || personaggio.nome;
    personaggio.taglia = taglia || personaggio.taglia;
    personaggio.allineamento = allineamento || personaggio.allineamento;
    personaggio.tipo = tipo || personaggio.tipo;
    personaggio.classeArmatura = classeArmatura || personaggio.classeArmatura;
  }
});

app.listen(PORT, () => {
  console.log(`avviato il server su http://localhost:${PORT} `);
});
