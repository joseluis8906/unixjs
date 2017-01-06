#ifndef _VARIABLE_MODEL_
#define _VARIABLE_MODEL_

typedef struct {
    char name[32];
    unsigned long long val_int;
    char val_text[256];
} variable_model_t;

variable_model_t new_variable_model (void);

#endif
