import supertest from "supertest"
import { prismaClient } from "../src/application/database.js"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js"

describe("POST /api/users", () => {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
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