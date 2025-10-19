# 🎬 Servidor de Mídias - Guia de Configuração

## ⚠️ Problema

Navegadores **não permitem** carregar arquivos locais usando `file://` por segurança.

```
❌ Not allowed to load local resource: file:///C:/Users/guilh/projeto/www/midias/...
```

## ✅ Solução

Servir os arquivos através de um servidor HTTP local.

---

## 🔧 Opção 1: Servidor HTTP Simples (Recomendado para Dev)

### Instalar http-server globalmente
```bash
npm install -g http-server
```

### Iniciar servidor de mídias
```bash
# No diretório das mídias
cd C:\Users\guilh\projeto\www\midias

# Iniciar servidor na porta 8089 com CORS habilitado
http-server -p 8089 --cors
```

O servidor ficará rodando em: `http://localhost:8089`

### Testar
Abra no navegador:
```
http://localhost:8089/geopolitica/vinganca-geografia/video/capX.mp4
```

---

## 🔧 Opção 2: Script PowerShell Automático

Criar arquivo `start-media-server.ps1`:

```powershell
# Vai para o diretório de mídias
Set-Location "C:\Users\guilh\projeto\www\midias"

# Inicia o servidor
Write-Host "🎬 Iniciando servidor de mídias em http://localhost:8089" -ForegroundColor Green
Write-Host "📁 Diretório: $PWD" -ForegroundColor Cyan
Write-Host "⏹️  Pressione Ctrl+C para parar" -ForegroundColor Yellow
Write-Host ""

# Verifica se http-server está instalado
if (-not (Get-Command http-server -ErrorAction SilentlyContinue)) {
    Write-Host "❌ http-server não encontrado. Instalando..." -ForegroundColor Red
    npm install -g http-server
}

# Inicia o servidor
http-server -p 8089 --cors -c-1
```

### Executar:
```powershell
.\start-media-server.ps1
```

---

## 🔧 Opção 3: Node.js Express Server

Criar arquivo `media-server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8089;
const MEDIA_PATH = 'C:/Users/guilh/projeto/www/midias';

// Habilitar CORS
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(MEDIA_PATH));

// Log das requisições
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

app.listen(PORT, () => {
  console.log(`🎬 Servidor de mídias rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos de: ${MEDIA_PATH}`);
  console.log(`⏹️  Pressione Ctrl+C para parar`);
});
```

### Instalar dependências:
```bash
npm install express cors
```

### Executar:
```bash
node media-server.js
```

---

## 📝 Atualizar Configuração do Angular

### Atualizar `environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8088/api',
  mediasBasePath: 'http://localhost:8089'  // ← URL do servidor HTTP
};
```

### Atualizar `environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://cemos2028.site/api',
  mediasBasePath: 'https://cemos2028.site/midias'  // ← URL de produção
};
```

---

## 🎯 Estrutura de URLs Final

### Desenvolvimento (com servidor HTTP local)
```
http://localhost:8089/geopolitica/vinganca-geografia/video/capX.mp4
http://localhost:8089/geopolitica/vinganca-geografia/audio/podcast_capX.mp3
```

### Produção (servidor web)
```
https://cemos2028.site/midias/geopolitica/vinganca-geografia/video/capX.mp4
https://cemos2028.site/midias/geopolitica/vinganca-geografia/audio/podcast_capX.mp3
```

---

## 🚀 Workflow de Desenvolvimento

### Terminal 1: Angular Dev Server
```bash
cd C:\Users\guilh\projeto\cemos-2028\frontend
npm start
# Roda em http://localhost:4200
```

### Terminal 2: Media Server
```bash
cd C:\Users\guilh\projeto\www\midias
http-server -p 8089 --cors
# Roda em http://localhost:8089
```

---

## 🐛 Troubleshooting

### Porta 8089 já está em uso
```bash
# Usar outra porta
http-server -p 8090 --cors

# E atualizar environment.ts
mediasBasePath: 'http://localhost:8090'
```

### CORS ainda bloqueando
```bash
# Adicionar flags extras
http-server -p 8089 --cors="*"
```

### Arquivos não aparecem
1. Verificar se o servidor está rodando
2. Testar URL diretamente no navegador
3. Verificar logs do servidor
4. Confirmar estrutura de pastas

---

## 📦 Configuração Nginx para Produção

```nginx
server {
    listen 80;
    server_name cemos2028.site;

    # API
    location /api/ {
        proxy_pass http://localhost:8088/api/;
    }

    # Mídias
    location /midias/ {
        alias /var/www/arquivos/;
        autoindex off;
        
        # Headers para streaming
        add_header Accept-Ranges bytes;
        add_header Cache-Control "public, max-age=31536000";
        
        # CORS se necessário
        add_header Access-Control-Allow-Origin *;
    }

    # Frontend
    location / {
        root /var/www/frontend;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## ✅ Checklist

- [ ] Instalar `http-server`: `npm install -g http-server`
- [ ] Iniciar servidor de mídias: `http-server -p 8089 --cors`
- [ ] Atualizar `environment.ts` com `http://localhost:8089`
- [ ] Testar URL no navegador: `http://localhost:8089/geopolitica/vinganca-geografia/video/capX.mp4`
- [ ] Reiniciar Angular dev server
- [ ] Verificar se vídeos carregam na aplicação

---

## 💡 Dica

Adicione ao `package.json` um script para facilitar:

```json
{
  "scripts": {
    "start": "ng serve",
    "start:media": "http-server C:/Users/guilh/projeto/www/midias -p 8089 --cors",
    "dev": "concurrently \"npm start\" \"npm run start:media\""
  }
}
```

Depois basta executar:
```bash
npm run dev
```

