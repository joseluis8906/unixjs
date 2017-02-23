/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#include "gusersgroups_controller.h"
#include "auth_controller.h"
#include "../../models/contrib/auth_user_group_model.h"

int GusersgroupsControllerSave (struct HttpRequest *Req)
{
    if (AuthControllerVerifySession(Req) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    } 
    
    char *Data = NULL;
    
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    struct AuthUserGroupModelArray UsersGroups;
    
    struct FuncResult Ret = JsonToAuthUserGroupModels (Data, &UsersGroups);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    Ret = AuthUserGroupModelInsert (&UsersGroups);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    HttpResponseJsonMsg (Req, KORE_RESULT_OK, "Success");

    return KORE_RESULT_OK;
}