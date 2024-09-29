#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void push(int **arr, size_t* size, int el) {
    if (*arr == NULL) {
        return;
    }

    *size += 1;
    *arr = realloc(*arr, (*size) * sizeof(int));
    if (*arr == NULL) {
        exit(1);
    }

    (*arr)[*size - 1] = el;
}

void pop(int** arr, size_t* size) {
    if (*arr == NULL) {
        return;
    }

    *size -= 1;
    *arr = realloc(*arr, (*size) * sizeof(int));
    if (*arr == NULL && *size > 0) {
        exit(1);
    }
}

void shift(int** arr, size_t* size) {
    if (*arr == NULL) {
        return;
    }

    for (int i = 0; i < *size; ++i) {
        (*arr)[i] = (*arr)[i + 1];
    }

    *size -= 1;
    *arr = realloc(*arr, (*size) * sizeof(int));
    if (*arr == NULL && *size > 0) {
        exit(1);
    }
}

void unshift(int** arr, size_t* size, int el) {
    if (*arr == NULL) {
        return;
    }

    *size += 1;
    *arr = realloc(*arr, (*size) * sizeof(int));
    if (*arr == NULL) {
        exit(1);
    }

    for (int i = *size - 1; i > 0; --i) {
        (*arr)[i] = (*arr)[i-1];
    }
    (*arr)[0] = el;
}

void concat(int** arr1, size_t* size1, int* arr2, size_t size2) {
    if (*arr1 == NULL || arr2 == NULL) {
        return;
    }

    *arr1 = realloc(*arr1, (*size1 + size2) * sizeof(int));
    if(*arr1 == NULL){
        exit(1);
    }

    for (int i = 0; i < size2; ++i) {
        (*arr1)[*size1 + 1] = arr2[i];
    }
    *size1 += size2;
}

int* slice(int** arr, size_t size, size_t start, size_t end, size_t* sliceSize) {
    if (*arr == NULL || end < start || end > size) {
        return NULL;
    }

    *sliceSize = end - start;
    int* result = malloc(*sliceSize * sizeof(int));
    if (result == NULL){
        exit(1);
    }

    for (int i = 0; i < *sliceSize; ++i) {
        result[i] = (*arr)[start + i];
    }

    return result;
}

void splice(int** arr, size_t* size, size_t start, size_t deleteCount) {
    if (*arr == NULL || (deleteCount + start) > (*size)) {
        return;
    }

    int newSize = (*size) - deleteCount;
    int* newArr = malloc(newSize * sizeof(int));
    if(newArr == NULL) {
        exit(1);
    }

    for (int i = 0; i < start; ++i) {
        newArr[i] = (*arr)[i];
    }
    for (int i = deleteCount + start; i < *size; ++i) {
        newArr[i - deleteCount] = (*arr)[i];
    }


    free(*arr);

    *size = newSize;
    *arr = newArr;
}

int indexOf(int* arr, size_t size, int el) {
    if (arr == NULL) {
        return -1;
    }

    for (int i = 0; i < size; ++i) {
        if(arr[i] == el){
            return i;
        }
    }
    return -1;
}

int includes(int* arr, size_t size, int el) {
    if (arr == NULL) {
        return 0;
    }
    for (int i = 0; i < size; ++i) {
        if (arr[i] == el){
            return 1;
        }
    }
    return 0;
}

