import { DataTypes } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import { teamMockId, teamsMock } from './mocks/teamsMock';
import SequelizeUser from '../database/models/SequelizeUser';
import { messageErrorLogin, messageInvalidLogin, userMock } from './mocks/usersMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endopoint /login', () => {
    afterEach(() => sinon.restore());

    it('Realizando Login com sucesso', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves({ dataValues: userMock } as any);

        const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
            password: 'secret_admin',
          });

        expect(response.body).to.have.property('token');
        expect(response).to.have.status(200);
    })

    it('Erro ao realizar login sem email', async () =>{
        sinon.stub(SequelizeUser, 'findOne').resolves({ dataValues: userMock } as any);

        const response = await chai
        .request(app)
        .post('/login')
        .send({
            password: 'secret_admin',
        });

        expect(response.body).to.deep.equal(messageErrorLogin);
        expect(response).to.have.status(400);
    })

    it('Erro ao realizar login sem senha', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves({ dataValues: userMock } as any);

        const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
        });

        expect(response.body).to.deep.equal(messageErrorLogin);
        expect(response).to.have.status(400);
    })

    it('Erro ao realizar login com credenciais invalidas', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(null);

        const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'invalid@admin.com',
            password: 'invalid_admin',
        });

        expect(response.body).to.deep.equal(messageInvalidLogin);
        expect(response).to.have.status(401);
    })
})