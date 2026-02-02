# Monitoramento com Prometheus e Grafana

Este guia consolida todas as etapas necessárias para coletar e visualizar métricas de logins e downloads de PDF com Prometheus + Grafana após as mudanças implementadas no backend Django e no frontend Angular. Ele complementa `OBSERVABILIDADE.md`, servindo como passo a passo operacional para levantar a stack de monitoramento em produção e desenvolvimento.

---

## 1. Instrumentação existente

### 1.1 Backend Django
- Dependência `prometheus-client` já adicionada em `backend/requirements.txt`.
- Métricas expostas por `django_cemos2028.observability.metrics` e servidas em `GET /metrics/` via `metrics_view`.
- Login JWT incrementa `login_requests_total` em `CustomTokenObtainPairSerializer` (sucesso) e `CustomTokenObtainPairView` (erro).
- Eventos de download chegam via `POST /api/telemetry/pdf-download/` (view autenticada) e alimentam `pdf_download_total`.

**Checklist antes de subir Prometheus**
1. `docker compose up backend` ou equivalente.
2. Executar `curl http://localhost:8000/metrics/` (ou usando `docker compose exec backend curl http://localhost:8000/metrics/`).
3. Confirmar que o output contém `login_requests_total` e `pdf_download_total` após realizar um login e gerar um PDF.

### 1.2 Frontend Angular
- `ObservabilityService` faz `POST` para `/api/telemetry/pdf-download/` usando snake_case (`simulado_nome`, `origem`, `bibliografias`, `total_questoes`).
- `SimuladosPdfService` notifica automaticamente após `pdf.save()` com origem (`preset`, `custom` ou `desconhecida`) e bibliografias selecionadas.
- Componentes `Simulados` preenchem `PdfCustomizationOptions` com `origem` e `bibliografias`, garantindo contagem correta para todos os fluxos atuais.

---

## 2. Estrutura de configuração de observabilidade

```
observability/
├── prometheus/
│   ├── prometheus.yml          # produção
│   └── prometheus.dev.yml      # desenvolvimento
└── grafana/
    ├── provisioning/
    │   ├── datasources/prometheus.yml
    │   └── dashboards/dashboards.yml
    └── dashboards/
        └── logins-pdf.json
```

- `prometheus.yml` já aponta para `backend:8000/metrics` no job `django-backend`.
- O dashboard `logins-pdf.json` exibe séries com `rate(login_requests_total[5m])` e `rate(pdf_download_total[5m])`.
- Provisionamento do Grafana está habilitado para carregar datasource e dashboards automaticamente.

---

## 3. docker-compose de produção (`docker-compose.yml`)

```yaml
services:
  prometheus:
    image: prom/prometheus:v2.53.0
    container_name: cemos2028_prometheus
    restart: unless-stopped
    command: ['--config.file=/etc/prometheus/prometheus.yml']
    volumes:
      - ./observability/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    ports:
      - '9090:9090'                  # mantenha restrito via firewall/VPN
    depends_on:
      - backend
    networks:
      - app_network

  grafana:
    image: grafana/grafana:11.1.0
    container_name: cemos2028_grafana
    restart: unless-stopped
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=@cemos2028   # alinhado ao admin Django
    volumes:
      - grafana_data:/var/lib/grafana
      - ./observability/grafana/provisioning:/etc/grafana/provisioning
      - ./observability/grafana/dashboards:/var/lib/grafana/dashboards
    ports:
      - '3000:3000'
    depends_on:
      - prometheus
    networks:
      - app_network

volumes:
  static_volume:
  postgres_data:
  prometheus_data:
  grafana_data:
```

### 3.1 Nginx (produção)
- Não exponha `9090/3000` publicamente. Prefira VPN/SSH tunnel.
- Se for necessário publicar, crie locations autenticadas (ex.: `/monitoring/prometheus/`, `/monitoring/grafana/`) apontando para `prometheus:9090` e `grafana:3000`.

---

## 4. docker-compose de desenvolvimento (`docker-compose.dev.yml`)

```yaml
services:
  prometheus:
    image: prom/prometheus:v2.53.0
    container_name: cemos2028_prometheus_dev
    command: ['--config.file=/etc/prometheus/prometheus.yml']
    volumes:
      - ./observability/prometheus/prometheus.dev.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    ports:
      - '9090:9090'
    depends_on:
      - backend
    networks:
      - app_network

  grafana:
    image: grafana/grafana:11.1.0
    container_name: cemos2028_grafana_dev
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=@cemos2028
    volumes:
      - grafana_data:/var/lib/grafana
      - ./observability/grafana/provisioning:/etc/grafana/provisioning
      - ./observability/grafana/dashboards:/var/lib/grafana/dashboards
    ports:
      - '3000:3000'
    depends_on:
      - prometheus
    networks:
      - app_network

volumes:
  static_volume:
  postgres_data:
  prometheus_data:
  grafana_data:
```

- Em desenvolvimento o acesso é direto por `http://localhost:9090` e `http://localhost:3000`, sem envolvimento do Nginx.

---

## 5. Grafana provisionado

### 5.1 Datasource (`observability/grafana/provisioning/datasources/prometheus.yml`)
```yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
```

### 5.2 Dashboards
- `observability/grafana/provisioning/dashboards/dashboards.yml` aponta para `/var/lib/grafana/dashboards`.
- Dashboard inicial `logins-pdf.json` possui dois painéis de timeseries prontos para monitorar logins e downloads.
- Exporte novos painéis e salve na mesma pasta para versionar.

---

## 6. Fluxo de validação completo

1. **Backend pronto**: verificação do endpoint `/metrics` conforme checklist.
2. **Subir Prometheus/Grafana**: `docker compose up -d prometheus grafana` (ou equivalente `.dev`).
3. **Prometheus**: acessar `http://localhost:9090`, aba *Status ▸ Targets*, conferir `UP` para `django-backend`.
4. **Gerar eventos reais**:
   - Realizar login válido e inválido ⇒ `increase(login_requests_total[5m])` deve refletir `status="success"` e `status="error"`.
   - Gerar PDF via Simulados ⇒ `increase(pdf_download_total[5m])` com label `origem` adequado.
5. **Grafana**: `http://localhost:3000`, autenticar com `admin/@cemos2028`, verificar se o dashboard “Logins e Downloads de PDF” mostra dados.
6. **Alerting (opcional)**: adicione `alerts.yml` ao Prometheus e configure contact points no Grafana conforme necessidade.

---

## 7. Segurança e compatibilidade
- Novos serviços usam o mesmo `app_network`, não exigindo mudanças em `backend`, `db`, `dash` ou `nginx`.
- Volumes `prometheus_data` e `grafana_data` isolam persistência de métricas/dashboards; mantenha backups se dashboards forem editados em produção.
- Controle de acesso ao Grafana: use a senha padrão apenas como bootstrap; troque via `grafana-cli admin reset-admin-password <nova_senha>` e atualize `docker-compose*` se quiser manter consistência.
- Monitoramento de infraestrutura adicional (PostgreSQL, Nginx, host) pode ser incorporado adicionando exporters e novos `scrape_configs` no mesmo arquivo.

Seguindo estes passos o ambiente terá visibilidade confiável dos logins e downloads, com infraestrutura de observabilidade alinhada ao código atual.
