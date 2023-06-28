import contactService from "../service/contact-service.js"

const create = async (req, res, next) => {
    try{
        const user = req.user
        console.log(user)
        const result = await contactService.create(user, req.body)
        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

export default {
    create
}