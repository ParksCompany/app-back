# Emissões Back-end

URL base: `app-back-production-352e.up.railway.app` 

Rotas:

`Countries` Ver/Criar/Editar/Deletar novos países

`Regions` Ver/Criar/Editar/Deletar novas regiões

`Cities` Ver/Criar/Editar/Deletar novas cidades

`Users` Ver/Criar/Editar/Deletar novos usuários

`Emissions` Ver/Criar/Editar/Deletar novas emissões de voos

`Favorites` Ver/Criar/Deletar novas cidades favoritas para um usuário

`Sessions` Criar uma nova sessão para um usuário

Tokens:

Usuário: Token gerado no momento em que uma sessão `Sessions` foi criada

Administrador: Receber de um membro da equipe Parks (por questão de segurança)

---

## 🌍 Rota: Countries

### 🔐 Autenticação

- A autenticação é feita adicionando aos headers um “authorization” com o token
- Existem 2 tipos de autenticação: de usuário e de administrador
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- Rotas `POST`, `PUT` e `DELETE` exigem **autenticação de administrador**.
- Rota `GET` não exige **autenticação**.

---

### 📘 GET `/countries`

- **Descrição:** Retorna a lista de todos os países cadastrados.
- **Método:** `GET`
- **headers:** token chamado “authorization” de um usuário autenticado (opcional)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros:** Nenhum
- **Resposta:**
    
    ```json
    {
    	"length": 2,
    	"data": [
    	  {
    	    "id": 1,
    	    "name": "Brasil"
    	  },
    	  {
    	    "id": 2,
    	    "name": "Estados Unidos"
    	  }
    	]
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sucesso na listagem
    - `500 Internal Server Error` – Erro no servidor

---

### 📗 POST `/countries`

- **Descrição:** Cria um novo país no sistema.
- **Método:** `POST`
- **Autenticação:**  É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Body:**
    
    ```json
    {
      "id": 99,  // opcional
      "name": "Argentina"
    }
    ```
    
- **Validações:**
    - `id` (se fornecido) deve ser um número inteiro, se não o sistema fornecerá
    - `name` é obrigatório
- **Resposta:**
    
    ```json
    {
      "id": 99,
      "name": "Argentina"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sucesso na criação
    - `500 Internal Server Error` – Erro no servidor ou na validação

---

### 📙 PUT `/countries/:id`

- **Descrição:** Atualiza o nome de um país pelo ID.
- **Método:** `PUT`
- **Autenticação:**  É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros de rota:**
    - `id` (obrigatório): ID do país a ser atualizado
- **Body:**
    
    ```json
    {
      "name": "Chile"
    }
    ```
    
- **Validações:**
    - `id` deve ser um número inteiro
    - `name` é obrigatório
- **Resposta:**
    
    ```json
    {
      "id": 99,
      "name": "Chile"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sucesso na atualização
    - `500 Internal Server Error` – Erro no servidor ou na validação

---

### 📕 DELETE `/countries/:id`

- **Descrição:** Remove um país do sistema.
- **Método:** `DELETE`
- **Autenticação:**  É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros de rota:**
    - `id` (obrigatório): ID do país a ser removido
- **Validações:**
    - `id` deve ser um número inteiro
- **Resposta:**
    
    ```json
    {
      "id": 99,
      "name": "Chile"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sucesso na exclusão
    - `500 Internal Server Error` – Erro no servidor ou validação

---

## 🗺️ Rota: Regions

### 🔐 Autenticação

- A autenticação é feita adicionando aos headers um “authorization” com o token
- Existem 2 tipos de autenticação: de usuário e de administrador
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- Rotas `POST`, `PUT` e `DELETE` exigem **autenticação de administrador**.
- Rota `GET` não exige **autenticação**.

---

### 📘 GET `/regions`

- **Descrição:** Retorna a lista de todas as regiões cadastradas.
- **Método:** `GET`
- **Autenticação:** Usuário autenticado ou não
- **headers:** token chamado “authorization” de um usuário autenticado (opcional)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros:** Nenhum
- **Resposta:**
    
    ```json
    {
    	"length": 1,
    	"data": [
    		{
    			"id": 1,
    			"id_country": 1,
    			"name": "Sudeste"
    		}
    	]
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sucesso na listagem
    - `500 Internal Server Error` – Erro interno

---

### 📗 POST `/regions`

- **Descrição:** Cria uma nova região vinculada a um país.
- **Método:** `POST`
- **Autenticação:**  É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Body:**
    
    ```json
    {
      "id": 10,               // opcional
      "id_country": 1,        // obrigatório
      "name": "Centro-Oeste"  // obrigatório
    }
    ```
    
- **Validações:**
    - `id` se fornecido deve ser um número inteiro, se não o sistema fornecerá
    - `id_country` é o ID do país a ser vinculado, é obrigatório e deve ser um número inteiro
    - `name` é o nome da região, é obrigatório
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"country": "Brasil",
    	"name": "Sul"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Região criada com sucesso
    - `500 Internal Server Error` – Erro de validação ou interno

---

### 📙 PUT `/regions/:id`

- **Descrição:** Atualiza o nome de uma região pelo seu ID.
- **Método:** `PUT`
- **Autenticação:** É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros de rota:**
    - `id`: ID da região a ser atualizada
- **Body:**
    
    ```json
    {
      "name": "Noroeste"
    }
    ```
    
- **Validações:**
    - `id` Id da região, deve ser um número inteiro
    - `name` Novo nome da região
- **Resposta:**
    
    ```json
    {
    	"id_regions": 1,
    	"id_countries": 1,
    	"name": "Nordeste"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sucesso na atualização
    - `500 Internal Server Error` – Erro interno ou validação

---

### 📕 DELETE `/regions/:id`

- **Descrição:** Remove uma região com base no ID.
- **Método:** `DELETE`
- **Autenticação:** É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros de rota:**
    - `id`: ID da região a ser removida
- **Validações:**
    - `id` deve ser um número inteiro
- **Resposta:**
    
    ```json
    {
    	"id_regions": 1,
    	"id_countries": 1,
    	"name": "Nordeste"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Região removida com sucesso
    - `500 Internal Server Error` – Erro interno ou validação

---

## 🏙️ Rota: Cities

### 🔐 Autenticação

- A autenticação é feita adicionando aos headers um “authorization” com o token
- Existem 2 tipos de autenticação: de usuário e de administrador
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- Rotas `POST`, `PUT` e `DELETE` exigem **autenticação de administrador**.
- Rota `GET` não exige **autenticação**.

---

### 📘 GET `/cities`

- **Descrição:** Retorna a lista de todas as cidades cadastradas.
- **Método:** `GET`
- **Autenticação:** Usuário autenticado ou não
- **headers:** token chamado “authorization” de um usuário autenticado (opcional)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros:** Nenhum
- **Resposta:**
    
    ```json
    {
    	"length": 1,
    	"data": [
    		{
    			"id": 10,
    			"city": "Cidade teste",
    			"country": "Brasil",
    			"region": "Sudeste"
    		}
    	]
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Lista retornada com sucesso
    - `500 Internal Server Error` – Erro interno do servidor

---

### 📗 POST `/cities`

- **Descrição:** Cria uma nova cidade.
- **Método:** `POST`
- **Autenticação:**  É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Body:**
    
    ```json
    {
      "id": 1,              // opcional
      "name": "Campinas",   // obrigatório
      "id_country": 1,      // obrigatório
      "id_region": 1        // opcional
    }
    ```
    
- **Validações:**
    - `id` Id da cidade. Se fornecido deve ser um número inteiro, se não o sistema fornecerá
    - `id_country` Id do país. É obrigatório e deve ser um número inteiro
    - `id_region` Id da região. Não é obrigatório (opcional)
    - `name` Nome da cidade
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"country": "Brasil",
    	"name": "Campinas",
    	"region": "Sudeste"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Cidade criada com sucesso
    - `500 Internal Server Error` – Erro interno ou falha na validação

---

### 📙 PUT `/cities/:id`

- **Descrição:** Atualiza o nome de uma cidade pelo ID.
- **Método:** `PUT`
- **Autenticação:** É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros de rota:**
    - `id`: ID da cidade a ser atualizada
- **Body:**
    
    ```json
    {
    	"name": "Campinas"
    }
    ```
    
- **Validações:**
    - `id` ID da cidade.
    - `name` Novo nome da cidade
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "Campinas"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Cidade atualizada com sucesso
    - `500 Internal Server Error` – Erro interno ou validação

---

### 📕 DELETE `/cities/:id`

- **Descrição:** Remove uma cidade pelo seu ID.
- **Método:** `DELETE`
- **Autenticação:** É necessário o token do administrador
- **headers: “**authorization” com o token do administrador (obrigatório)
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- **Parâmetros de rota:**
    - `id`: ID da cidade a ser excluída
- **Validações:**
    - `id` deve ser um número inteiro
- **Resposta:**
    
    ```json
    {
    	"id": 10,
    	"name": "Campinas"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Cidade removida com sucesso
    - `500 Internal Server Error` – Erro interno ou validação

---

## 👤 Rota: Users

### 🔐 Autenticação

- **Token JWT obrigatório** em todas as rotas.
- A autenticação é feita adicionando aos headers um “authorization” com o token
- Existem 2 tipos de autenticação: de usuário e de administrador
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- Apenas a rota `GET /:id` pode ser acessada por usuários autenticados.
- As demais (`GET /`, `POST`, `PUT`, `DELETE`) exigem **autenticação de administrador**.

---

### 📘 GET `/users/:id`

- **Descrição:** Retorna os dados de um usuário específico pelo ID.
- **Método:** `GET`
- **Autenticação:** Usuário autenticado
- **Parâmetros de rota:**
    - `id`: ID do usuário
- **Validações:**
    - `id` deve ser um número inteiro
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "Nome",
    	"email": "nome@gmail.com",
    	"created_at": "2025-04-02 19:18"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Dados retornados com sucesso
    - `500 Internal Server Error` – Erro interno

---

### 📗 GET `/users`

- **Descrição:** Retorna a lista de todos os usuários.
- **Método:** `GET`
- **Autenticação:** Apenas administradores
- **Parâmetros:** Nenhum
- **Resposta:**
    
    ```json
    {
    	"length": 1,
    	"data": [
    		{
    			"id": 1,
    			"name": "Nome",
    			"email": "nome@gmail.com",
    			"created_at": "2025-04-13 10:05"
    		}
    	]
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Lista retornada com sucesso
    - `500 Internal Server Error` – Erro interno

---

### 📙 POST `/users`

- **Descrição:** Cria um novo usuário.
- **Método:** `POST`
- **Autenticação:** Apenas administradores
- **Body:**
    
    ```json
    {
    	"name": "Nome",
    	"email": "nome@gmail.com"
    }
    ```
    
- **Validações:**
    - `name` nome do usuário
    - `email` e-mail
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "Nome",
    	"email": "nome@gmail.com",
    	"created_at": "2025-04-02 19:18"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Usuário criado com sucesso
    - `500 Internal Server Error` – Erro interno ou validação

---

### 📒 PUT `/users/:id`

- **Descrição:** Atualiza o nome de um usuário pelo ID.
- **Método:** `PUT`
- **Autenticação:** Apenas administradores
- **Parâmetros de rota:**
    - `id`: ID do usuário
- **Body:**
    
    ```json
    {
      "name": "Maria S. Silva"
    }
    ```
    
- **Validações:**
    - `id` Id do usuário
    - `name` Novo nome do usuário
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "Nome",
    	"email": "nome@gmail.com",
    	"created_at": "2025-04-02 19:18"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Atualização feita com sucesso
    - `500 Internal Server Error` – Erro interno ou validação

---

### 📕 DELETE `/users/:id`

- **Descrição:** Remove um usuário do sistema.
- **Método:** `DELETE`
- **Autenticação:** Apenas administradores
- **Parâmetros de rota:**
    - `id`: ID do usuário
- **Validações:**
    - `id` deve ser um número inteiro
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "Nome",
    	"email": "nome@gmail.com",
    	"created_at": "2025-04-02 19:18"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Usuário removido com sucesso
    - `500 Internal Server Error` – Erro interno ou validação

---

## ⭐ Rota: Favorites

### 🔐 Autenticação

- **Token JWT obrigatório** para todas as rotas.
- O usuário só pode acessar, criar ou excluir **os próprios favoritos**
- Existem 2 tipos de autenticação: de usuário e de administrador
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- Rotas  `GET` ,`POST`, `PUT` e `DELETE` exigem **autenticação de administrador ou de usuário**.

---

### 📘 GET `/favorites/:id`

- **Descrição:** Retorna a lista de cidades favoritas de um usuário.
- **Método:** `GET`
- **Autenticação:** Usuário autenticado e dono da requisição
- **Parâmetros de rota:**
    - `id`: ID do usuário solicitante
- **Validações:**
    - `id` deve ser um número inteiro
    - Usuário só pode acessar os próprios favoritos
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "Parks",
    	"favorites": [
    		{
    			"id": 1,
    			"name": "Cidade teste",
    			"country": "Brasil"
    		}
    	]
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Lista de favoritos retornada com sucesso
    - `500 Internal Server Error` – Erro interno ou violação de regras de acesso

---

### 📗 POST `/favorites`

- **Descrição:** Adiciona uma cidade aos favoritos de um usuário.
- **Método:** `POST`
- **Autenticação:** Usuário autenticado e dono da ação
- **Body:**
    
    ```json
    {
      "userId": 5,
      "cityId": 2
    }
    ```
    
- **Validações:**
    - `userId` é o Id do usuário
    - `cityId` é o Id da cidade que será favoritada
    - Usuário só pode adicionar favoritos em seu próprio nome
    - Administrador pode adicionar favoritos a um usuário
- **Resposta:**
    
    ```json
    {
    	"user": "usuário",
    	"city": "Cidade teste",
    	"message": "Associação criada com sucesso."
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Cidade adicionada com sucesso
    - `500 Internal Server Error` – Erro interno ou violação de permissão

---

### 📕 DELETE `/favorites?userId=userId&cityId=cityId`

- **Descrição:** Remove uma cidade da lista de favoritos do usuário.
- **Método:** `DELETE`
- **Autenticação:** Usuário autenticado e dono da ação
- **Query params:**
    - `userId`: ID do usuário
    - `cityId`: ID da cidade
- **Validações:**
    - Ambos devem ser inteiros
    - Usuário só pode deletar seus próprios favoritos
    - Administrador pode deletar favoritos de um usuário
- **Resposta:**
    
    ```json
    {
    	"message": "Associação deletada com sucesso."
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Favorito removido com sucesso
    - `500 Internal Server Error` – Erro interno ou permissão inválida

---

## ✈️ Rota: Emissions

### 🔐 Autenticação

- A autenticação é feita adicionando aos headers um “authorization” com o token
- Existem 2 tipos de autenticação: de usuário e de administrador
    
    ```jsx
    {
    	"authorization": "token"
    }
    ```
    
- Rotas  `POST`, `PUT` e `DELETE` exigem **autenticação de administrador**.
- Rota  `GET` **não exige autenticação**. pode ter autenticação de administrador ou de usuário.

---

### 📘 GET `/emissions`

- **Descrição:** Retorna uma lista de emissões disponíveis com base em filtros aplicados.
- **Método:** `GET`
- **Autenticação:** Sem autenticação
- **Query params (opcionais):**
    - `premium`: booleano (true ou false) que indica se deve buscar apenas emissões premium
    - `departureCitiesId`: Ids das cidades de origem
    - `destinyCitiesId`: Ids das cidades de destino
    - `airlineName` nome da companhia aérea
    - `airlineProgram` programa da companhia aérea
    - Exemplo das query params:
        
        ```json
        /emissions?premium=true                     (opcional)
        /emissions?departureCitiesId=1,2,3          (opcional)
        /emissions?destinyCitiesId=2,5,8            (opcional)
        /emissions?airlineName=Azul,Gol             (opcional)
        /emissions?airlineProgram=Tudo Azul,Smiles  (opcional)
        
        Podem juntar mais de uma se necessário:
        /emissions?premium=true&departureCitiesId=1,2,3 
        ```
        
- **Validações:**
    - Caso o usuário tenha o papel `notAuthenticated`, apenas emissões não premium são retornadas
- **Resposta:**
    
    ```json
    {
      "length": 1,
      "data": [
        {
    			"id": 1,
    			"premiumEmission": true,
    			"departureDates": ["2025-05-10 09:00", "2025-05-12 13:00"],
    			"returnDates": ["2025-05-22 19:00", "2025-05-25 22:00"],
    			"airlineName": "Azul",
    			"airlineProgram": "Tudo azul",
    			"departureMilesPrice": 5000,
    			"departureMoneyPrice": 1200.5,
    			"returnMilesPrice": 10000,
    			"returnMoneyPrice": 1350.75,
    			"totalMilesPrice": 15000,
    			"totalMoneyPrice": 2551.25,
    			"moneyUrl": "https://example.com/money",
    			"milesUrl": "https://example.com/miles",
    			"cityImageUrl": "https://example.com/image.jpg",
    			"created_at": "2025-07-08 01:20",
    			"departureCity": "Cidade teste",
    			"destinyCity": "Cidade teste 3"
    		}
      ]
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Lista de emissões retornada com sucesso
    - `500 Internal Server Error` – Erro interno no servidor

---

### 📗 POST `/emissions`

- **Descrição:** Cria uma nova emissão de milhas.
- **Método:** `POST`
- **Autenticação:** Apenas administradores
- **Body:**
    - `premiumEmission`  Indica se é uma emissão premium ou não
    - `departureDates`  lista com as datas de partida ( formato YYYY-MM-DD HH:mm)
    - `returnDates`  lista com as datas de retorno( formato YYYY-MM-DD HH:mm)
    - `departureCityId` Id da cidade de partida
    - `destinyCityId` Id da cidade de destino
    - `airlineName` Nome da companhia aérea
    - `airlineProgram` Programa de milhas da cia aérea
    - `departureMilesPrice` Preço em milhas do voo de partida
    - `departureMoneyPrice` Preço em dinheirodo voo de partida
    - `returnMilesPrice` Preço em milhas do voo de retorno
    - `returnMoneyPrice` Preço em dinheiro do voo de retorno
    - `totalMilesPrice` Preço em milhas do total
    - `totalMoneyPrice` Preço em dinheiro do total
    - `moneyUrl` Link para compra em dinheiro
    - `milesUrl` Link para compra em milhas
    - `cityImageUrl` Link para imagem da cidade de destino
    
    ```json
    {
      "premiumEmission": true,
      "departureDates": ["2025-05-10 09:00", "2025-05-12 13:00"],
      "returnDates": ["2025-05-10 09:00", "2025-05-12 13:00"],
      "departureCityId": 1,
      "destinyCityId": 2,
      "airlineName": "Companhia Exemplo",
      "airlineProgram": "Programa Exemplo",
      "departureMilesPrice": 20000,
      "departureMoneyPrice": 500,
      "returnMilesPrice": 20000,
      "returnMoneyPrice": 500,
      "totalMilesPrice": 40000,
      "totalMoneyPrice": 1000,
      "moneyUrl": "https://exemplo.com/money",
      "milesUrl": "https://exemplo.com/miles",
      "cityImageUrl": "https://exemplo.com/imagem"
    }
    ```
    
- **Validações:**
    - Todos os campos são obrigatórios
    - Apenas administradores podem criar emissões
- **Resposta:**
    
    ```json
    {
    		"id": 1,
    		"premiumEmission": true,
    		"departureDates": ["2025-05-10 09:00", "2025-05-12 13:00"],
    		"returnDates": ["2025-05-22 19:00", "2025-05-25 22:00"],
    		"airlineName": "Azul",
    		"airlineProgram": "Tudo azul",
    		"departureMilesPrice": 5000,
    		"departureMoneyPrice": 1200.5,
    		"returnMilesPrice": 10000,
    		"returnMoneyPrice": 1350.75,
    		"totalMilesPrice": 15000,
    		"totalMoneyPrice": 2551.25,
    		"moneyUrl": "https://example.com/money",
    		"milesUrl": "https://example.com/miles",
    		"cityImageUrl": "https://example.com/image.jpg",
    		"created_at": "2025-07-08 01:20",
    		"departureCity": "Cidade teste",
    		"destinyCity": "Cidade teste 3"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Emissão criada com sucesso
    - `500 Internal Server Error` – Erro interno no servidor

---

### 📙 PUT `/emissions/:id`

- **Descrição:** Atualiza uma emissão de milhas existente.
- **Método:** `PUT`
- **Autenticação:** Apenas administradores
- **Parâmetros de rota:**
    - `id`: ID da emissão a ser atualizada
- **Body:**
    - Lista com todos os atributos que devem ser atualizados.
    - Possíveis atributos que podem ser atualizados:
        - `premiumEmission`  Indica se é uma emissão premium ou não
        - `departureDates`  lista com as datas de partida ( formato YYYY-MM-DD HH:mm)
        - `returnDates`  lista com as datas de retorno( formato YYYY-MM-DD HH:mm)
        - `departureCityId` Id da cidade de partida
        - `destinyCityId` Id da cidade de destino
        - `airlineName` Nome da companhia aérea
        - `airlineProgram` Programa de milhas da cia aérea
        - `departureMilesPrice` Preço em milhas do voo de partida
        - `departureMoneyPrice` Preço em dinheirodo voo de partida
        - `returnMilesPrice` Preço em milhas do voo de retorno
        - `returnMoneyPrice` Preço em dinheiro do voo de retorno
        - `totalMilesPrice` Preço em milhas do total
        - `totalMoneyPrice` Preço em dinheiro do total
        - `moneyUrl` Link para compra em dinheiro
        - `milesUrl` Link para compra em milhas
        - `cityImageUrl` Link para imagem da cidade de destino
    
    ```json
    {
      "returnMilesPrice": 50
    }
    ```
    
- **Validações:**
    - O `id` deve ser válido
    - Apenas administradores podem atualizar
- **Resposta:**
    - Objeto com o id da emissão e todos os atributos que foram atualizados
    
    ```json
    {
    	"id": "9",
    	"returnMilesPrice": 50
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Emissão atualizada com sucesso
    - `500 Internal Server Error` – Erro interno no servidor

---

### 📕 DELETE `/emissions/:id`

- **Descrição:** Deleta uma emissão de milhas.
- **Método:** `DELETE`
- **Autenticação:** Apenas administradores
- **Parâmetros de rota:**
    - `id`: ID da emissão a ser deletada
- **Validações:**
    - O `id` deve ser válido
    - Apenas administradores podem deletar
- **Resposta:**
    
    ```json
    {
    		"id": 1,
    		"premiumEmission": true,
    		"departureDates": ["2025-05-10 09:00", "2025-05-12 13:00"],
    		"returnDates": ["2025-05-22 19:00", "2025-05-25 22:00"],
    		"airlineName": "Azul",
    		"airlineProgram": "Tudo azul",
    		"departureMilesPrice": 5000,
    		"departureMoneyPrice": 1200.5,
    		"returnMilesPrice": 10000,
    		"returnMoneyPrice": 1350.75,
    		"totalMilesPrice": 15000,
    		"totalMoneyPrice": 2551.25,
    		"moneyUrl": "https://example.com/money",
    		"milesUrl": "https://example.com/miles",
    		"cityImageUrl": "https://example.com/image.jpg",
    		"created_at": "2025-07-08 01:20",
    		"departureCity": "Cidade teste",
    		"destinyCity": "Cidade teste 3"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Emissão deletada com sucesso
    - `500 Internal Server Error` – Erro interno no servidor

---

## 🛂 Rota: Sessions

---

### 📗 POST `/sessions`

- **Descrição:** Inicia uma nova sessão para um usuário com base no e-mail informado.
- **Método:** `POST`
- **Autenticação:** 🔓 Não requer autenticação (rota pública de login)
- **Body:**
    
    ```json
    {
      "email": "usuario@exemplo.com"
    }
    ```
    
- **Validações:**
    - `email` deve estar presente e válido
- **Resposta:**
    
    ```json
    {
    	"id": 1,
    	"name": "usuario",
    	"email": "usuario@exemplo.com",
    	"created_at": "2025-07-03 14:33",
    	"token": "token do usuário"
    }
    ```
    
- **Códigos de status:**
    - `200 OK` – Sessão iniciada com sucesso
    - `400 Bad Request` – Erro de validação ou falha na criação da sessão

---
