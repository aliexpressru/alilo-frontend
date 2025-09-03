import { useCallback, useEffect, useState } from 'react';
import { ObjectNode, ObjectType } from "../../types/FileTypes";
import { filesService } from "../../services/api/filesService";
import TableFiles from "../../components/Files/FilesTable/TableFiles";
import { Page } from "../../components/shared/Page";

const FilesPage = () => {
    const [node, setNode] = useState<ObjectNode>();
    const [bucketName, setBucketName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleListBucket = useCallback(() => {
        setIsLoading(true);
        filesService
            .getBucketList()
            .then((response) => {
                setNode(response.result);
                setBucketName(response.bucket_name);
            })
            .catch(() => setNode({
                name: '-',
                children: [],
                path: '-',
                level: 0,
                type: ObjectType.Root,
            }))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        handleListBucket();
    }, [handleListBucket]);

    return (
        <>
            <Page
                title={"Files"}
                loading={isLoading}>
                <TableFiles
                    data={node?.children ?? []}
                    bucket={bucketName}
                    callback={handleListBucket}
                />
            </Page>
        </>
    );
};

export { FilesPage };


