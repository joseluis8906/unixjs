#include "../../contrib.h"

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
struct FuncResult MediaModelArrayPush (struct MediaModelArray *Medias, const struct MediaModel *Media);
struct MediaModelArray NewMediaModelArray (void);

struct FuncResult MediaModelInsert (struct MediaModelArray *Medias);

#endif

