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
import { matchesAllMock, matchesInProgressMock, matchesNoProgressMock } from './mocks/matchesMock';
import MatchesModel from '../models/MatchesModel';
import jwtUtil from '../utils/Token';
import { userReturnVerify } from './mocks/usersMock';


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

    it('Erro quando não retornar um array da consulta ao banco de dados', async () => {
        sinon.stub(SequelizeMatch, 'findAll').resolves(null as any);

        const response = await chai
        .request(app)
        .get('/matches');

        expect(response.body).to.have.property('message');
        expect(response).to.have.status(500);
    })

    it('Retornando uma lista de partidas em andamento com sucesso', async () => {
        sinon.stub(MatchesModel.prototype, 'findAllProgress').resolves({ dataValues: matchesInProgressMock } as any);

        const response = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'true' });

        expect(response.body).to.deep.equal({ dataValues: matchesInProgressMock });
        expect(response.body).to.be.an('object');
        expect(response).to.have.status(200);
    })

    it('Retornando uma lista de partidas finalizadas com sucesso', async () => {
        sinon.stub(MatchesModel.prototype, 'findAllProgress').resolves({ dataValues: matchesNoProgressMock } as any);

        const response = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'false' });

        expect(response.body).to.deep.equal({ dataValues: matchesNoProgressMock });
        expect(response.body).to.be.an('object');
        expect(response).to.have.status(200);
    })

    it('Erro quando o inProgress não é fornecido', async () => {
        sinon.stub(SequelizeMatch, 'findAll').resolves({ dataValues: matchesAllMock } as any);

        const response = await chai
        .request(app)
        .get('/matches');

        expect(response.body).to.deep.equal({ dataValues: matchesAllMock });
        expect(response.body).to.be.an('object');
        expect(response).to.have.status(200);
    })

/*     it('Retornando a mensagem "Finished" ao finalizar uma partida em /matches/:id/finish', async () => {
        sinon.stub(jwtUtil, 'verify').returns(userReturnVerify);
        sinon.stub(MatchesModel.prototype, 'updateProgressId').resolves({ message: 'Finished' });

        const response = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Autorization', 'Bearer mocktoken');

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
    }) */
})