class apiError extends Error {
    constructor(statusCode,message){
        super(message)
        this.statuscode=statusCode
        this.success=false

        Error.captureStackTrace(this,this.constructor)
    }
}

export {apiError}