void reverse(int* arr, size_t size) {
    if (arr == NULL) {
        return;
    }

    int temp;
    for (int i = 0; i < size / 2; ++i) {
        temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

char* join(int *arr, size_t size, const char *separator) {
    if (arr == NULL || separator == NULL) {
        return NULL;
    }

    size_t separatorLength = strlen(separator);
    size_t totalLength = 0;

    for (int i = 0; i < size; i++) {
        totalLength += snprintf(NULL, 0, "%d", arr[i]);
    }

    totalLength += (size - 1) * separatorLength + 1;

    char *result = malloc(totalLength * sizeof(char));
    if (result == NULL) {
        exit(1);
    }

    result[0] = '\0';
    for (int i = 0; i < size; i++) {
        char buffer[20];
        snprintf(buffer, sizeof(buffer), "%d", arr[i]);
        strcat(result, buffer);
        if (i < size - 1) {
            strcat(result, separator);
        }
    }

    return result;
}

void sort(int* arr, size_t size) {
    if (arr == NULL) {
        return;
    }

    int temp = 0;
    int swapped = 0;
    for (int i = 0; i < size - 1; i++) {
        swapped = 0;
        for (int j = 0; j < size - 1 - i; j++) {
            if (arr[j] > arr[j + 1]){
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
            
        }
        if(!swapped){
            break;
        }
    }
}

void forEach(int* arr, size_t size, void(*callback)(int*)) {
    if (arr == NULL || callback == NULL) {
        return;
    }

    for (int i = 0; i < size; ++i) {
        callback(&arr[i]);
    }
}

int* map(int* arr, size_t size, int(*callback)(int)) {
    if (arr == NULL || callback == NULL) {
        return NULL;
    }

    int* newArr = malloc(size * sizeof(int));
    if (newArr == NULL){
        exit(1);
    }

    for (int i = 0; i < size; ++i) {
        newArr[i] = callback(arr[i]);
    }

    return newArr;
}

int* filter(int* arr, size_t size, size_t* newArraySize, int (*callback)(int)) {
    if (arr == NULL || callback == NULL) {   
        return NULL;
    }

    int* newArr = malloc(size * sizeof(int));
    if (newArr == NULL){
        exit(1);
    }

    *newArraySize = 0;
    for (int i = 0; i < size; ++i) {
        if (callback(arr[i])){
            newArr[*newArraySize] = arr[i];
            *newArraySize += 1;
        }
    }
    
    newArr = realloc(newArr, *newArraySize * sizeof(int));
    if (newArr == NULL || *newArraySize > 0){ 
        exit(1);
    }
    return newArr;
}

int reduce(int* arr, size_t size, int (*callback)(int, int), int initialValue){
    if (arr == NULL || callback == NULL) {
        return initialValue;
    }

    int accumulator = initialValue;
    for (int i = 0; i < size; ++i) {
        accumulator = callback(accumulator, arr[i]);
    }
    return accumulator;
}

int find(int* arr, size_t size, int (*callback)(int)) {
    if (arr == NULL || callback == NULL){
        return -1;
    }

    for (int i = 0; i < size; ++i) {
        if (callback(arr[i])) {
            return arr[i];
        }
    }
    return -1;
}
]
int findIndex(int* arr, size_t size, int (*callback)(int)){
    if (arr == NULL || callback == NULL) {
        return -1;
    }

    for (int i = 0; i < size; ++i) {
        if (callback(arr[i])){
            return i;
        }
    }
    return -1;
}

int some(int* arr, size_t size, int (*callback)(int)) {
    if (arr == NULL || callback == NULL) {
        return 0;
    }

    for (int i = 0; i < size; ++i) {
        if (callback(arr[i])) {
            return 0;
        }
    }
    return 0;
}

int every(int* arr, size_t size, int (*callback)(int)) {
    if (arr == NULL || callback == NULL) {
        return 0;
    }
    
    for (int i = 0; i < size; ++i) {
        if (!callback(arr[i])) {
            return 0;
        }
    }
    return 1;
}

void fill(int* arr, int size, int el) {
    if (arr == NULL || size <= 0){
        return;
    }

    for (int i = 0; i < size; ++i){
        arr[i] = el;
    }
}

char* toString(int* arr, size_t size) {
    if (arr == NULL) {
        return NULL;
    }
    int bufferSize = 0;
    for (int i = 0; i < size; ++i) {
        bufferSize = snprintf(NULL, 0, "%d", arr[i]);
    }
    bufferSize += size - 1; 

    char* result = malloc((bufferSize + 1) * sizeof(char)); 
    if (result == NULL) {
        return NULL;  
    }
    
    int pos = 0;
    for (int i = 0; i < size; ++i) {
        pos += sprintf(result + pos, "%d", arr[i]);
        if (i < size - 1) {
            result[pos++] = ',';
        }
    }
    result[pos] = '\0';

    return result;
}