import { GetTreeObjectsResponse, LocationBucket, UploadBucket, Usage } from "../../types/FileTypes";
import { http } from "../../axios";

class FilesService {
    async upload(name: string, path: string, file: File) {
        const fileBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(fileBuffer);
        const base64Data = btoa(String.fromCharCode(...bytes));
        const fullPath = path === name ? name : path;
        const { data } = await http.post<UploadBucket>(
            `/v1/s3/uploadFile`,
            {
                name: fullPath,
                path,
                contentType: file.type,
                data: base64Data
            },
            {
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            }
        );
        return data;
    }

    async getBucketList(): Promise<GetTreeObjectsResponse> {
        const { data } = await http.post<GetTreeObjectsResponse>(
            `/v1/s3/getBucketList`
        );

        return data;
    }

    async getBucketLocation(bucket: string) {
        const { data } = await http.get<LocationBucket>(
            `/api/location/bucket/${bucket}`
        );

        return data;
    }

    async deleteFile(bucket: string, path: string) {
        const { data } = await http.post<Usage>(
            `/api/delete/file`,
            {
                bucketName: bucket,
                path,
            },
        );

        return data;
    }

}

export const filesService = new FilesService();
