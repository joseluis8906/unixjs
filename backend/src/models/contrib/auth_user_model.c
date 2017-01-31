#include "auth_user_model.h"

struct AuthUserModel  NewAuthUserModel (const char *UserName, const char *Password, const char *DocumentType, const char *DocumentNum, const char *Country,  const char *Name, const char *LastName, const struct MediaModel *Avatar, const char *Phone, const char *Email, char *Address)
{
    struct AuthUserModel X;
     
    strcpy (X.UserName, UserName);
    strcpy (X.Password, Password);
    strcpy (X.DocumentType, DocumentType);
    strcpy (X.DocumentNum, DocumentNum);
    strcpy (X.Country, Country);
    strcpy (X.Name, Name);
    strcpy (X.LastName, LastName);
    memcpy (&(X.Avatar), Avatar, sizeof (struct MediaModel));
    strcpy (X.Phone, Phone);
    strcpy (X.Email, Email);
    strcpy (X.Address, Address);
    
    return X;
}



struct AuthUserModel NewVoidAuthUserModel (void)
{
    struct AuthUserModel X;
    
    strcpy (X.UserName, "");
    strcpy (X.Password, "");
    strcpy (X.DocumentType, "");
    strcpy (X.DocumentNum, "");
    strcpy (X.Country, "");
    strcpy (X.Name, "");
    strcpy (X.LastName, "");
    X.Avatar = NewVoidMediaModel ();
    strcpy (X.Phone, "");
    strcpy (X.Email, "");
    strcpy (X.Address, "");
    
    return X;
}



struct AuthUserModelArray NewAuthUserModelArray (void)
{
    struct AuthUserModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult AuthUserModelsToJson (const struct AuthUserModelArray *Models, JsonObject *Jsons)
{   
    JsonObject *Y = NULL;
    
    char AvatarFullName[256+8];
    
    for (int i = 0; i < Models->Length; i++)
    {
        Y = JsonObjectNewObject ();
        
        JsonObjectObjectAdd (Y, "UserName", JsonObjectNewString (Models->At[i].UserName));
        JsonObjectObjectAdd (Y, "Password", JsonObjectNewString (Models->At[i].Password));
        JsonObjectObjectAdd (Y, "DocumentType", JsonObjectNewString (Models->At[i].DocumentType));
        JsonObjectObjectAdd (Y, "DocumentNum", JsonObjectNewString (Models->At[i].DocumentNum));
        JsonObjectObjectAdd (Y, "Country", JsonObjectNewString (Models->At[i].Country));
        JsonObjectObjectAdd (Y, "Name", JsonObjectNewString (Models->At[i].Name));
        JsonObjectObjectAdd (Y, "LastName", JsonObjectNewString (Models->At[i].LastName));
        strcpy (AvatarFullName, Models->At[i].Avatar.Name);
        strcat (AvatarFullName, Models->At[i].Avatar.Type);
        JsonObjectObjectAdd (Y, "Avatar", JsonObjectNewString (AvatarFullName));
        JsonObjectObjectAdd (Y, "Phone", JsonObjectNewString (Models->At[i].Phone));
        JsonObjectObjectAdd (Y, "Email", JsonObjectNewString (Models->At[i].Email));
        JsonObjectObjectAdd (Y, "Address", JsonObjectNewString (Models->At[i].Address));
        
        JsonObjectArrayAdd (Jsons, JsonObjectGet (Y));
        
        JsonObjectPut (Y);
        Y = NULL;
    }
    
    struct FuncResult Ret;
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



struct FuncResult JsonToAuthUserModels (const char *Jsons, struct AuthUserModelArray *Models)
{
    struct FuncResult Ret;
    
    JsonObject *jobjs = NULL;
    jobjs = JsonTokenerParse (Jsons);
    int length = JsonObjectArrayLength (jobjs);

    Models->Length = length;
    
