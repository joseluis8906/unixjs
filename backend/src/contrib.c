#include "contrib.h"
#include "models/contrib/media_model.h"

//encrypt
int PasswordEncrypt (const char *Src, char *Dest)
{
    time_t Seconds;
    time (&Seconds);	
    srand ((unsigned int) Seconds);
	
    char Alpha[] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    int Index = rand () % 62;
	
    char Character[2];
    Character[0] = Alpha[Index];
    
    unsigned char Hash[SHA256_DIGEST_LENGTH];

    SHA256 ((unsigned char*)Character, strlen (Character), Hash);
	
    char RandomDigest[(SHA256_DIGEST_LENGTH * 2) + 1];
    int i = 0;
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (RandomDigest + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Salt[17];
    snprintf (Salt, 17, RandomDigest);
    
    Salt[6] = Character[0];
    
    char SrcModified[64];
    strncpy (SrcModified, Src, 64);
    SrcModified[4] = Character[0];
    
    SHA256 ((unsigned char*)SrcModified, strlen (SrcModified), Hash);

    char DigestSrcModified[(SHA256_DIGEST_LENGTH * 2) + 1];
    
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (DigestSrcModified + (i * 2), "%02x", (int)Hash[i]);
    }

    strcpy (Dest, "sha256$");
    strcat (Dest, Salt);
    strcat (Dest, "$");
    strcat (Dest, DigestSrcModified);
    
    return (KORE_RESULT_OK);
}



int CheckPassword (const char *Original, const char *Crypted)
{
    char Character[2];
    snprintf (Character, sizeof(char)+1, (Crypted+13));
    
    unsigned char Hash[SHA256_DIGEST_LENGTH];

    SHA256 ((unsigned char*)Character, strlen (Character), Hash);
	
    char RandomDigest[(SHA256_DIGEST_LENGTH * 2) + 1];
    int i = 0;
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (RandomDigest + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Salt[17];
    snprintf (Salt, 17, RandomDigest);
    
    Salt[6] = Character[0];
    
    char SrcModified[64];
    strncpy (SrcModified, Original, 64);
    SrcModified[4] = Character[0];
     
    SHA256 ((unsigned char*)SrcModified, strlen (SrcModified), Hash);

    char DigestSrcModified[(SHA256_DIGEST_LENGTH * 2) + 1];
    
    for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (DigestSrcModified + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Result[88];
    
    strcpy (Result, "sha256$");
    strcat (Result, Salt);
    strcat (Result, "$");
    strcat (Result, DigestSrcModified);

    int Ret;
    if (strcmp (Result, Crypted) == 0)
    {
        Ret = KORE_RESULT_OK;
    }
    else
    {
        Ret = KORE_RESULT_ERROR;
    }
    
    return Ret;
}



int VerifyRequest (struct HttpRequest *Req, char **Data, int Type)
{
    const char *Msg = NULL;
    JsonObject *JsonMsg = NULL;
    
    JsonMsg = JsonObjectNewObject ();
    
    if (Req->method != HTTP_METHOD_POST)
    {
        JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (KORE_RESULT_ERROR));
        JsonObjectObjectAdd (JsonMsg, "Message", JsonObjectNewString ("method is not post"));
        Msg = JsonObjectToJsonString (JsonMsg);
        HttpResponse (Req, 200, Msg,  strlen(Msg));
        
        JsonObjectPut (JsonMsg);
        return (KORE_RESULT_ERROR);
    }
    
    if (Type == FORM_JSON)
    {
        HttpPopulatePost (Req);
    }
    else
    {
        HttpPopulateMultipartForm (Req);
    }
    
    if (http_argument_get_string (Req, "Params", Data) == KORE_RESULT_ERROR)
    {
        JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (KORE_RESULT_ERROR));
        JsonObjectObjectAdd (JsonMsg, "Message", JsonObjectNewString ("Argument 'Params' not found"));
        Msg = JsonObjectToJsonString(JsonMsg);
        HttpResponse (Req, 200, Msg,  strlen(Msg));
        
        JsonObjectPut (JsonMsg);
        return (KORE_RESULT_ERROR);
    }
    
    JsonObjectPut (JsonMsg);
    
    return (KORE_RESULT_OK);
}



int HttpResponseJsonMsg (struct HttpRequest *Req, int Result, const char *Msg)
{
    const char *Resp = NULL;
    JsonObject *JsonMsg = NULL;
    JsonMsg  = JsonObjectNewObject ();
    
    JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "Data", JsonObjectNewString (Msg));
    Resp = JsonObjectToJsonString(JsonMsg);
    HttpResponse (Req, 200, Resp, strlen(Resp));
    
    JsonObjectPut (JsonMsg);
    JsonMsg = NULL;
    
    return KORE_RESULT_OK;
}


