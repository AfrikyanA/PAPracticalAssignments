#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* concat(const char* str1, const char* str2){
    if (str1 == NULL && str2 == NULL){
        return NULL;
    }

    if (str1 == NULL){
        return strdef(str2);
    }
    if (str2 == NULL){
        return strdef(str1);
    }

    str len1 = strlen(str1);
    str len2 = strlen(str2);

    char* result = malloc((len1 + len2 + 2) * sizeof(char));
    if (result == NULL){
        exit(1);
    }

    strcpy(result, str1);
    strcpy(result, " ");
    strcpy(result, str1);

    return result;
}

int includes(const char* str1, const char* substring){
    if (str1 == NULL || value == NULL){
        return 0;
    }

    return strstr(str, substring) != NULL;
}

int endsWith(const char* str, const char* suffix){
    if (str == NULL || suffix == NULL) {
        return 0;
    }

    size_t len = strlen(str);
    size_t suffixLen = strlen(suffix);

    if (suffixLen > len){
        return 0;
    }

    return strcmp(str + (len - suffixLen), suffix) == 0;
}

int startsWith(const char* str, const char* prefix){
    if (str == NULL || suffix == NULL) {
        return 0;
    }

    size_t len = strlen(str);
    size_t prefixLen = strlen(prefix);

    if (prefixLen > len){
        return 0;
    }

    return strncmp(str, prefix, prefixLen) == 0;
}

int indexOf(const char* str, char value){
    if (str == NULL){
        return -1;
    }

    for (int i = 0; i != '\0'; ++i){
        if (str[i] == value){
            return i;
        }
    }
    return -1;
}

int lastIndexOf(const char* str, char value){
    if (str == NULL){
        return -1;
    }

    int index = -1;
    for (int i = 0; i != '\0'; ++i){
        if (str[i] == value){
            index = i;
        }
    }
    return index;
}

char* replace(const char* str, const char* oldValue, const char* newValue) {
    if (str == NULL || oldValue == NULL || newValue == NULL) {
        return NULL;
    }

    const char* pos = strstr(str, oldValue);
    if (pos == NULL) {
        return strdup(str);
    }

    size_t newLen = strlen(str) - strlen(oldValue) + strlen(newValue);
    char* result = malloc(newLen + 1);
    if (result == NULL) {
        return NULL;
    }

    size_t prefixLen = pos - str;
    strncpy(result, str, prefixLen);
    result[prefixLen] = '\0';

    strcat(result, newValue);
    strcat(result, pos + strlen(oldValue));

    return result;
}

char* replaceAll(const char* str, const char* oldValue, const char* newValue) {
    if (str == NULL || oldValue == NULL || newValue == NULL) {
        return NULL;
    }

    int count = 0;
    const char* temp = str;
    while ((temp = strstr(temp, oldValue)) != NULL) {
        count++;
        temp += strlen(oldValue);
    }

    size_t newLen = strlen(str) - (count * strlen(oldValue)) + (count * strlen(newValue));
    char* result = malloc(newLen + 1);
    if (result == NULL) {
        return NULL;
    }

    char* currentPos = result;
    while (*str) {
        if (strstr(str, oldValue) == str) {
            strcpy(currentPos, newValue);
            currentPos += strlen(newValue);
            str += strlen(oldValue);
        } else {
            *currentPos++ = *str++;
        }
    }
    *currentPos = '\0';

    return result;
}

int search(const char* str, const char* value) {
    if (str == NULL || value == NULL) {
        return -1;
    }

    const char* pos = strstr(str, value);
    if (pos != NULL) {
        return pos - str;
    }

    return -1;
}

char* slice(const char* str, int start, int end) {
    if (str == NULL || start < 0 || end < start || start >= strlen(str)) {
        return NULL;
    }

    if (end > strlen(str)) {
        end = strlen(str);
    }

    size_t length = end - start;
    char* result = malloc(length + 1);
    if (result == NULL) {
        return NULL;
    }

    strncpy(result, str + start, length);
    result[length] = '\0';

    return result;
}

char** split(const char* str, const char* delimiter, int* count) {
    if (str == NULL || delimiter == NULL || count == NULL) {
        return NULL;
    }

    char* temp = strdup(str);
    char* token = strtok(temp, delimiter);
    char** result = NULL;
    *count = 0;

    while (token != NULL) {
        result = realloc(result, (*count + 1) * sizeof(char*));
        if (result == NULL) {
            free(temp);
            return NULL;
        }
        result[*count] = strdup(token);
        (*count)++;
        token = strtok(NULL, delimiter);
    }

    free(temp);
    return result;
}