    for (int i = 0; i < Models->Length; i++)
    {
        json_object *jobj = NULL;
        jobj = json_object_array_get_idx (jobjs, i);
        
        Models->At[i] = NewVoidAuthUserModel();
        
        char Pwd[256];
        
        JsonObjectObjectForeach (jobj, Key, Val)
        {          
            if (strcmp (Key, "UserName") == 0)
            {   
                strcpy (Models->At[i].UserName, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Password") == 0)
            {
                strcpy (Pwd, JsonObjectGetString (Val));
                PasswordEncrypt(Pwd, Models->At[i].Password);
            }
            else if (strcmp (Key, "DocumentType") == 0)
            {   
                strcpy (Models->At[i].DocumentType, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "DocumentNum") == 0)
            {
                strcpy (Models->At[i].DocumentNum, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Country") == 0)
            {
                strcpy (Models->At[i].Country, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Name") == 0)
            {
                strcpy (Models->At[i].Name, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "LastName") == 0)
            {
                strcpy (Models->At[i].LastName, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Avatar") == 0)
            {   
                strcpy (Models->At[i].Avatar.Name, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Phone") == 0)
            {
                strcpy (Models->At[i].Phone, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Email") == 0)
            {
                strcpy (Models->At[i].Email, JsonObjectGetString (Val));
            }
            else if (strcmp (Key, "Address") == 0)
            {
                strcpy (Models->At[i].Address, JsonObjectGetString (Val));
            }
            else
            {
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                
                Ret.Result = KORE_RESULT_ERROR;
                strcpy (Ret.Msg, "Key not found.");
               
                return Ret;
            }
            
        }

        json_object_put (jobj);
        jobj = NULL;        
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    
    return Ret;
}



struct FuncResult AuthUserModelArrayPush (struct AuthUserModelArray *Array, const struct AuthUserModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct AuthUserModel));
    Array->Length++;
    
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}



//insert
struct FuncResult AuthUserModelInsert (const struct AuthUserModelArray *Models)
{
    struct FuncResult S;
    
    Connection_T Conn = DbGetConnection ();
        
    if (!Connection_ping (Conn))
    {   
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "Error not database connection");
        return S;
    }        
    
    TRY
    {   
        Connection_beginTransaction (Conn);
        
        PreparedStatement_T Stm; 

        int i = 0;
        for (i = 0; i < Models->Length; i++)
        {
            Stm = Connection_prepareStatement (Conn, "WITH \"Ins1\" AS (INSERT INTO \"AuthUser\"(\"UserName\", \"Password\") VALUES(?, ?) RETURNING \"Id\" AS \"UserId\"), \"Ins2\" AS (INSERT INTO \"AuthUserBasicInfo\"(\"UserId\", \"DocumentType\", \"DocumentNum\", \"Country\", \"Name\", \"LastName\") SELECT \"UserId\", ?, ?, ?, ?, ? FROM \"Ins1\" RETURNING \"UserId\") INSERT INTO \"AuthUserComplementaryInfo\"(\"UserId\", \"Avatar\", \"Phone\", \"Email\", \"Address\") SELECT \"UserId\", \"Media\".\"Id\", ?, ?, ? FROM \"Ins1\" INNER JOIN \"Media\" ON \"Name\"='%s' AND \"Type\"='%s';", Models->At[i].Avatar.Name, Models->At[i].Avatar.Type);
            PreparedStatement_setString (Stm, 1, Models->At[i].UserName);
            PreparedStatement_setString (Stm, 2, Models->At[i].Password);
            PreparedStatement_setString (Stm, 3, Models->At[i].DocumentType);
            PreparedStatement_setString (Stm, 4, Models->At[i].DocumentNum);
            PreparedStatement_setString (Stm, 5, Models->At[i].Country);
            PreparedStatement_setString (Stm, 6, Models->At[i].Name);
            PreparedStatement_setString (Stm, 7, Models->At[i].LastName);
            PreparedStatement_setString (Stm, 8, Models->At[i].Phone);
            PreparedStatement_setString (Stm, 9, Models->At[i].Email);
            PreparedStatement_setString (Stm, 10, Models->At[i].Address);
            PreparedStatement_execute (Stm);
        }
        
        Connection_commit (Conn);
        
        Connection_close (Conn);
    
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg, "Users inserted");
        
    }
    CATCH (SQLException)
    {    
        Connection_rollback (Conn);
        
        Connection_close (Conn);
        
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    return S;
}



struct FuncResult AuthUserModelSelect (const char *UserName, struct AuthUserModelArray *Models)
{
    struct FuncResult S;
    
    Connection_T Conn = DbGetConnection ();
    
    if (!Connection_ping (Conn))
    {
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "Error not database connection");
        return S;
    }

    TRY
    {   
        ResultSet_T R = Connection_executeQuery (Conn, "SELECT \"UserName\", \"Password\", \"DocumentType\", \"DocumentNum\", \"Country\", \"AuthUserAll\".\"Name\" AS \"Name\", \"LastName\", \"Media\".\"Name\" AS \"AvatarName\", \"Media\".\"Type\" AS \"AvatarType\", \"Phone\", \"Email\", \"Address\" FROM \"AuthUserAll\" INNER JOIN \"Media\" ON \"UserName\"='%s';", UserName);
        
        struct AuthUserModel Tmp = NewVoidAuthUserModel ();
        
        while (ResultSet_next (R))
        {
            strcpy (Tmp.UserName, ResultSet_getStringByName (R, "UserName"));
            strcpy (Tmp.Password, ResultSet_getStringByName (R, "Password"));
            strcpy (Tmp.DocumentType, ResultSet_getStringByName (R, "DocumentType"));
            strcpy (Tmp.DocumentNum, ResultSet_getStringByName (R, "DocumentNum"));
            strcpy (Tmp.Country, ResultSet_getStringByName (R, "Country"));
            strcpy (Tmp.Name, ResultSet_getStringByName (R, "Name"));
            strcpy (Tmp.LastName, ResultSet_getStringByName (R, "LastName"));
            strcpy (Tmp.Avatar.Name, ResultSet_getStringByName (R, "AvatarName"));
            strcpy (Tmp.Avatar.Type, ResultSet_getStringByName (R, "AvatarType"));
            strcpy (Tmp.Phone, ResultSet_getStringByName (R, "Phone"));
            strcpy (Tmp.Email, ResultSet_getStringByName (R, "Email"));
            strcpy (Tmp.Address, ResultSet_getStringByName (R, "Address"));
            
            AuthUserModelArrayPush (Models, &Tmp);
        }
        
        Connection_close (Conn);
        
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg,  "AuthUserModelSelect Success");
        
    }
    CATCH (SQLException)
    {
        Connection_close (Conn);
     
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "AuthUserModelSelect Failed");
    }
    FINALLY
    {
    }
    END_TRY;
    
    return S;
}



/*
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