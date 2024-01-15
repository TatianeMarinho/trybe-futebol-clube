import { DataTypes } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import { NextFunction, Request } from 'express';
import SequelizeMatch from '../database/models/sequelizeMatch';
import { matchesAllMock } from './mocks/matchesMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endopoint /matches', () => {
    afterEach(() => sinon.restore());

    it('Retornando uma lista de partidas com sucesso', async () => {
        sinon.stub(SequelizeMatch, 'findAll').resolves({ dataValues: matchesAllMock } as any);

        const response = await chai
        .request(app)
        .get('/matches');

        expect(response.body).to.deep.equal({ dataValues: matchesAllMock });
        expect(response.body).to.be.an('object');
        expect(response).to.have.status(200);
    })

   it('Erro quando não retornar um array da consulta ao banco de dados', async () =>{
        sinon.stub(SequelizeMatch, 'findAll').resolves(null as any);

        const response = await chai
        .request(app)
        .get('/matches');

        expect(response.body).to.have.property('message');
        expect(response).to.have.status(500);
    })
})