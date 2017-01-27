/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   upload_file.h
 * Author: joseluis
 *
 * Created on January 26, 2017, 10:10 PM
 */

#include "models/contrib/media_model.h"

#ifndef _UPLOAD_FILE_H_
#define _UPLOAD_FILE_H_

struct HttpFileArray
{
    struct HttpFile *At[LOW_ARRAY_SIZE];
    int Length;
};

//http files
struct HttpFileArray NewHttpFileArray (void);
struct FuncResult FindFiles (struct HttpRequest *Req, struct StringArray *Names, struct HttpFileArray *Files);
struct FuncResult UploadFile (struct HttpFile *File, struct MediaModel *Model, char *SubPath);

#endif /* UPLOAD_FILE_H */

