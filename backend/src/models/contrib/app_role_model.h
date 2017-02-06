/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   app_role_media.h
 * Author: joseluis
 *
 * Created on February 1, 2017, 11:43 AM
 */
#include "../../contrib.h"
#include "../../database.h"
#include "auth_group_model.h"

#ifndef _APP_ROLE_MODEL_H_
#define _APP_ROLE_MODEL_H_

struct AppRoleModel
{
    char Image[32];
    char Label[16];
    char Name[16];
    struct AuthGroupModel Group;
};

struct AppRoleModelArray
{
    struct AppRoleModel At[LOW_ARRAY_SIZE];
    int Length;
};

struct FuncResult AppRoleModelsToJson (const struct AppRoleModelArray *Models, JsonObject *Jsons);
struct FuncResult JsonToAppRoleModels (const char *Jsons, struct AppRoleModelArray *Models);

struct AppRoleModelArray NewAppRoleModelArray (void);
struct FuncResult AppRoleModelArrayPush (struct AppRoleModelArray *Array, const struct AppRoleModel *Element);

struct FuncResult AppRoleModelSelect (struct AppRoleModelArray *Models, const char *UserName);
struct FuncResult AppRoleModelInsert (struct AppRoleModelArray *Models);

#endif

