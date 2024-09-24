
## Hackathon SOAT - Camila e Melina

### Cria um paciente

```http
  POST /api/paciente
```

|  Body  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Paciente |
| `cpf` | `string` | **Obrigatório**. CPF do paciente |
| `email` | `string` | **Obrigatório**. Email do paciente|
| `senha` | `string` | **Obrigatório**. Senha do paciente |



### Cria um Médico

```http
  POST /api/medico
```

|  Body  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Médico |
| `cpf` | `string` | **Obrigatório**. CPF do Médico |
| `crm` | `string` | **Obrigatório**. CPF do Médico |
| `email` | `string` | **Obrigatório**. Email do Médico|
| `senha` | `string` | **Obrigatório**. Senha do Médico |



### LOGIN

#### Faz login de um médico ou um paciente e retorna seu token, dentro do token tem seu perfil de acesso.

```http
  POST /login
```

|  Body Request  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Nome do Paciente |
| `senha` | `string` | **Obrigatório**. CPF do paciente |

|  Payload Response  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | Contém o token do usuário com as informações de perfil (Médico ou Paciente) |


### Busca todos os médicos - Apenas pacientes podem executar essa busca.

```http
  GET /api/medicos
```

|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Obrigatório**. token retornado do login |

|  Payload Response - Lista de médicos  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Paciente |
| `cpf` | `string` | **Obrigatório**. CPF do paciente |
| `crm` | `string` | **Obrigatório**. CPF do Médico |
| `email` | `string` | **Obrigatório**. Email do Médico|
| `usuarioId` | `string` | **Obrigatório**. ID de usuário do Médico |