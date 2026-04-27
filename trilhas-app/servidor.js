const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


// =====================
// 📦 CONEXÃO MONGODB
// =====================
mongoose.connect('mongodb+srv://sleepperadc_db_user:jgSNaVuL1ZQ1ZvDl@cluster0.t9tjwpv.mongodb.net/?appName=Cluster0')
.then(() => console.log("🟢 MongoDB conectado"))
.catch(err => console.error("❌ Erro MongoDB:", err));


// =====================
// 📚 SCHEMAS
// =====================
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  tipo: { type: String, default: 'user' }
});

const ItemSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  img: String,
  tipo: { type: String, required: true }, // trilha, cachoeira, evento
  datas: { type: [String], default: [] },
  horarios: { type: [String], default: [] }
});

// 👉 NOVO SCHEMA
const InscricaoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  data: String,
  hora: String
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
const Item = mongoose.model('Item', ItemSchema);
const Inscricao = mongoose.model('Inscricao', InscricaoSchema);


// =====================
// 🔐 REGISTRO
// =====================
app.post('/registrar', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await Usuario.create({
      email,
      senha: senhaHash
    });

    res.json({ msg: "Conta criada com sucesso!" });

  } catch (err) {
    res.status(400).json({ erro: "Usuário já existe ou erro no cadastro" });
  }
});


// =====================
// 🔓 LOGIN
// =====================
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha inválida" });
    }

    res.json({ tipo: usuario.tipo });

  } catch (err) {
    res.status(500).json({ erro: "Erro no login" });
  }
});


// =====================
// 🌲 LISTAR TRILHAS
// =====================
app.get('/itens', async (req, res) => {
  try {
    const { tipo } = req.query;
    const filtro = tipo ? { tipo } : {};

    const itens = await Item.find(filtro);
    res.json(itens);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar itens" });
  }
});


// =====================
// 🔍 DETALHE DA TRILHA (NOVO)
// =====================
app.get('/itens/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ erro: "Item não encontrado" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar item" });
  }
});


// =====================
// ➕ ADICIONAR TRILHA
// =====================
app.post('/itens', async (req, res) => {
  try {
    const { nome, descricao, img, tipo, datas, horarios } = req.body;

    const novo = await Item.create({
      nome,
      descricao,
      img,
      tipo,
      datas: datas || [],
      horarios: horarios || []
    });

    res.json(novo);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar item" });
  }
});

// =====================
// 📌 INSCRIÇÃO (AGORA SALVA)
// =====================
app.post('/inscrever', async (req, res) => {
  try {
    const { email, itemId, data, hora } = req.body;

    if (!email || !itemId || !data || !hora) {
      return res.status(400).json({ erro: "Dados incompletos" });
}
  const existe = await Inscricao.findOne({ email, itemId, data, hora });
if (existe) {
  return res.status(400).json({ erro: "Já inscrito nesse horário" });
}

    await Inscricao.create({
    email,
    itemId,
    data,
    hora
  });

    res.json({
      msg: `Inscrição confirmada para ${data} às ${hora}`
    });

  } catch (err) {
    res.status(500).json({ erro: "Erro na inscrição" });
  }
});


// =====================
// 📊 MINHAS INSCRIÇÕES (NOVO)
// =====================
app.get('/minhas-inscricoes/:email', async (req, res) => {
  try {
    const email = req.params.email;

    const inscricoes = await Inscricao.find({ email })
      .populate('itemId');

    // 🔥 FILTRA registros quebrados
    const filtradas = inscricoes.filter(i => i.itemId);

    res.json(filtradas);

  } catch (err) {
    console.error("ERRO REAL:", err); // 👈 IMPORTANTE
    res.status(500).json({ erro: "Erro ao buscar inscrições" });
  }
});


// =====================
// 🏠 HOME
// =====================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


// =====================
// 🚀 SERVIDOR
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

app.delete('/itens/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item removido" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover item" });
  }
});


app.delete("/cancelar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Inscricao.findByIdAndDelete(id);

    if(!resultado){
      return res.status(404).send("Inscrição não encontrada");
    }

    res.send("Deletado com sucesso");
  } catch (err){
    console.error(err);
    res.status(500).send("Erro ao deletar");
  }
});