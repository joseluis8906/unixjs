#include <sys/syslog.h>

#include "auth_user_model.h"

struct AuthUserModel  NewAuthUserModel (char *DocumentType, char *DocumentNum, char *Password, char *Name, char *LastName, char *Phone, char *Email, char *Address)
{
    struct AuthUserModel X;
     
    strcpy (X.DocumentType, DocumentType);
    strcpy (X.DocumentNum, DocumentNum);
    strcpy (X.Password, Password);
    strcpy (X.Name, Name);
    strcpy (X.LastName, LastName);
    strcpy (X.Phone, Phone);
    strcpy (X.Email, Email);
    strcpy (X.Address, Address);
    
    return X;
}



struct AuthUserModel NewVoidAuthUserModel (void)
{
    struct AuthUserModel X;
    
    strcpy (X.DocumentType, "");
    strcpy (X.DocumentNum, "");
    strcpy (X.Password, "");
    strcpy (X.Name, "");
    strcpy (X.LastName, "");
    strcpy (X.Phone, "");
    strcpy (X.Email, "");
    strcpy (X.Address, "");        
    
    return X;
}



struct AuthUserModelArray NewAuthUserModelArray(void)
{
    struct AuthUserModelArray X;
    return X;
}



int AuthUserModelsToJson (struct AuthUserModelArray *Users, JsonObject *X)
{   
    JsonObject *Y = NULL;
    for (int i = 0; i < Users->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "DocumentType", JsonObjectNewString (Users->At[i].DocumentType));
        JsonObjectObjectAdd (Y, "DocumentNum", JsonObjectNewString (Users->At[i].DocumentNum));
        JsonObjectObjectAdd (Y, "Password", JsonObjectNewString (Users->At[i].Password));
        JsonObjectObjectAdd (Y, "Name", JsonObjectNewString (Users->At[i].Name));
        JsonObjectObjectAdd (Y, "LastName", JsonObjectNewString (Users->At[i].LastName));
        JsonObjectObjectAdd (Y, "Phone", JsonObjectNewString (Users->At[i].Phone));
        JsonObjectObjectAdd (Y, "Email", JsonObjectNewString (Users->At[i].Email));
        JsonObjectObjectAdd (Y, "Address", JsonObjectNewString (Users->At[i].Address));
        
        JsonObjectArrayAdd (X, JsonObjectGet (Y));
        
        JsonObjectPut (Y);
        Y = NULL;
    }
    
    return (KORE_RESULT_OK);
}



int JsonToAuthUserModels (char *Data, struct AuthUserModelArray *X)
{
    JsonObject *jobjs = NULL;
    jobjs = JsonTokenerParse (Data);
    int length = JsonObjectArrayLength (jobjs);
    
    X->Length = length;
    
    for (int i = 0; i < X->Length; i++)
    {
        json_object *jobj = NULL;
        jobj = json_object_array_get_idx (jobjs, i);
        
        X->At[i] = NewVoidAuthUserModel();
        
        JsonObjectObjectForeach (jobj, Key, Val)
        {          
            if (strcmp (Key, "DocumentType") == 0)
            {   
                strcpy (X->At[i].DocumentType, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "DocumentNum") == 0)
            {
                strcpy (X->At[i].DocumentNum, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Password") == 0)
            {
                strcpy (X->At[i].Password, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Name") == 0)
            {
                strcpy (X->At[i].Name, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "LastName") == 0)
            {
                strcpy (X->At[i].LastName, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Phone") == 0)
            {
                strcpy (X->At[i].Phone, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Email") == 0)
            {
                strcpy (X->At[i].Email, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Address") == 0)
            {
                strcpy (X->At[i].Address, JsonObjectGetString (Val));
            }
            else
            {
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                return (KORE_RESULT_ERROR);
            }
            
        }

        json_object_put (jobj);
        jobj = NULL;        
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    return (KORE_RESULT_OK);
}


/*
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
*/