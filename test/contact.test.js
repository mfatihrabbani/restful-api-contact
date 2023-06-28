import supertest from "supertest"
import { createTestUser, removeAllTestContacts, removeTestUser } from "./test-util.js"
import { web } from "../src/application/web.js"

describe("POST /api/contacts", () => {
    beforeEach( async () => {
        await createTestUser()
    }) 

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it("should can create contact", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "test",
                last_name: "test",
                email : "test@test.com",
                phone : "0101010110",
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("test")
        expect(result.body.data.last_name).toBe("test")
        expect(result.body.data.email).toBe("test@test.com")
        expect(result.body.data.phone).toBe("0101010110")
        
    })

    it("should reject if request is invalid", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "test",
                email : "test",
                phone : "0101010111111111110000001010101010",
            })

        console.error(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})