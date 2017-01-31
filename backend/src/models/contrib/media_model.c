#include "media_model.h"

struct MediaModel NewVoidMediaModel (void)
{
    struct MediaModel X;
    strcpy (X.Name, "");
    strcpy (X.Type, "");
    
    return X;
}



struct FuncResult MediaModelInsert (struct MediaModelArray *Medias)
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
        for (i = 0; i < Medias->Length; i++)
        {
            Stm = Connection_prepareStatement (Conn, "INSERT INTO \"Media\"(\"Name\", \"Type\") VALUES(?, ?);");
            PreparedStatement_setString (Stm, 1, Medias->At[i].Name);
            PreparedStatement_setString (Stm, 2, Medias->At[i].Type);
            PreparedStatement_execute (Stm);
        }
        
        Connection_commit (Conn);
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg, "Medias inserted");
    }
    CATCH (SQLException)
    {    
        //Connection_rollback (Conn);
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    Connection_close (Conn);
    return S;
}



struct MediaModelArray NewMediaModelArray (void)
{
    struct MediaModelArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult MediaModelArrayPush (struct MediaModelArray *Array, const struct MediaModel *Element)
{
    struct FuncResult Ret;
    
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        Ret.Result = KORE_RESULT_ERROR;
        strcpy (Ret.Msg, "Array Length Max");
        return Ret;
    }
    
    memcpy (&(Array->At[Array->Length]), Element, sizeof(struct MediaModel));
    Array->Length++;
    
    
    Ret.Result = KORE_RESULT_OK;
    strcpy (Ret.Msg, "");
    return Ret;
}