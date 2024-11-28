import { prisma } from "../config/prismaHandler";
import ApiError from "../utils/ErrorHandler.util";

const createRoleService = async (roleName) => {
  try {
    if (!roleName.trim()) {
      throw new ApiError("Please provide the Role", 401);
    }

    const existingRole = await prisma.role.findUnique({
      where: {
        roleName,
      },
    });

    if (existingRole) {
      throw new ApiError(`This Role is already Exist`, 401);
    }

    const newRole = await prisma.role.create({
      data: {
        roleName,
      },
    });

    return newRole;
  } catch (error) {
    console.error("Error in createRoleService", error);
    throw new ApiError(error.message || "Internal Server Error", 500);
  }
};

const updateRoleService = async (id, roleName) => {
  try {
    if (!id || !roleName.trim()) {
      throw new ApiError(401, "RoleName is required");
    }

    const existedRole = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!existedRole) {
      throw new ApiError(401, "This role is not existed");
    }

    const updatedRoleName = await prisma.role.update({
      where: {
        id,
      },
      data: {
        roleName,
      },
    });

    return updatedRoleName;
  } catch (error) {
    console.error(`Error in updateRoleService`, error);
    throw new ApiError(error.message || "Internal Server Error", 500);
  }
};

const deleteRoleService = async (id) => {
  try {
    if (!id) {
      throw new ApiError(401, `Id doesn't exist`);
    }

    const existingRole = await prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new ApiError(404, `Role not found`);
    }

    if (existingRole.users.length > 0) {
      throw new ApiError(
        400,
        `Role is assigned to users and cannot be deleted`
      );
    }

    const deletedRole = await prisma.role.delete({
      where: { id },
    });

    return deletedRole;
  } catch (error) {
    console.error(`Error in deleteRoleService`, error);
    throw new ApiError(error.message || "Internal Server Error", 500);
  }
};

export { createRoleService, updateRoleService, deleteRoleService };
