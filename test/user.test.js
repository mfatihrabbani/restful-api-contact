import supertest from "supertest"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js"
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js"
import bcrypt from "bcrypt"

describe("POST /api/users", () => {

    afterEach(async () => {
        await removeTestUser()
    })
    
    it("should can regiter new user", async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()
    })

    it("should reject if request invalid", async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: ""
            })

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it("should reject if double register", async () => {
        let result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
        .post("/api/users")
        .send({
            username: "test",
            password: "test",
            name: "test"
        })

        logger.info(result.body)
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it("should can login", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            })
        
        logger.error(result.error)

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe()
    })

    it("should reject invalid request", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "",
                password: ""
            })
        
        logger.error(result.error)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it("should reject if password wrong", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "salah"
            })
        
        logger.error(result.error)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it("should reject if username is wrong", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "salah",
                password: "salah"
            })
        
        logger.error(result.error)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it("should can get current user", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set('Authorization', 'test')
        

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
    })

    it("should reject if token is invalid", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set('Authorization', 'invalid')
        

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it("should can update user data", async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                name: "new test",
                password: "new password"
            })
        logger.error(result)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("new test")
        

        const user = await getTestUser()
        expect(await bcrypt.compare("new password", user.password)).toBe(true)
    })

    it("should can update name user", async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                name: "new test"
            })
        logger.error(result)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("new test")
    })
})