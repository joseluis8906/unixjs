#include <kore/http.h>
#include <kore/kore.h>
#include <json-c/json.h>
#include <zdb/zdb.h>

#ifndef _DEFINES_H_
#define _DEFINES_H_

#define REDIS_IP "127.0.0.1"
#define REDIS_PORT 6379

#define LOW_ARRAY_SIZE 256
#define MID_ARRAY_SIZE 512
#define HIGHT_ARRAY_SIZE 1024

//redefines kore lib defines
//types
#define HttpRequest http_request
#define HttpResponse http_response
#define HttpRequestHeader http_request_header
#define HttpResponseHeader http_response_header
#define HttpFile http_file
//functions
#define HttpFileLookup http_file_lookup
#define HttpFileRead http_file_read
#define HttpPopulatePost http_populate_post
#define HttpPopulateMultipartForm http_populate_multipart_form

//redefines json lib defines
//types
#define JsonObject  json_object
#define JsonTypeNull json_type_null
#define JsonTypeBoolean  json_type_boolean
#define JsonTypeDouble json_type_double
#define JsonTypeInt json_type_int
#define JsonTypeString json_type_string
#define JsonTypeObject json_type_object
#define JsonTypeArray json_type_array
//functions
#define JsonObjectNewObject json_object_new_object
#define JsonObjectNewArray json_object_new_array
#define JsonObjectObjectAdd json_object_object_add
#define JsonObjectObjectForeach json_object_object_foreach
#define JsonObjectNewInt json_object_new_int
#define JsonObjectNewInt64 json_object_new_int64
#define JsonObjectNewString json_object_new_string
#define JsonObjectNewObject json_object_new_object
#define JsonObjectGetInt  json_object_get_int
#define JsonObjectGetInt64 json_object_get_int64
#define JsonObjectGetString json_object_get_string
#define JsonObjectGetDouble json_object_get_double
#define JsonObjectGetType json_object_get_type
#define JsonObjectToJsonString json_object_to_json_string
#define JsonObjectPut json_object_put
#define JsonTokenerParse json_tokener_parse
#define JsonObjectArrayLength json_object_array_length
#define JsonObjectArrayAdd json_object_array_add
#define JsonObjectGet json_object_get



#endif 

