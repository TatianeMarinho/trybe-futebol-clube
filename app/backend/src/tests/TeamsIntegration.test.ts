import { DataTypes } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import { teamMockId, teamsMock } from './mocks/teamsMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endopoint /teams', () => {
    afterEach(() => sinon.restore());

  it('retornando um array de times e ids', async () => {
    const response = await chai.request(app).get('/teams');

    expect(response.body).to.deep.equal(teamsMock);
    expect(response.body).to.be.an('array');
    expect(response).to.be.status(200);
  });

  it('verificando endopoint /teams com mock', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves([{dataValues: teamsMock}] as any);

    const response = await chai.request(app).get('/teams');

    expect(response.body).to.be.an('array');
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal([{dataValues: teamsMock}]);

  })

  it('verificando endopoint /teams/:id com mock retorna um time especifico', async () => {
    const id = 1;
    sinon.stub(SequelizeTeam, 'findByPk').resolves([{ dataValues: teamMockId }] as any);

    const response = await chai.request(app).get(`/teams/${id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal([{ dataValues: teamMockId }]);

  })

  it('verificando endopoint /teams/:id com mock retorna um time especifico', async () => {
    const id = 35;
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const response = await chai.request(app).get(`/teams/${id}`);

    expect(response).to.have.status(404);
    expect(response.body).to.deep.equal({ message: 'team not found' });

  })
});
