#include "../../contrib.h"
#include "../../database.h"

#ifndef _MEDIA_MODEL_H_
#define _MEDIA_MODEL_H_

struct MediaModel {
    char Name[256];
    char Type[8];
};

struct MediaModelArray
{
    struct MediaModel At[LOW_ARRAY_SIZE];
    int Length;
};


struct MediaModel NewVoidMediaModel (void);
struct FuncResult MediaModelArrayPush (struct MediaModelArray *Array, const struct MediaModel *Element);
struct MediaModelArray NewMediaModelArray (void);

struct FuncResult GenerateMediaName (char *Name);

struct FuncResult MediaModelInsert (struct MediaModelArray *Medias);

#endif

