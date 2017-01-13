#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include "contrib.h"
#include "defines.h"
#include <openssl/sha.h>
#include <math.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

//encrypt
int StringEncrypt (const char *Src, char *Dest)
{
    if (strlen(Dest) < 88)
    {
        return (KORE_RESULT_ERROR);
    }
    
    time_t Seconds;
    time (&Seconds);	
    srand ((unsigned int) Seconds);
	
    char *PtrAlpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    int Index = rand () % 62;
	
    char Character[1];
    Character[0] = PtrAlpha[Index];
	
    const unsigned char *PtrCharacter = NULL;
    PtrCharacter = (const unsigned char*)Character;
    
    unsigned char Hash[SHA256_DIGEST_LENGTH];

    SHA256 (PtrCharacter, strlen (Character), Hash);
	
    char RandomDigest[SHA256_DIGEST_LENGTH * 2];
    char *PtrRandomDigest = NULL;
    PtrRandomDigest = RandomDigest;
    
    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (PtrRandomDigest + (i * 2), "%02x", (int)Hash[i]);
    }
    
    char Salt[16];
    snprintf (Salt, sizeof (Salt) + 1, RandomDigest);
    
    Salt[7] = Character[0];
    
    int SrcLength = strlen(Src);
    char SrcModified[SrcLength + 1];
    strcpy (SrcModified, Src);
    SrcModified[SrcLength] = Character[0];
    
    const unsigned char *PtrSrcModified = (const unsigned char*)SrcModified;
    
    SHA256 (PtrSrcModified, strlen(SrcModified), Hash);
    
    char DigestSrcModified[SHA256_DIGEST_LENGTH * 2];

    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (DigestSrcModified + (i * 2), "%02x", (int)Hash[i]);
    }
    
    strcpy (Dest, "sha256$");
    strcat (Dest, Salt);
    strcat (Dest, "$");
    strcat (Dest, DigestSrcModified);
    
    return (KORE_RESULT_OK);
}



int CheckEncrypted (const char *Original, const char *Crypted)
{
    
    return (KORE_RESULT_OK);
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
    
    if (http_argument_get_string (Req, "Data", Data) == KORE_RESULT_ERROR)
    {
        JsonObjectObjectAdd (JsonMsg, "Result", JsonObjectNewInt (KORE_RESULT_ERROR));
        JsonObjectObjectAdd (JsonMsg, "Message", JsonObjectNewString ("parameter data not found"));
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
    
    JsonObjectObjectAdd (JsonMsg, "result", JsonObjectNewInt (Result));
    JsonObjectObjectAdd (JsonMsg, "data", JsonObjectNewString (Msg));
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



//SQL state
struct SqlState NewSQLState (int Result, const char *Msg)
{
    struct SqlState State;
    State.Result = Result;
    State.Msg = Msg;
    
    return State;
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



//upload_file
int UploadFile (struct HttpRequest *Req, char *Name, char *SubPath)
{
    struct HttpFile *file = NULL;
    
    if ((file = http_file_lookup (Req, Name)) == NULL)
    {
        HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, "File not found");
        return (KORE_RESULT_OK);
    }
    
    char *DocumentsExt[] = {"txt", "pdf", "ps", "rtf", "wps", "xml", "xps", "odt", "doc", "docm", "docx", "dot", "dotm", "dotx", "csv", "dbf", "DIF", "ods", "prn", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsl", "xlsx", "xlt", "xltm", "xltx", "xlw", "xps", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"};
    size_t LengthDocumentsExt = sizeof (DocumentsExt) / sizeof (DocumentsExt[0]);
    
    char *MusicExt[] = {"mp3", "ogg", "wav", "flac", "pcm", "aiff", "au", "raw", "aac", "mp4a", "wma"};
    size_t LengthMusicExt = sizeof (MusicExt) / sizeof (MusicExt[0]);
    
    char *PicturesExt[] = {"jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"};
    size_t LengthPicturesExt = sizeof (PicturesExt) / sizeof (PicturesExt[0]);
    
    char *VideosExt[] = {"mpeg", "vob", "3gp", "mov", "mp4", "webm", "flv", "mkv", "avi", "ogm"};
    size_t LengthVideosExt = sizeof (VideosExt) / sizeof (VideosExt[0]);
    
    char path[128];
                  
    strcpy (path, "../share/");
    strcat (path, SubPath); 

    unsigned int i = 0;
    char ext[8] = ".";
    char *type = NULL;
    int TypeFound = 0;
    
    for (i = 0; i < LengthDocumentsExt; i++)
    {
        if (strstr (file->filename, strcat (ext, DocumentsExt[i])) != NULL)
        {
            type = DocumentsExt [i];
            strcat (path, "documents/");
            TypeFound = 1;
            break;
        }
        strcpy (ext, ".");
    }
    
    if (!TypeFound)
    {
        for (i = 0; i < LengthMusicExt; i++)
        {
            if (strstr (file->filename, strcat (ext, MusicExt[i])) != NULL)
            {
                type = MusicExt [i];
                strcat (path, "music/");
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
            if (strstr (file->filename, strcat (ext, PicturesExt[i])) != NULL)
            {
                type = PicturesExt [i];
                strcat (path, "images/");
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
            if (strstr (file->filename, strcat (ext, VideosExt[i])) != NULL)
            {
                type = VideosExt [i];
                strcat (path, "videos/");
                TypeFound = 1;
                break;
            }
            strcpy(ext, ".");
        }
    }
    
    if (!TypeFound)
    {
        HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, "File Type Not Supported");
        return (KORE_RESULT_ERROR);
    }

    strcat (path, file->filename);
    
    int fd = open (path, O_CREAT | O_TRUNC | O_WRONLY, 0644);
    
    if (fd == -1)
    {
        HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, "Error Open File Descriptor");
        return (KORE_RESULT_ERROR);
    }
    
    u_int8_t            buf[BUFSIZ];
    ssize_t             ret, written;
    
    ret = KORE_RESULT_ERROR;
    
    for(;;)
    {
        ret = http_file_read (file, buf, sizeof(buf));
        
        if (ret == -1)
        {
            HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, "Failed To Read From File");
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
	    strcat (tmpmsg, file->filename);
	    strcat (tmpmsg, errno_s);
            HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, tmpmsg);
            goto cleanup;
        }
        
        
        if (written != ret)
        {
            HttpResponseJsonMsg (Req, KORE_RESULT_ERROR, "Partial Write On File");
            goto cleanup;
        }
    }
    
    ret = KORE_RESULT_OK;
    
    cleanup:
        if (close (fd) == -1)
        {
            kore_log (LOG_WARNING, "close(%s) %s", file->filename, errno_s);
        }
        
        if (ret == KORE_RESULT_ERROR)
        {
            if (unlink (file->filename) == -1)
            {
                kore_log (LOG_WARNING, "unlink(%s): %s", file->filename, errno_s);
            }
            
            ret = KORE_RESULT_OK;
        }
        return (KORE_RESULT_ERROR);
    
    return (KORE_RESULT_OK);
}