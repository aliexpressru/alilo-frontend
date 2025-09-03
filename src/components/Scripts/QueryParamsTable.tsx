import {
    useForm as useFormMantine,
} from '@mantine/form';

import {
    Container as ContainerMantine,
    Button as ButtonMantine,
    TextInput as TextInputMantine,
    Group as GroupMantine
} from '@mantine/core';

import { IconButton } from '../shared/Buttons/IconButton';
import { Trash } from '../../assets/svg';
import { QueryParam } from '../../types/ScriptTypes';


type QueryParamsTableProps = {
    data: QueryParam[];
    updateData: (newRecorods: QueryParam[]) => void;
}

export const QueryParamsTable: React.FC<QueryParamsTableProps> = (
    { data, updateData: onChangeRec }
) => {

    const form = useFormMantine({
        initialValues: {
            queryParams: data,
        }
    });

    const handleAddQueryParam = () => {
        form.insertListItem('queryParams', { key: '', value: '' });
    };

    const handleRemoveQueryParam = (index: number) => {
        form.removeListItem('queryParams', index);
        handleChangeItem();
    };

    const handleChangeItem = () => {
        // const rec: Record<string, string> = {};
        // eslint-disable-next-line no-return-assign
        // form.getValues().headers.map((h) => rec[h.name] = h.value);
        onChangeRec(
            form.getValues().queryParams
        );
    };

    return (
        <ContainerMantine>
            <form
                onChange={handleChangeItem}
            >
                {
                    form.getValues().queryParams.map((_, idx) =>
                        <GroupMantine key={idx}>
                            <TextInputMantine
                                radius="md"
                                size="md"
                                key={form.key(`queryParams.${idx}.key`)}
                                {...form.getInputProps(`queryParams.${idx}.key`, { type: 'input' })}
                            />
                            <TextInputMantine
                                radius="md"
                                size="md"
                                key={form.key(`queryParams.${idx}.value`)}
                                {...form.getInputProps(`queryParams.${idx}.value`, { type: 'input' })}
                            />
                            <IconButton
                                icon={Trash}
                                iconProps={{ size: "l" }}
                                onClick={() => handleRemoveQueryParam(idx)}
                            />
                        </GroupMantine>
                    )
                }
                <ButtonMantine variant="default" onClick={handleAddQueryParam}>+ param</ButtonMantine>
            </form>
        </ContainerMantine>
    );
};
