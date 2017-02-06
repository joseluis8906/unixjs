/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   auth_user_group_model.h
 * Author: joseluis
 *
 * Created on February 5, 2017, 7:20 PM
 */
#include "auth_user_model.h"
#include "auth_group_model.h"

#ifndef _AUTH_USER_GROUP_MODEL_H_
#define _AUTH_USER_GROUP_MODEL_H_

struct AuthUserGroupModel
{
    struct AuthUserModel User;
    struct AuthGroupModel Group;
};

struct AuthUserGroupModelArray 
{
    struct AuthUserGroupModel At[LOW_ARRAY_SIZE];
    int Length;
};

struct AuthUserGroupModelArray NewAuthUserGroupModelArray (void);
struct FuncResult AuthUserGroupModelArrayPush (struct AuthUserGroupModelArray *Array, const struct AuthUserGroupModel *Element);

struct FuncResult AuthUserGroupModelsToJson (const struct AuthUserGroupModelArray *Models, JsonObject *Jsons);
struct FuncResult JsonToAuthUserGroupModels (const char *Jsons, struct AuthUserGroupModelArray *Models);

struct FuncResult  AuthUserGroupModelInsert (const struct AuthUserGroupModelArray *Models);

#endif /* AUTH_USER_GROUP_MODEL_H */

