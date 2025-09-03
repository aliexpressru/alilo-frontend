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


type HeadersTableProps = {
    data: Record<string, string>;
    updateData: (newRecrod: Record<string, string>) => void;
}

export const HeadersTable: React.FC<HeadersTableProps> = (
    { data, updateData }
) => {

    const form = useFormMantine({
        initialValues: {
            headers: Object.keys(data).map(
                (k) => ({ name: k, value: data[k] })
            ),
        },
        onValuesChange: (values) => {
            const rec: Record<string, string> = {};
            // eslint-disable-next-line no-return-assign
            values.headers.map((h) => rec[h.name] = h.value);
            updateData(rec);
        }
    });

    const handleAddHeader = () => {
        form.insertListItem('headers', { name: '', value: '' });
    };

    const handleRemoveHeader = (index: number) => {
        form.removeListItem('headers', index);
    };

    return (
        <ContainerMantine>
            {
                form.getValues().headers.map((item, idx) =>
                    <GroupMantine key={item.name}>
                        <TextInputMantine
                            radius="md"
                            size="md"
                            key={form.key(`headers.${idx}.name`)}
                            {...form.getInputProps(`headers.${idx}.name`, { type: 'input' })}
                        />
                        <TextInputMantine
                            radius="md"
                            size="md"
                            key={form.key(`headers.${idx}.value`)}
                            {...form.getInputProps(`headers.${idx}.value`, { type: 'input' })}
                        />
                        <IconButton
                            icon={Trash}
                            iconProps={{ size: "l" }}
                            onClick={() => handleRemoveHeader(idx)}
                        />
                    </GroupMantine>
                )
            }
            <ButtonMantine variant="default" onClick={handleAddHeader}>+ header</ButtonMantine>
        </ContainerMantine>
    );
};
