A seguir, o relatório solicitado.

---

## 1. Definição detalhada do assunto

### 1.1. Conceito de segurança na captação de dados

**Captação de dados** é o processo de **coletar, receber ou ingerir informações** provenientes de diversas fontes (sistemas transacionais, APIs, arquivos, dispositivos, formulários web, integrações em nuvem, etc.) para posterior tratamento, análise ou armazenamento.

**Segurança na captação de dados** consiste em aplicar **controles técnicos e organizacionais** para garantir que, desde o momento em que os dados começam a trafegar entre origem e destino, sejam preservados:

* **Confidencialidade** – dados não podem ser lidos por terceiros.
* **Integridade** – dados não podem ser alterados indevidamente durante a transmissão.
* **Autenticidade** – garantia de que a origem/destino é quem declara ser.
* **Não repúdio**, quando aplicável – evidência de quem gerou ou recebeu os dados.
* **Privacidade e conformidade legal**, em especial quanto a dados pessoais (LGPD).

Neste contexto, três pilares técnicos aparecem com frequência em provas:

1. **TLS (Transport Layer Security)** – segurança na transmissão (criptografia em trânsito).
2. **Autenticação** – confirmação da identidade de usuário/sistema que envia/recebe dados.
3. **Mascaramento de dados** – ocultação parcial/total de informações sensíveis, sobretudo em logs, telas, relatórios e ambientes de teste.

---

## 2. Subtópicos essenciais exigidos em provas

### 2.1. TLS e segurança no transporte

* **TLS (Transport Layer Security)**:

  * Protocolo criptográfico que oferece **confidencialidade, integridade e autenticação** na camada de transporte.
  * Base dos protocolos **HTTPS**, **FTPS**, **TLS em SMTP/IMAP/POP**, etc.

* Objetivos principais:

  * Evitar **escuta (sniffing)** de dados sensíveis.
  * Evitar **alteração (man-in-the-middle, injection)** durante o trânsito.
  * Garantir que o cliente está falando com o **servidor legítimo** (certificado digital).

* Conceitos importantes:

  * **SSL x TLS**: SSL é a versão antiga; em provas, espera-se que o candidato saiba que **TLS é o padrão atual**, e SSL está obsoleto.
  * **Versões seguras**: TLS 1.2 e 1.3 são consideradas as versões recomendadas; versões antigas (SSLv2, SSLv3, TLS 1.0, 1.1) são desaconselhadas.

* Em captação de dados:

  * APIs, serviços web e integrações devem utilizar **HTTPS/TLS**.
  * Conectores de dados (ETL, pipelines, agentes de coleta) devem se conectar aos sistemas de origem utilizando canais cifrados.

### 2.2. Autenticação na captação de dados

**Autenticação** é o processo de verificar a identidade de um usuário, aplicação ou dispositivo antes de permitir o envio/recebimento de dados.

* Métodos típicos em integrações e captação:

  * **Autenticação básica (HTTP Basic Auth)**:

    * Usuário/senha codificados em Base64 no cabeçalho.
    * Só deve ser usada com **TLS**, pois sem criptografia expõe credenciais.

  * **API Keys (chaves de API)**:

    * Chaves estáticas associadas a aplicações.
    * Simples, mas exigem boa gestão (rotação, revogação).

  * **Tokens (Bearer Tokens, JWT, OAuth2)**:

    * **OAuth2/OpenID Connect** para autenticação/autorização em APIs.
    * O cliente obtém token de um servidor de autorização e o apresenta ao consumir APIs.

  * **Autenticação mútua TLS (mTLS)**:

    * Tanto o servidor quanto o cliente possuem certificados digitais.
    * Garante identidade dos dois lados, muito usado em integrações entre sistemas governamentais e interorganizações.

* Conceitos de prova:

  * Diferença entre **autenticação** (quem é?) e **autorização** (o que pode fazer?).
  * Importância de **MFA (autenticação multifator)** em acessos interativos.
  * Princípio do **menor privilégio**: o conector deve ter acesso apenas ao necessário.

### 2.3. Mascaramento de dados

**Mascaramento** é a técnica de **ocultar total ou parcialmente dados sensíveis** em ambientes onde não é necessário exibir o valor verdadeiro.

* Exemplos:

  * Mostrar apenas os últimos 4 dígitos de cartão: `**** **** **** 1234`.
  * Esconder parte de CPF: `***.***.123-45`.
  * Mascarar campos de senha, tokens, segredos em logs.

