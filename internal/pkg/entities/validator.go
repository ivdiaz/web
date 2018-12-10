/*
 * Copyright (C) 2018 Nalej - All Rights Reserved
 */

package entities

import (
	"github.com/nalej/derrors"
	"github.com/nalej/grpc-authx-go"
	"github.com/nalej/grpc-organization-go"
	"github.com/nalej/grpc-user-go"
	"github.com/nalej/grpc-user-manager-go"
)

const emptyOrganizationId = "organization_id cannot be empty"
const emptyEmail = "email cannot be empty"
const emptyName = "name cannot be empty"
const emptyRoleID = "role_id cannot be empty"


func ValidOrganizationID(organizationID *grpc_organization_go.OrganizationId) derrors.Error {
	if organizationID.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	return nil
}

func ValidUserID(userID *grpc_user_go.UserId) derrors.Error {
	if userID.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if userID.Email == "" {
		return derrors.NewInvalidArgumentError(emptyEmail)
	}
	return nil
}

func ValidAddRoleRequest(addRoleRequest *grpc_user_manager_go.AddRoleRequest) derrors.Error {
	if addRoleRequest.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if addRoleRequest.Name == "" {
		return derrors.NewInvalidArgumentError(emptyName)
	}
	if len(addRoleRequest.Primitives) == 0 {
		return derrors.NewInvalidArgumentError("at least one primitive is expected")
	}
	return nil
}

func ValidRoleID(roleID *grpc_authx_go.RoleId) derrors.Error{
	if roleID.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if roleID.RoleId == "" {
		return derrors.NewInvalidArgumentError(emptyRoleID)
	}
	return nil
}

func ValidAssignRoleRequest(assignRoleRequest *grpc_user_manager_go.AssignRoleRequest) derrors.Error {
	if assignRoleRequest.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if assignRoleRequest.Email == "" {
		return derrors.NewInvalidArgumentError(emptyEmail)
	}
	if assignRoleRequest.RoleId == "" {
		return derrors.NewInvalidArgumentError(emptyRoleID)
	}
	return nil
}

func ValidAddUserRequest(addUserRequest *grpc_user_manager_go.AddUserRequest) derrors.Error {
	if addUserRequest.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if addUserRequest.Email == "" {
		return derrors.NewInvalidArgumentError(emptyEmail)
	}
	if addUserRequest.Password == "" {
		return derrors.NewInvalidArgumentError("password cannot be empty")
	}
	if addUserRequest.Name == "" {
		return derrors.NewInvalidArgumentError(emptyName)
	}
	if addUserRequest.RoleId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	return nil
}

func ValidChangePasswordRequest(request *grpc_user_manager_go.ChangePasswordRequest) derrors.Error {
	if request.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if request.Email == "" {
		return derrors.NewInvalidArgumentError(emptyEmail)
	}
	if request.Password == "" {
		return derrors.NewInvalidArgumentError("password cannot be empty")
	}
	if request.NewPassword == "" {
		return derrors.NewInvalidArgumentError("new_password cannot be empty")
	}
	return nil
}

func ValidUpdateUserRequest(addUserRequest *grpc_user_go.UpdateUserRequest) derrors.Error {
	if addUserRequest.OrganizationId == "" {
		return derrors.NewInvalidArgumentError(emptyOrganizationId)
	}
	if addUserRequest.Email == "" {
		return derrors.NewInvalidArgumentError(emptyEmail)
	}
	return nil
}
