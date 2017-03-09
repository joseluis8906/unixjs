#include "root_controller.h"
#include "auth_controller.h"
#include "../../models/contrib/app_role_model.h"
#include "../../database.h"
#include "../../contrib.h"
#include "assets.h"

//home
int Home (struct HttpRequest *Req)
{
    HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Hello World!");
    return (KORE_RESULT_OK);
}



//Statement Remote
int Statement (struct HttpRequest *Req)
{
    /*if (AuthControllerVerifySession (Req) == KORE_RESULT_ERROR)
    {
        return KORE_RESULT_OK;
    }*/
    
    char *Data = NULL;
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    char CliStm[32000];
    
    struct FuncResult Ret = GetJsonString (Data, "Statement", CliStm);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    JsonObject *Statements = NULL;
    Statements = JsonTokenerParse (CliStm);
    int Length = JsonObjectArrayLength (Statements);
    JsonObject *Tmp = NULL;
    
    Connection_T Conn = DbGetConnection ();
        
    if (!Connection_ping (Conn))
    {   
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "No Database Connection");
        return (KORE_RESULT_OK);
    }        
    
    TRY
    {   
        Connection_beginTransaction (Conn);
        PreparedStatement_T Stm;
        
        int i = 0;
        for (i = 0; i < Length; i++)
        {
            Tmp = JsonObjectArrayGetIdx(Statements, i);
            Stm = Connection_prepareStatement (Conn, "%s", JsonObjectGetString(Tmp));
            PreparedStatement_execute (Stm);
            JsonObjectPut (Tmp);
            Tmp = NULL;
        }
        Connection_commit (Conn);
        HttpResponseJsonMsg(Req, KORE_RESULT_OK, "Success");
        
    }
    CATCH (SQLException)
    {    
        Connection_rollback (Conn);
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Exception_frame.message);
    }
    FINALLY
    {
        Connection_close (Conn);
    }
    END_TRY;
    
    JsonObjectPut (Statements);
    Statements = NULL;
    
    return (KORE_RESULT_OK);
}



//Query Remote
int Query (struct HttpRequest *Req)
{
    /*if (AuthControllerVerifySession (Req) == KORE_RESULT_ERROR)
    {
        return KORE_RESULT_OK;
    }*/
    char *Data = NULL;
    
    if (VerifyRequest (Req, &Data, FORM_JSON) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    char Query[4096];
    struct FuncResult Ret = GetJsonString (Data, "Query", Query);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return (KORE_RESULT_OK);
    }
    
    Connection_T Conn = DbGetConnection ();
    
    if (!Connection_ping (Conn))
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, "No Database Connection");
        return (KORE_RESULT_OK);
    }

    TRY
    {   
        JsonObject *Res = NULL;
        Res = JsonObjectNewArray ();
        JsonObject *Row = NULL;
        
        
        ResultSet_T R = Connection_executeQuery (Conn, Query);
        int i = 0;
        int Cols = ResultSet_getColumnCount (R);
        
        while (ResultSet_next (R))
        {
            Row = JsonObjectNewObject ();
            for (i = 1; i <= Cols; i++)
            {
                JsonObjectObjectAdd (Row, ResultSet_getColumnName (R, i), JsonObjectNewString (ResultSet_getString (R, i)));
            }
            JsonObjectArrayAdd (Res, JsonObjectGet (Row));
            JsonObjectPut (Row);
            Row = NULL;
        }
        
        HttpResponseJsonObject (Req, KORE_RESULT_OK, Res);
        
        JsonObjectPut (Res);
        Res = NULL;
    }
    CATCH (SQLException)
    {
        HttpResponseJsonMsg(Req, KORE_RESULT_ERROR, Exception_frame.message);
    }
    FINALLY
    {
        Connection_close (Conn);
    }
    END_TRY;
    
    return (KORE_RESULT_OK);
}



//approles
int AppRoles (struct HttpRequest *Req)
{   
    struct FuncResult Ret;
    char UserName[64];
    
    if (AuthControllerGetUserInfo(Req, UserName) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    struct AppRoleModelArray AppRoles = NewAppRoleModelArray ();
    
    Ret = AppRoleModelSelect (&AppRoles, UserName);

    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return KORE_RESULT_OK;
    }
    
    JsonObject *Jobj = NULL;
    Jobj = JsonObjectNewArray ();
    
    Ret = AppRoleModelsToJson(&AppRoles, Jobj);

    if (Ret.Result == KORE_RESULT_ERROR)
    {
        HttpResponseJsonMsg(Req, Ret.Result, Ret.Msg);
        return KORE_RESULT_OK;
    }
    
    HttpResponseJsonObject (Req, KORE_RESULT_OK, Jobj);
    
    JsonObjectPut (Jobj);
    Jobj = NULL;
    
    return KORE_RESULT_OK;
}