* Tipos de mascaramento:

  * **Em exibição (runtime)**:

    * Ex.: telas, relatórios, dashboards, logs de aplicação; o dado verdadeiro continua armazenado, mas não é exibido na interface ou no log.
  * **Mascaramento estático para teste**:

    * Dados são irreversivelmente alterados em cópias usadas em ambiente de desenvolvimento/teste (próximo de anonimização/pseudonimização).

* Diferenças importantes:

  * **Mascaramento**: foco em ocultar na apresentação; pode ou não ser reversível.
  * **Criptografia**: foco em proteção em repouso/trânsito, reversível com chave.
  * **Anonimização** (LGPD): tratamento **irreversível**, não permitindo reidentificação do titular.

Na captação de dados, o mascaramento é crucial para evitar que **dados sensíveis captados** (e muitas vezes enviados a logs, monitoramento e ferramentas de coleta) fiquem expostos a perfis indevidos.

---

## 3. Aspectos normativos e de governança

### 3.1. LGPD e privacidade na captação de dados

A **LGPD** impõe princípios diretamente relacionados à captação segura de dados:

* **Necessidade e minimização**:

  * Captar apenas os dados estritamente necessários à finalidade.
* **Segurança**:

  * Uso de medidas técnicas e administrativas aptas a proteger os dados contra acessos não autorizados, situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão.
* **Prevenção**:

  * Adoção de medidas para prevenir a ocorrência de danos.
* **Exatidão/atualização**:

  * Captação confiável, sem adulterações, com meios de correção.

Na prática, para captação:

* Exigência de **TLS/HTTPS** ao coletar dados pessoais em formulários, apps, APIs.
* Evitar que dados pessoais apareçam em logs de erro, traces, dumps de debug.
* Políticas claras sobre **mascaramento/anonymização** em ambientes de desenvolvimento/teste.

### 3.2. Normas de segurança da informação

* **ISO/IEC 27001 e 27002**:

  * Tratam de controles como:

    * Criptografia (controles para proteção da confidencialidade e integridade de informações em trânsito e em repouso).
    * Controle de acesso (autenticação, autorização, gestão de credenciais e chaves).
    * Segurança em comunicações (VPN, TLS, redes confiáveis).
  * A captação de dados deve estar alinhada a:

    * Política de criptografia.
    * Política de uso de canais seguros (HTTPS, VPN, etc.).

* **ISO/IEC 27017 (serviços em nuvem)**:

  * Recomendações adicionais quando a captação ocorre entre sistemas on-premises e nuvem.

Para o Auditor de TI, interessa verificar:

* Se há **exigência formal** para uso de TLS em integrações.
* Se a autenticação entre sistemas está padronizada (certificados, tokens, API keys).
* Se há política/processo para **mascaramento de dados sensíveis**, especialmente em logs, trilhas de auditoria e ambientes de teste.

---

## 4. Exemplos práticos

### 4.1. Formulário web com e sem TLS

* **Cenário inseguro**:

  * Formulário de login ou cadastro em `http://...` (sem HTTPS).
  * Dados (usuário, senha, CPF) trafegam em texto claro.
  * Podem ser capturados por atacantes na mesma rede (sniffing).

* **Cenário seguro**:

  * Mesma funcionalidade em `https://...` utilizando TLS 1.2/1.3.
  * Dados trafegam cifrados; mesmo que capturados, não são legíveis.
  * Certificado digital verificado pelo navegador.

### 4.2. Captação de dados via API com autenticação e mascaramento

1. Sistema A chama API do Sistema B para enviar registros de cadastro.
2. Comunicação é feita via **HTTPS/TLS**.
3. Autenticação:

   * Sistema A obtém token OAuth2 de servidor de autenticação.
   * Inclui `Authorization: Bearer <token>` na requisição.
4. No lado do Sistema B:

   * Os dados recebidos são armazenados em banco.
   * Logs de requisição mostram apenas:

     * Identificador da transação.
     * Status (sucesso/erro).
     * Campos não sensíveis.
   * Dados sensíveis (ex.: CPF, e-mail) são **mascarados** ou omitidos dos logs.

### 4.3. Integração entre órgãos com mTLS

* Órgão X expõe serviço de captação de dados contábeis para o TCU.
* O serviço exige:

  * Conexão via **HTTPS com mútua autenticação (mTLS)**.
  * Servidor apresenta seu certificado; o cliente (sistema do órgão) também apresenta certificado emitido por AC oficial.
* O TCU só aceita conexões de clientes com certificados válidos e autorizados, aumentando a confiança na origem dos dados.

---

## 5. Erros comuns em provas

