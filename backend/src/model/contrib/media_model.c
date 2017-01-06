#include <string.h>
#include "media_model.h"

media_model_t  new_media_model (void)
{
    media_model_t x;
    strcpy (x.name, "");
    strcpy (x.type, "");
    
    return x;
}


