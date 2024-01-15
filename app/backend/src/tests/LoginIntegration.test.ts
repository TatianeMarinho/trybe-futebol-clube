import { DataTypes } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/SequelizeUser';
import { messageErrorLogin, messageErrorValidateToken, messageInvalidLogin, userMock, userReturnVerify } from './mocks/usersMock';
import { NextFunction, Request } from 'express';
import validateLoginMiddleware from '../middlewares/validateLoginMiddleware';
import jwtUtil from '../utils/Token';


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
    
    it('Erro ao realizar login com email invalido', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(null);

        const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'invalid@admin',
            password: 'invalid_admin',
        });

        expect(response.body).to.deep.equal(messageInvalidLogin);
        expect(response).to.have.status(401);
    })

    it('Erro ao acessar o role do usuario em /login/role', async () => {

        const response = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', 'Bearer invalidtoken');

        expect(response.body).to.have.property('message');
        expect(response).to.have.status(401);
    })

    it('Erro quando o verify der erro', async () => {
        sinon.stub(SequelizeUser, 'findOne').returns(null as any)
        const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'invalid@admin',
            password: 'invalid_admin',
        });
        
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response).to.have.status(401);
    })

    it('Acessando /login/role com sucesso', async () => {
        sinon.stub(jwtUtil, 'verify').callsFake(() => (userReturnVerify));
        sinon.stub(SequelizeUser, 'findOne').resolves({ dataValues: userMock } as any);

        const response = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', 'Bearer dajoidjfaksjdfoajdsfaoidsjfoids');

        expect(response.body).to.be.an('object');
        expect(response.body).to.deep.equal({ role: 'admin'});
        expect(response).to.have.status(200);
    })
})