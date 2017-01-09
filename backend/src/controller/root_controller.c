#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#include <json-c/json.h>

#include "root_controller.h"
#include "../model/database.h"
#include "../contrib/contrib.h"

#include "../model/gusers/auth_group_model.h"

//home
int home (struct http_request *req)
{
    //sql_state r = init_database_system ();
    //kore_log (LOG_INFO, "%s", r.msg);
    const char *msg = "hello world!";
    http_response (req, 200, msg,  strlen(msg));
    return (KORE_RESULT_OK);
}


//test
int test (struct http_request *req)
{

    const char *msg = "test!";
    http_response (req, 200, msg,  strlen(msg));
    return (KORE_RESULT_OK);
}

//v_params_enable
int v_params_enabled (struct http_request *req, char *param)
{
	if (1)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}



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