/*
//group select
int group_select (struct http_request *req)
{
    char *data = NULL;
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
     
    Connection_T conn = get_connection ();
    
    if (!Connection_ping (conn))
    {
        http_response_json_msg (req, KORE_RESULT_OK, "error not database connection");
        return (KORE_RESULT_OK);
    }
    
    json_object *jarray = NULL;
    jarray = json_object_new_array ();

    TRY
    {   
        ResultSet_T r = Connection_executeQuery (conn, "SELECT name FROM auth_group");
        json_object *ob = NULL;
        while (ResultSet_next (r))
        {
            auth_group_model_t g = new_void_auth_group_model ();
            strcpy (g.name, ResultSet_getStringByName (r, "name"));
            ob = auth_group_model_to_json (&g);
            json_object_array_add (jarray, ob);        
        }
            
        http_response_json_array (req, KORE_RESULT_OK, jarray);
            
        json_object_put (ob);
        ob = NULL;
            
        json_object_put (jarray);
        jarray = NULL;
            
        Connection_close (conn);
        return (KORE_RESULT_OK);
    }
    CATCH (SQLException)
    {
        json_object_put (jarray);
        jarray = NULL;
            
        http_response_json_msg (req, KORE_RESULT_OK, Exception_frame.message);
        Connection_close (conn);
        return (KORE_RESULT_OK);
    }
    FINALLY
    {
    }
    END_TRY;
    
    return (KORE_RESULT_OK);
}



//group insert
int group_insert (struct http_request *req)
{
    char            *data = NULL;
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_group_model_t  auth_group_models[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_group_models[i] = new_void_auth_group_model ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "name") == 0)
            {
                 strcpy (auth_group_models[i].name, json_object_get_string (val));
            }
            else 
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: not key name found");
                
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                return (KORE_RESULT_OK);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Connection_T conn = get_connection ();
    
    if (!Connection_ping (conn))
    {   http_response_json_msg (req, KORE_RESULT_ERROR, "error: not database connection");
        return (KORE_RESULT_OK);
    }
     
    TRY
    {   
        PreparedStatement_T p = Connection_prepareStatement (conn, "INSERT INTO auth_group (name) VALUES (?)");
            
        for (int i = 0; i < length; i++)
        {
            PreparedStatement_setString (p, 1, auth_group_models[i].name);
            PreparedStatement_execute (p);
        }
            
        http_response_json_msg (req, KORE_RESULT_ERROR, "group insert");
        Connection_close (conn);
            
        return (KORE_RESULT_OK);
    }
    CATCH (SQLException)
    {           
        http_response_json_msg (req, KORE_RESULT_ERROR, Exception_frame.message);
        Connection_close (conn);
            
        return (KORE_RESULT_OK);
    }
    FINALLY
    {
    }
    END_TRY;
   
    return (KORE_RESULT_OK);
}



//group update
int group_update (struct http_request *req)
{
    char            *data = NULL;
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_group_update_t auth_group_updates[length];
        
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_group_updates[i].old_group = new_void_auth_group_model ();
        auth_group_updates[i].new_group = new_void_auth_group_model ();
     
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "name") == 0)
            {
                 strcpy (auth_group_updates[i].old_group.name, json_object_get_string (val));
            }
            else if (strcmp (key, "new_name") == 0)
            {
                strcpy (auth_group_updates[i].new_group.name, json_object_get_string (val));
            }
            else 
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: key name or new_name not found");
                
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                return (KORE_RESULT_OK);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Connection_T conn = get_connection ();
    
    if (!Connection_ping (conn))
    {   
        http_response_json_msg (req, KORE_RESULT_ERROR, "error not database connection");
        Connection_close (conn);
        return (KORE_RESULT_OK);
    }
    
    TRY
    {   
        ResultSet_T r;
        PreparedStatement_T p = Connection_prepareStatement (conn, "UPDATE auth_group SET name=? WHERE name=?");
        for (int i = 0; i < length; i++)
        {
            r = Connection_executeQuery (conn, "SELECT name FROM auth_group WHERE name='%s'", auth_group_updates[i].old_group.name);
            if (ResultSet_next (r))
            {
                PreparedStatement_setString (p, 1, auth_group_updates[i].new_group.name);
                PreparedStatement_setString (p, 2, auth_group_updates[i].old_group.name);
                PreparedStatement_execute (p);    
            }
            else
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "Error: no group found with name value");
                return (KORE_RESULT_OK);
            }
        }
                        
        http_response_json_msg (req, KORE_RESULT_ERROR, "group update");
        Connection_close (conn);
            
        return (KORE_RESULT_OK);
    }
    CATCH (SQLException)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, Exception_frame.message);
        Connection_close (conn);
            
        return (KORE_RESULT_OK);
    }
    FINALLY
    {
    }
    END_TRY;
    
    return (KORE_RESULT_OK);
}



//group delete
int group_delete (struct http_request *req)
{
    char            *data = NULL;
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_group_model_t auth_group_models[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_group_models[i] = new_void_auth_group_model ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "name") == 0)
            {
                 strcpy (auth_group_models[i].name, json_object_get_string (val));
            }
            else 
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: key name not found");
                json_object_put (jobj);
                jobj = NULL;
                return (KORE_RESULT_OK);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Connection_T conn = get_connection ();
    
    if (!Connection_ping (conn))
    {
        http_response_json_msg (req, KORE_RESULT_OK, "error not database connection");
        Connection_close (conn);
            
        return (KORE_RESULT_OK);   
    }
    
    TRY
    {
        PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM auth_group WHERE name=?");
        for (int i = 0; i < length; i++)
        {
            PreparedStatement_setString (p, 1, auth_group_models[i].name);
            PreparedStatement_execute (p);
        }
            
        http_response_json_msg (req, KORE_RESULT_OK, "group deleted");
        Connection_close (conn);
            
        return (KORE_RESULT_OK);
    }
    CATCH (SQLException)
    {
        http_response_json_msg (req, KORE_RESULT_OK, Exception_frame.message);
        Connection_close (conn);
            
        return (KORE_RESULT_OK);   
    }
    FINALLY
    {
    }
    END_TRY;

    return (KORE_RESULT_OK);
}

*/