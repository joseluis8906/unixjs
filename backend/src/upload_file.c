/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#include "upload_file.h"

struct HttpFileArray NewHttpFileArray (void)
{
    struct HttpFileArray X;
    X.Length = 0;
    
    return X;
}



struct FuncResult FindFiles (struct HttpRequest *Req, struct StringArray *Names, struct HttpFileArray *Files)
{
    struct FuncResult X = NewFuncResult (KORE_RESULT_OK, "File Found");
    
    int i = 0;
    for (i = 0; i < Names->Length; i++)
    {
        if ((Files->At[i] = HttpFileLookup (Req, Names->At[i])) == NULL)
        {
            X.Result = KORE_RESULT_ERROR;
            strcpy (X.Msg, "File Not Found");
            return X;
        }
        Files->Length = i+1;
    }
    return X;
}



//upload_File
struct FuncResult UploadFile (struct HttpFile *File, struct MediaModel *Model, char *SubPath)
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
    
    strcpy (Model->Type, type);
    strcat (Path, Model->Name);
    strcat (Path, ext);
    
    struct MediaModelArray Medias = NewMediaModelArray ();
    MediaModelArrayPush (&Medias, Model);
    
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



