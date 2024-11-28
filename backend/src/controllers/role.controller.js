import { createRoleService, deleteRoleService, updateRoleService } from "../services/role.service";
import { asyncHandler } from "../utils/asyncHandler.util";
import { ApiResponse } from "../utils/Response.util";

const createRoleHandler = asyncHandler(async(req , res)=>{
    const {roleName} = req.body;

    const newRole = await createRoleService(roleName);

    return ApiResponse(res , 200 , newRole , "Created Successfully");

})

const updateRoleHandler = asyncHandler(async(req, res)=>{
    const {id} = req?.params;
    const {roleName} = req?.body;

    const updatedRole = await updateRoleService(id , roleName);

    return ApiResponse(res , 200 , updatedRole , `Updated Successfully`);
})

const deleteRoleHandler = asyncHandler(async(req, res)=>{
    const {id} = req?.params;

    const deletedUser = await deleteRoleService(id);

    return ApiResponse(res , 200 , null , 'Deleted Successfully');
})


export {
    createRoleHandler,
    updateRoleHandler,
    deleteRoleHandler
}