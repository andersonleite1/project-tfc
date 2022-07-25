import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import {before, after} from 'mocha';

import userMock from './mocks/userMock';
import userModelMock from './mocks/userMock';
import { 
  validToken, 
  invalidToken 
} from './mocks/tokenMock'
import { 
  requestUserValid,
  requestEmptyEmail,
  requestIncorrectEmail,
  requestEmptyPassword,
  requestSmallPassword,
  requestIncorrectPassword,
} from './mocks/requestsMock';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  describe('Testa se eh possivel fazer login com usuario valido', () => {
    before(async () => {
      sinon
      .stub(UserModel, "findOne")
      .resolves(userModelMock as UserModel);

      sinon
      .stub(bcryptjs, "compare")
      .resolves(true);
    });

    after(async () => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('Deve retornar o "token" do usuario ao entrar com "email" e "password" validos com status code "200"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(requestUserValid);

      const { token } = chaiHttpResponse.body;

      expect(chaiHttpResponse.body).to.have.property('token');
      expect(token).to.be.contains("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Testa que nao pode ser possivel fazer login com email do usuario invalido', () => {

    before(async () => {
      sinon
      .stub(UserModel, "findOne")
      .resolves(null);
    });

    after(async () => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Deve retornar a mensagem "All fields must be filled" com status code "400" quando o campo de email for em branco', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(requestEmptyEmail);

      const { body: { message }, status} = chaiHttpResponse;

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(message).to.be.equal("All fields must be filled");
      expect(status).to.be.equal(400);
    });

    it('Deve retornar a mensagem "Incorrect email or password" com status code "401" quando o email for invalido', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(requestIncorrectEmail);

      const { body: { message }, status} = chaiHttpResponse;

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(message).to.be.equal("Incorrect email or password");
      expect(status).to.be.equal(401);
    });
  })

  describe('Testa que nao pode ser possivel fazer login com password invalido', () => {

    before(async () => {
      sinon
      .stub(UserModel, "findOne")
      .resolves(userModelMock as UserModel);

      sinon
      .stub(bcryptjs, "compare")
      .resolves(true);
    });

    after(async () => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('Deve retornar a mensagem "All fields must be filled" com status code "400" quando o campo "password" for em branco', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(requestEmptyPassword);

      const { body: { message }, status} = chaiHttpResponse;

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(message).to.be.equal("All fields must be filled");
      expect(status).to.be.equal(400);
    });

    it('Deve retornar a mensagem "password length must be at least 6 characters long" com status code "422" quando o campo "password" for menor que 6 caracteres', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(requestSmallPassword);

      const { body: { message }, status} = chaiHttpResponse;

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(message).to.be.equal('"password" length must be at least 6 characters long');
      expect(status).to.be.equal(422);
    });

    it('Deve retornar a mensagem "Incorrect email or password" com status "401" quando a senha for invalido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(requestIncorrectPassword);

      const { body: { message }, status} = chaiHttpResponse;

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(message).to.be.equal("Incorrect email or password");
      expect(status).to.be.equal(401);
    });
  })

  describe('Testa se eh possivel receber o dados do usuario acesasando o endpoint "/login/validate"', () => {

    before(async () => {
      sinon
      .stub(UserModel, "findOne")
      .resolves(userMock as UserModel);
    });

    after(async () => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Deve retornar os dados válidos do usuário', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', validToken);

        const { body, status } = chaiHttpResponse;

        expect(body.role).to.be.equal('admin');
        expect(status).to.be.equal(200);
    });

    it('Deve retornar a mensagem "Invalid token" para token invalido', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', invalidToken);

      console.log("Status: ", chaiHttpResponse.status);
      const { body: { message }, status } = chaiHttpResponse;
      
      expect(message).to.be.equal('Invalid token');
      expect(status).to.be.equal(401);
    });
  });
});
