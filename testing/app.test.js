const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const app = require('../app'); // Adjust if app.js is your main file

chai.use(chaiHttp);
const { expect } = chai;

describe('User Authentication Tests', () => {
    // Before each test, reset or create a new users.csv file to avoid data carryover
    beforeEach(() => {
        fs.writeFileSync(path.join(__dirname, '../users.csv'), '');
    });

    describe('POST /register', () => {
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/register')
                .send({ name: 'TestUser', email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('message', 'Registration successful!');

                    // Check if the user was added to the users.csv file
                    const users = fs.readFileSync(path.join(__dirname, '../users.csv'), 'utf8');
                    expect(users).to.include('TestUser,test@example.com,password123');
                    done();
                });
        });
    });

    describe('POST /login', () => {
        beforeEach(() => {
            // Pre-register a user for login tests
            fs.appendFileSync(path.join(__dirname, '../users.csv'), 'TestUser,test@example.com,password123\n');
        });

        it('should login an existing user with correct credentials', (done) => {
            chai.request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('message', 'Login successful!');
                    done();
                });
        });

        it('should not login a user with incorrect credentials', (done) => {
            chai.request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', false);
                    expect(res.body).to.have.property('message', 'Invalid credentials');
                    done();
                });
        });
    });
});
