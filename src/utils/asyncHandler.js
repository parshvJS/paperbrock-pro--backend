export const asyncHandler=(accseFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(accseFunction(req,res,next)).catch((err)=>next(err))
    }
}