1. **Afirmar que HTTPS/TLS é necessário apenas para autenticação, não para os dados**

   * Falso. TLS protege **todo o canal**, incluindo credenciais e dados trafegados.

2. **Confundir autenticação com criptografia**

   * Autenticação verifica identidade; criptografia protege o conteúdo.
   * TLS pode oferecer ambos (autenticação do servidor e criptografia), mas são conceitos distintos.

3. **Supor que dados mascarados em tela estão automaticamente protegidos no banco**

   * Mascarar na tela não significa criptografar ou mascarar no armazenamento.
   * É comum prova explorar esse equívoco.

4. **Achar que logs podem conter qualquer dado coletado, por serem “internos”**

   * Logs podem vazar dados sensíveis (senhas, tokens, cartões).
   * LGPD e boas práticas exigem **restrição e mascaramento** em logs.

5. **Afirmar que uso de VPN dispensa o uso de TLS**

   * VPN aumenta segurança, mas não substitui totalmente TLS em cenários críticos.
   * Boas práticas recomendam **defesa em camadas** (VPN + TLS, quando adequado).

6. **Considerar que autenticação por API key enviada sem TLS é aceitável**

   * Sem TLS, API key pode ser capturada.
   * A prova pode considerar inadequado o uso de credenciais sensíveis sem canal cifrado.

---

## 6. Questões típicas (estilo CEBRASPE)

Julgue os itens a seguir como **Certo (C)** ou **Errado (E)**.

1. ( ) Em processos de captação de dados por meio de formulários web que coletam informações pessoais, a utilização de HTTPS, implementado com TLS em versão atualizada, é uma prática recomendável para garantir a confidencialidade e a integridade das informações em trânsito.

2. ( ) A autenticação mútua via TLS, em que tanto cliente quanto servidor apresentam certificados digitais válidos, é uma abordagem que fortalece a segurança na integração entre sistemas, pois permite que cada parte verifique a identidade da outra.

3. ( ) O mascaramento de dados, por ocultar parcialmente informações sensíveis em telas e relatórios, torna desnecessária a aplicação de mecanismos de criptografia em repouso para esses mesmos dados no banco de dados.

4. ( ) Em conformidade com a LGPD, é prática adequada registrar em logs de aplicação o conteúdo completo de campos sensíveis captados, como senhas e números de cartão de crédito, desde que o acesso a esses logs seja restrito aos administradores do sistema.

5. ( ) Na captação de dados por APIs, a utilização de tokens de acesso (por exemplo, baseados em OAuth2) combinada com canais cifrados por TLS contribui simultaneamente para autenticação/autorização e para a proteção contra interceptação e leitura indevida dos dados transmitidos.

**Gabarito comentado:**

1. **Certo.** HTTPS/TLS é prática fundamental para proteção de dados em trânsito.
2. **Certo.** Descreve corretamente **mTLS** e seu benefício.
3. **Errado.** Mascaramento em exibição não substitui proteção em repouso (criptografia, controles de acesso).
4. **Errado.** Registrar senhas e dados altamente sensíveis em logs é considerado má prática e afronta princípios de minimização e segurança da LGPD.
5. **Certo.** Combinação de tokens para autenticação/autorização com TLS para confidencialidade é boa prática em captação via APIs.

---

## 7. Resumo final altamente sintético para revisão

* **Segurança na captação de dados**: proteção desde o momento em que dados são coletados ou recebidos, garantindo **confidencialidade, integridade, autenticidade e privacidade**.
* **TLS/HTTPS**:

  * Criptografa o canal.
  * Garante integridade e autenticação do servidor (e, em mTLS, também do cliente).
  * Evita sniffing, MITM, manipulação em trânsito.
* **Autenticação**:

  * Verifica identidade de usuários/sistemas (Basic, API keys, tokens, OAuth2, mTLS).
  * Deve ser combinada com **autorização** e princípio do **menor privilégio**.
* **Mascaramento de dados**:

  * Oculta dados sensíveis em telas, relatórios e logs.
  * Não substitui criptografia em repouso nem outros controles de segurança.
* **Normativos**:

  * **LGPD**: minimização, segurança, prevenção, exatidão.
  * **ISO 27001/27002**: controles de criptografia, comunicação segura, controle de acesso.
* **Para o Auditor de TI (TCU)**:

  * Verificar se captação de dados (web, APIs, integrações, agentes de coleta) usa **TLS atualizado**, **mecanismos robustos de autenticação** e **mascaramento adequado** de dados sensíveis, alinhados às políticas de segurança e à LGPD.
