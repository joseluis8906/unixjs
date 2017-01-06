#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include <stdlib.h>
#include "auth_password_model.h"
#include "../database.h"
#include "../../contrib/contrib.h"

struct auth_password_model  new_password_model (int64_t auth_user_id, char *password)
{
    struct auth_password_model x;
    
    x.auth_user_id = auth_user_id;
    strcpy (x.password, password);
    
    return x;
}


struct auth_password_model  new_void_auth_password_model (void)
{
    struct auth_password_model x;
    
    x.auth_user_id = NULL;
    strcpy (x.password, "");
    
    return x;
}


int auth_password_model_to_json (struct auth_password_model *auth_password, json_object* jobj)
{
    json_object_object_add (jobj, "auth_user_id", json_object_new_int64 (auth_password->auth_user_id));
    json_object_object_add (jobj, "password", json_object_new_string (auth_password->password));
    
    return (KORE_RESULT_OK);
}


int  json_to_auth_password_model (json_object *jobj, struct auth_password_model *auth_password)
{
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "auth_user_id") == 0)
        {
            auth_password->auth_user_id = json_object_get_int64 (val);
        }
        else if (strcmp (key, "password") == 0)
        {
            strcpy (auth_password->password, json_object_get_string (val));
        }
        else
        {
            return (KORE_RESULT_ERROR);
        }
    }
    
    return (KORE_RESULT_OK);
}



//insert
struct sql_state auth_password_model_insert (struct auth_password_model passwords[], int length)
{
    struct sql_state s;
    
    Connection_T conn = get_connection ();
        
    if (!Connection_ping (conn))
    {   
        s = new_sql_state (KORE_RESULT_ERROR, "error not database connection");
        return s;
    }
    
    TRY
    {   
        Connection_beginTransaction (conn);
        
        PreparedStatement_T p = Connection_prepareStatement (conn, "INSERT INTO \"auth_password\" (\"auth_user_id\", \"password\") VALUES (?, ?)");
        for (int i = 0; i < length; i++)
        {                
            PreparedStatement_setLLong (p, 1, passwords[i].auth_user_id);
            PreparedStatement_setString (p, 2, passwords[i].password);
            PreparedStatement_execute (p);
        }
        
        Connection_commit (conn);    
        s = new_sql_state (KORE_RESULT_OK, "password insert");
    }
    CATCH (SQLException)
    {    
        Connection_rollback (conn);
        s = new_sql_state (KORE_RESULT_ERROR, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    Connection_close (conn);
    return s;
}



//update
struct sql_state  auth_password_model_update (struct auth_password_model_tuple updates[], int length)
{
    struct sql_state s;
    
    Connection_T conn = get_connection ();
        
    if (!Connection_ping (conn))
    {   
        s = new_sql_state (KORE_RESULT_ERROR, "error not database connection");
        return s;
    }
    
    TRY
    {
        ResultSet_T r;
        PreparedStatement_T p;
           
        Connection_beginTransaction (conn);
        p = Connection_prepareStatement (conn, "UPDATE \"auth_password\" SET \"password\"=? WHERE \"auth_user_id\"=?");
        for (int i = 0; i < length; i++)
        {
            
            PreparedStatement_setString (p, 1, updates[i].new_password.password);
            PreparedStatement_setLLong (p, 2, updates[i].old_password.auth_user_id);
            PreparedStatement_execute (p);
        }
        
        Connection_commit (conn);
        s = new_sql_state (KORE_RESULT_OK, "password update");
    }
    CATCH (SQLException)
    {
        Connection_rollback (conn);
        s = new_sql_state (KORE_RESULT_ERROR, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    Connection_close (conn);
    return s;
}



//delete
struct sql_state  auth_password_model_delete (struct auth_password_model passwords[], int length)
{
    struct sql_state s;
    
    Connection_T conn = get_connection ();
        
    if (!Connection_ping (conn))
    {   
        s = new_sql_state (KORE_RESULT_ERROR, "error not database connection");
        return s;
    }
    
    TRY
    {
        Connection_beginTransaction (conn);
        
        PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM \"auth_password\" WHERE \"auth_user_id\"=?");
        for (int i = 0; i < length; i++)
        {
            PreparedStatement_setLLong (p, 1, passwords[i].auth_user_id);
            PreparedStatement_execute (p);
        }
            
        Connection_commit (conn);
        s = new_sql_state (KORE_RESULT_OK, "password delete");
    }
    CATCH (SQLException)
    {
        Connection_rollback (conn);
        s = new_sql_state (KORE_RESULT_OK, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    Connection_close (conn);
    return s;
}