int HttpResponseJsonArray (struct HttpRequest *Req, int Result, JsonObject *Array)
{
    const char *Resp = NULL;
    JsonObject *JsonMsg = NULL;
    JsonMsg  = JsonObjectNewObject ();
    
    JsonObjectObjectAdd (JsonMsg, "result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "data", Array);
    Resp = JsonObjectToJsonString (JsonMsg);
    HttpResponse (Req, 200, Resp, strlen(Resp));
    
    JsonObjectPut (JsonMsg);
    JsonMsg = NULL;
    
    return KORE_RESULT_OK;
}

float MmToPx (float mm)
{
    float px = (1 * mm) / 0.352777778f;
    return px;
}

float PxToMm (float px)
{
    float mm = (0.352777778f * px) / 1.0f;
    return mm;
}



//Func Result
struct FuncResult NewFuncResult (int Result, const char *Msg)
{
    struct FuncResult X;
    
    X.Result = Result;
    strcpy (X.Msg, Msg);
    
    return X;
}



//enable parameters
int ParamsEnabled (struct HttpRequest *Req, char *Param)
{
	if (1)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}



// Validate sessions
int SessionValidate (struct HttpRequest *Req, char *Data)
{
	kore_log(LOG_NOTICE, "v_session_validate: %s", Data);

	if (strcmp(Data, "test123") == 0)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}



//upload_File
struct FuncResult UploadFile (struct HttpFile *File, char *Name, char *SubPath)
{
    char *DocumentsExt[] = {"txt", "pdf", "ps", "rtf", "wps", "xml", "xps", "odt", "doc", "docm", "docx", "dot", "dotm", "dotx", "csv", "dbf", "DIF", "ods", "prn", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsl", "xlsx", "xlt", "xltm", "xltx", "xlw", "xps", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"};
    size_t LengthDocumentsExt = sizeof (DocumentsExt) / sizeof (DocumentsExt[0]);
    
    char *MusicExt[] = {"mp3", "ogg", "wav", "flac", "pcm", "aiff", "au", "raw", "aac", "mp4a", "wma"};
    size_t LengthMusicExt = sizeof (MusicExt) / sizeof (MusicExt[0]);
    
    char *PicturesExt[] = {"jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"};
    size_t LengthPicturesExt = sizeof (PicturesExt) / sizeof (PicturesExt[0]);
    
    char *VideosExt[] = {"mpeg", "vob", "3gp", "mov", "mp4", "webm", "flv", "mkv", "avi", "ogm"};
    size_t LengthVideosExt = sizeof (VideosExt) / sizeof (VideosExt[0]);
    
    char Path[4096];
    
    strcpy (Path, "../share/");
    strcat (Path, SubPath); 
    
    struct stat St = {0};
        
    if (stat(Path, &St) == -1) 
    {
        mkdir (Path, 0755);
    }
    
    unsigned int i = 0;
    char ext[8] = ".";
    char type[8];
    int TypeFound = 0;
    
    for (i = 0; i < LengthDocumentsExt; i++)
    {
        if (strstr (File->filename, strcat (ext, DocumentsExt[i])) != NULL)
        {
            strcpy (type, DocumentsExt [i]);
            TypeFound = 1;
            break;
        }
        strcpy (ext, ".");
    }
    
    if (!TypeFound)
    {
        for (i = 0; i < LengthMusicExt; i++)
        {
            if (strstr (File->filename, strcat (ext, MusicExt[i])) != NULL)
            {
                strcpy (type, MusicExt [i]);
                TypeFound = 1;
                break;
            }
            strcpy(ext, ".");;
        }
    }
    
    if (!TypeFound)
    {
        for (i = 0; i < LengthPicturesExt; i++)
        {
            if (strstr (File->filename, strcat (ext, PicturesExt[i])) != NULL)
            {
                strcpy(type, PicturesExt [i]);
                TypeFound = 1;
                break;
            }
            strcpy(ext, ".");
        }
    }
    
    if (!TypeFound)
    {
        for (i = 0; i < LengthVideosExt; i++)
        {
            if (strstr (File->filename, strcat (ext, VideosExt[i])) != NULL)
            {
                strcpy (type, VideosExt [i]);
                TypeFound = 1;
                break;
            }
            strcpy(ext, ".");
        }
    }
    
    struct FuncResult Res = NewFuncResult (KORE_RESULT_OK, "File Upload"); ;

    if (!TypeFound)
    {
        Res.Result = KORE_RESULT_ERROR;
        strcpy (Res.Msg, "File Type Not Supported");
        return Res;
    }
    
    strcat (Path, Name);
    strcat (Path, ext);
    
    struct MediaModel Media;
    strcpy (Media.Name, Name);
    strcpy (Media.Type, ext);
    struct MediaModelArray Medias = NewMediaModelArray ();
    MediaModelArrayPush (&Medias, &Media);
    
    
    struct FuncResult Ret;
    
    Ret = MediaModelInsert (&Medias);
    
    if (Ret.Result == KORE_RESULT_ERROR)
    {
        Res.Result = KORE_RESULT_ERROR;
        strcpy (Res.Msg, Ret.Msg);
        return Res;
    }
    

    int fd = open (Path, O_CREAT | O_TRUNC | O_WRONLY, 0644);
    
    if (fd == -1)
    {
        
        return Res;
    }
    
    u_int8_t            buf[BUFSIZ];
    ssize_t             ret, written;
    
    ret = KORE_RESULT_ERROR;
    
    for(;;)
    {
        ret = HttpFileRead (File, buf, sizeof(buf));
        
        if (ret == -1)
        {
            Res.Result = KORE_RESULT_ERROR;
            strcpy (Res.Msg, "Failed To Read From File");
            goto cleanup;            
        }
        
        if (ret == 0)
        {
            break;
        }
        
        written = write (fd, buf, ret);
        
        if (written == -1) 
        {
            char tmpmsg [128] = "";
	    strcpy (tmpmsg, "Write(%s): ");
	    strcat (tmpmsg, File->filename);
	    strcat (tmpmsg, errno_s);
            Res.Result = KORE_RESULT_ERROR;
            strcpy (Res.Msg, tmpmsg);
            goto cleanup;
        }
        
        
        if (written != ret)
        {
            Res.Result = KORE_RESULT_ERROR;
            strcpy (Res.Msg, "Partial Write On File");
            goto cleanup;
        }
    }
    
    ret = KORE_RESULT_OK;
    
    cleanup:
        if (close (fd) == -1)
        {
            kore_log (LOG_WARNING, "close(%s) %s", File->filename, errno_s);
        }
        
        if (ret == KORE_RESULT_ERROR)
        {
            if (unlink (File->filename) == -1)
            {
                kore_log (LOG_WARNING, "unlink(%s): %s", File->filename, errno_s);
            }
            
            ret = KORE_RESULT_OK;
        }
        
        Res.Result = KORE_RESULT_ERROR;
        strcpy (Res.Msg, "Error Cleaning");
        
    return Res;
}



struct FuncResult FindFiles (struct HttpRequest *Req, struct StringArray *Names, struct HttpFileArray *Files)
{
    struct FuncResult X = NewFuncResult (KORE_RESULT_OK, "File found");
    
    int i = 0;
    for (i = 0; i < Names->Length; i++)
    {
        if ((Files->At[i] = HttpFileLookup (Req, Names->At[i])) == NULL)
        {
            X.Result = KORE_RESULT_ERROR;
            strcpy (X.Msg, "File not found");
            return X;
        }
    }
    return X;
}



int StringArrayPush (struct StringArray *Array, const char *String)
{
    if (Array->Length == LOW_ARRAY_SIZE)
    {
        return KORE_RESULT_ERROR;
    }
    strcpy (Array->At[Array->Length], String);
    Array->Length++;
    
    return KORE_RESULT_OK;
}



int Base64Encode(const char* Original, char* Encoded) //Encodes a string to base64
{
    BIO *bmem, *b64;
    BUF_MEM *bptr;

    b64 = BIO_new(BIO_f_base64());
    bmem = BIO_new(BIO_s_mem());
    b64 = BIO_push(b64, bmem);
    BIO_write(b64, Original, strlen(Original));
    BIO_flush(b64);
    BIO_get_mem_ptr(b64, &bptr);

    memcpy (Encoded, bptr->data, bptr->length-1);
    Encoded [bptr->length-1] = '\0';

    BIO_free_all(b64);

    return (KORE_RESULT_OK); //success
}



struct FuncResult GetMediaName (char *Name)
{
    struct FuncResult S;
    
    Connection_T Conn = DbGetConnection ();
        
    if (!Connection_ping (Conn))
    {   
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg,  "Error not database connection");
        return S;
    }   
    
    int64_t LastId = 0;
    
    TRY
    {   
        ResultSet_T R = Connection_executeQuery (Conn, "SELECT \"Id\" FROM \"Media\" ORDER BY \"Id\" DESC;");

        if (ResultSet_next (R))
        {
            LastId = ResultSet_getLLongByName(R, "Id");
        }
        else
        {
            LastId = 0;
        }
        
        S.Result = KORE_RESULT_OK;
        strcpy (S.Msg, "Media Found");
    }
    CATCH (SQLException)
    {    
        S.Result = KORE_RESULT_ERROR;
        strcpy (S.Msg, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    Connection_close (Conn);
    
    char Encoded [256];
    char Original [128];
    char Num [64];

    strcpy (Original, Name);
    sprintf (Num, "_%d_%lld_", (int)time(NULL), LastId);
    strcat (Original, Num);

    Base64Encode (Original, Encoded);
    
    strcpy (Name, Encoded);
    
    return S;
}