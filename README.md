
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
| `nome` | `string` | **Obrigatório**. Nome do Paciente |
| `cpf` | `string` | **Obrigatório**. CPF do paciente |
| `crm` | `string` | **Obrigatório**. CPF do paciente |
| `email` | `string` | **Obrigatório**. Email do paciente|
| `senha` | `string` | **Obrigatório**. Senha do paciente |



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

