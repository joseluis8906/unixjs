#ifndef _MEDIA_MODEL_
#define _MEDIA_MODEL_

typedef struct {
    char name[32];
    char type[8];
} media_model_t;

media_model_t   new_media_model (void);

#endif