char* substring(const char* str, int start, int end) {
    if (str == NULL || start < 0 || end < start || start >= strlen(str)) {
        return NULL;
    }

    if (end > strlen(str)) {
        end = strlen(str);
    }

    size_t length = end - start;
    char* result = malloc(length + 1);
    if (result == NULL) {
        return NULL;
    }

    strncpy(result, str + start, length);
    result[length] = '\0';

    return result;
}

char* substr(const char* str, int start, int length) {
    if (str == NULL || start < 0 || length < 0 || start >= strlen(str)) {
        return NULL;
    }

    if (start + length > strlen(str)) {
        length = strlen(str) - start;
    }

    char* result = malloc(length + 1);
    if (result == NULL) {
        return NULL;
    }

    strncpy(result, str + start, length);
    result[length] = '\0';

    return result;
}

char* toLowerCase(const char* str) {
    if (str == NULL) {
        return NULL;
    }

    size_t len = strlen(str);
    char* result = malloc(len + 1);
    if (result == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < len; i++) {
        result[i] = tolower(str[i]);
    }
    result[len] = '\0';

    return result;
}

char* toUpperCase(const char* str) {
    if (str == NULL) {
        return NULL;
    }

    size_t len = strlen(str);
    char* result = malloc(len + 1);
    if (result == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < len; i++) {
        result[i] = toupper(str[i]);
    }
    result[len] = '\0';

    return result;
}

char* trim(const char* str) {
    if (str == NULL) {
        return NULL;
    }

    const char* end;
    while (*str == ' ') str++;
    end = str + strlen(str) - 1;
    while (end > str && *end == ' ') end--;

    size_t len = end - str + 1;
    char* result = malloc(len + 1);
    if (result == NULL) {
        return NULL;
    }

    strncpy(result, str, len);
    result[len] = '\0';

    return result;
}

char* trimStart(const char* str) {
    if (str == NULL) {
        return NULL;
    }

    while (*str == ' ') str++;

    size_t len = strlen(str);
    char* result = malloc(len + 1);
    if (result == NULL) {
        return NULL;
    }

    strcpy(result, str);

    return result;
}

char* trimEnd(const char* str) {
    if (str == NULL) {
        return NULL;
    }

    const char* end = str + strlen(str) - 1;
    while (end > str && *end == ' ') end--;

    size_t len = end - str + 1;
    char* result = malloc(len + 1);
    if (result == NULL) {
        return NULL;
    }

    strncpy(result, str, len);
    result[len] = '\0';

    return result;
}

char* padStart(const char* str, size_t length, const char* padString) {
    if (str == NULL || padString == NULL) {
        return NULL;
    }

    size_t strLen = strlen(str);
    if (strLen >= length) {
        return strdup(str);
    }

    size_t padLen = length - strLen;
    size_t padStringLen = strlen(padString);
    char* result = malloc(length + 1);
    if (result == NULL) {
        return NULL;
    }

    size_t i;
    for (i = 0; i < padLen; i++) {
        result[i] = padString[i % padStringLen];
    }
    strcpy(result + padLen, str);
    result[length] = '\0';

    return result;
}

char* padEnd(const char* str, size_t length, const char* padString) {
    if (str == NULL || padString == NULL) {
        return NULL;
    }

    size_t strLen = strlen(str);
    if (strLen >= length) {
        return strdup(str);
    }

    size_t padLen = length - strLen;
    size_t padStringLen = strlen(padString);
    char* result = malloc(length + 1);
    if (result == NULL) {
        return NULL;
    }

    strcpy(result, str);
    for (size_t i = strLen; i < length; i++) {
        result[i] = padString[(i - strLen) % padStringLen];
    }
    result[length] = '\0';

    return result;
}

char* repeat(const char* str, size_t count) {
    if (str == NULL) {
        return NULL;
    }

    size_t strLen = strlen(str);
    if (count == 0) {
        return strdup("");
    }

    char* result = malloc(strLen * count + 1);
    if (result == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < count; i++) {
        strcpy(result + i * strLen, str);
    }
    result[strLen * count] = '\0';

    return result;
}