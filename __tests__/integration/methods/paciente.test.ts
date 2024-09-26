import { route, TestRouteOptions } from '../../common';


  it('[POST] Adicionar um paciente - 200', async () => {
    const params: TestRouteOptions = {
      method: 'POST',
      url: 'paciente',
      basePath: '',
      payload: {
        nome: 'Melina Garcia',
        email: 'paciente@email.com.br',
        cpf: '502.501.570-71',
        senha: '1234'
      }
    };
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
  });

  it('[POST] Adicionar um paciente com mesmo cpf - 400', async () => {
    const params: TestRouteOptions = {
      method: 'POST',
      url: 'paciente',
      basePath: '',
      payload: {
        nome: 'Melina Garcia',
        email: 'paciente@email.com.br',
        cpf: '502.501.570-71',
        senha: '1234'
      }
    };
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(400);
    expect(payload.error).toBe('Paciente já cadastrado com esse CPF.');
  });


  it('[GET] Buscar todos os pacientes - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'paciente/all',
      basePath: ''
    };
    
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload).toHaveLength(1);
  });

  it('[GET] Buscar paciente por ID - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'paciente/all',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `paciente/${response.payload[0].id}`,
      basePath: '',
      query: {
        id:response.payload.id
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
  });

  it('[GET] Buscar paciente por ID inexistente - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `paciente/c4e53126-5a73-4ed0-b428-76950ed35b8c`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(404);
    expect(payload.error).toBe('Not found');
  });

  it('[GET] Buscar paciente por CPF - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'paciente/all',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `paciente/cpf/${response.payload[0].cpf}`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
    expect(payload.cpf).toBe('502.501.570-71');
  });

  it('[GET] Buscar paciente por CPF inexistente - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `paciente/cpf/305.234.211-34`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(404);
    expect(payload.error).toBe('Not found');
  });

  it('[PUT] Atualizar paciente - 200', async () => {
    const paramsId: TestRouteOptions = {
      method: 'PUT',
      url: `paciente`,
      basePath: '',
      payload: {
        nome: 'Melina Carniel A',
        email: 'paciente@mail.com',
        cpf: '502.501.570-71'
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Carniel A');
    expect(payload.email).toBe('paciente@mail.com');
    expect(payload.cpf).toBe('502.501.570-71');
  });

  it('[DELETE] Deletar paciente por ID - 204', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'paciente/all',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'DELETE',
      url: `paciente/${response.payload[0].id}`,
      basePath: ''
    };
    const { statusCode } = await route(paramsId);
    expect(statusCode).toBe(204);

    const responseAfter = await route(params);
    expect(responseAfter.statusCode).toBe(200);
    expect(responseAfter.payload).toHaveLength(0);
  });