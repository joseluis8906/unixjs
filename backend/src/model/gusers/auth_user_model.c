#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include <stdlib.h>
#include "auth_user_model.h"
#include "../database.h"
#include "../../contrib/contrib.h"

struct auth_user_model  new_auth_user_model (char *document, char *document_type)
{
    struct auth_user_model x;
    
    strcpy (x.document, document);
    strcpy (x.document_type, document_type);
    
    return x;
}


struct auth_user_model  new_void_auth_user_model (void)
{
    struct auth_user_model x;
    
    strcpy (x.document, "");
    strcpy (x.document_type, "");
    
    return x;
}


int auth_user_model_to_json (struct auth_user_model* auth_user, json_object* jobj)
{
    json_object_object_add (jobj, "document", json_object_new_string (auth_user->document));
    json_object_object_add (jobj, "document_type", json_object_new_string (auth_user->document_type));
    
    return (KORE_RESULT_OK);
}


int  json_to_auth_user_model (json_object* jobj, struct auth_user_model* auth_user)
{
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "document") == 0)
        {
            strcpy (auth_user->document, json_object_get_string (val));
        }
        else if (strcmp (key, "document_type") == 0)
        {
            strcpy (auth_user->document_type, json_object_get_string (val));
        }
        else
        {
            return (KORE_RESULT_ERROR);
        }
    }
    
    return (KORE_RESULT_OK);
}



//insert
struct sql_state auth_user_model_insert (struct auth_user_model users[], int length)
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
        
        PreparedStatement_T p = Connection_prepareStatement (conn, "INSERT INTO \"auth_user\" (\"document\", \"document_type\") VALUES (?, ?)");
        for (int i = 0; i < length; i++)
        {                
            PreparedStatement_setString (p, 1, users[i].document);
            PreparedStatement_setString (p, 2, users[i].document_type);
            PreparedStatement_execute (p);
        }
        
        Connection_commit (conn);    
        s = new_sql_state (KORE_RESULT_OK, "user insert");
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
struct sql_state   auth_user_model_update (struct auth_user_model_tuple updates[], int length)
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
        
        for (int i = 0; i < length; i++)
        {                
            r = Connection_executeQuery (conn, "SELECT \"id\" FROM \"auth_user\" WHERE \"document\"='%s' and \"document_type\"='%s';", updates[i].old_user.document, updates[i].old_user.document_type);
            if (ResultSet_next (r))
            {
                if (strcmp (updates[i].new_user.document, "") == 0)
                {
                    strcpy (updates[i].new_user.document, updates[i].old_user.document);
                }
                if (strcmp (updates[i].new_user.document_type, "") == 0)
                {
                    strcpy (updates[i].new_user.document_type, updates[i].old_user.document_type);
                }
            }
            else
            {
                s = new_sql_state (KORE_RESULT_ERROR, "no user in db to update");
                Connection_close (conn);
                return s;
            }
        }
        
        Connection_beginTransaction (conn);
        p = Connection_prepareStatement (conn, "UPDATE \"auth_user\" SET \"document\"=?, \"document_type\"=? WHERE \"document\"=? AND \"document_type\"=?");
        for (int i = 0; i < length; i++)
        {
            
            PreparedStatement_setString (p, 1, updates[i].new_user.document);
            PreparedStatement_setString (p, 2, updates[i].new_user.document_type);
            PreparedStatement_setString (p, 3, updates[i].old_user.document);
            PreparedStatement_setString (p, 4, updates[i].old_user.document_type);
            PreparedStatement_execute (p);
        }
        
        Connection_commit (conn);
        s = new_sql_state (KORE_RESULT_OK, "user update");
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
struct sql_state   auth_user_model_delete (struct auth_user_model users[], int length)
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
        
        PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM \"auth_user\" WHERE \"document\"=? AND \"document_type\"=?");
        for (int i = 0; i < length; i++)
        {
            PreparedStatement_setString (p, 1, users[i].document);
            PreparedStatement_setString (p, 2, users[i].document_type);
            PreparedStatement_execute (p);
        }
            
        Connection_commit (conn);
        s = new_sql_state (KORE_RESULT_OK, "user delete");
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
