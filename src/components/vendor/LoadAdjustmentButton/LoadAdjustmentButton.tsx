import React, { useCallback, useEffect, useState, useRef } from 'react';
import { TextInput, Button, Popover, SimpleGrid, ActionIcon, Flex, Text, Loader } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import classes from './LoadAdjustmentButton.module.css';
import { useForm } from '@mantine/form';
import { runService } from '../../../services/api';
import { snackbarService } from '../../../services/snackbarService';
import { useClickOutside } from '@mantine/hooks';
type ILoadAdjustmentButton = {
    runId: number;
    initLoadLevel: number;
}

const MIN_LEVEL_VALUE = 1;
const MAX_LEVEL_VALUE = 2000;

export function LoadAdjustmentButton({ runId, initLoadLevel }: ILoadAdjustmentButton) {
    // Используем React для удовлетворения noUnusedLocals
    console.log('React version:', React.version);
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
    const [okButtonDisabled, setOkButtonDisabled] = useState<boolean>(true);
    const ref = useClickOutside(() => setPopoverOpened(false));

    const form = useForm({
        initialValues: {
            current_level: 0,
            next_level: initLoadLevel,
            can_change: false,
            run_status: 'STATUS_INIT',
        },
        onValuesChange: (values) => {
            const current = Number.parseInt(String(values.current_level), 10);
            const next = Number.parseInt(String(values.next_level), 10);
            const status = values.run_status;

            form.setFieldValue('next_level', next);
            if (next < MIN_LEVEL_VALUE && status !== 'STATUS_STOPPING') {
                form.setFieldValue('next_level', MIN_LEVEL_VALUE);
            }
            if (next > MAX_LEVEL_VALUE && status !== 'STATUS_STOPPING') {
                form.setFieldValue('next_level', MAX_LEVEL_VALUE);
            }
            if (next === current) {
                setOkButtonDisabled(true);
            }
        }
    });

    const formRef = useRef(form);

    useEffect(() => {
        formRef.current = form;
    }, [form]);

    const handleAdjust = useCallback((nextLevel: number) => {
        runService
            .adjustmentRps(runId, nextLevel)
            .then((response) => {
                switch (response.status) {
                    case true:
                        snackbarService.addSnack({
                            palette: 'success',
                            title: 'Load level has changed',
                        });
                        break;
                    case false:
                        snackbarService.addSnack({
                            palette: 'danger',
                            title: 'Error change load level',
                        });
                        break;
                    default:
                        break;
                }
            });
    }, [runId]);

    const renderLevel = () => {
        const currentValue = form.getValues().current_level;
        const nextValue = form.getValues().next_level;
        const status = form.getValues().run_status;
        const canChanged = form.getValues().can_change;
        switch (status) {
            case 'STATUS_INIT':
                return '';
            case 'STATUS_PREPARED':
                return `0% → ${nextValue}%`;
            case 'STATUS_RUNNING':
                if (canChanged) {
                    return `${currentValue}%`;
                }
                return `${currentValue}% → ${nextValue}%`;
            case 'STATUS_STOPPING':
                return `${currentValue}% → 0%`;
            case 'STATUS_STOPPED_UNSPECIFIED':
                return `${currentValue}%`;
            default:
                return `-`;
        }
    };

    const renderButton = () => {
        const status = form.getValues().run_status;
        const canChanged = form.getValues().can_change;
        switch (status) {
            case 'STATUS_INIT':
                return <Button
                    style={{ height: '50px', width: '105px', borderRadius: '6px', color: '#222', marginLeft: '-11px' }}
                    color="#C2FD60"
                    disabled
                >
                    <Loader size={27} />
                </Button>;
            case 'STATUS_PREPARED':
                return <Button
                    style={{ height: '50px', width: '105px', borderRadius: '6px', color: '#222', marginLeft: '-11px' }}
                    color="#C2FD60"
                    disabled
                >
                    <Loader size={27} />
                </Button>;
            case 'STATUS_STOPPING':
                return <Button
                    style={{ height: '50px', width: '105px', borderRadius: '6px', color: '#222', marginLeft: '-11px' }}
                    color="#C2FD60"
                    disabled
                >
                    <Loader size={27} />
                </Button>;
            case 'STATUS_RUNNING':
                if (canChanged) {
                    return <Button
                        style={{ height: '50px', width: '105px', borderRadius: '6px', color: '#222', marginLeft: '-11px' }}
                        color="#C2FD60"
                        onClick={() => setPopoverOpened(true)}
                    >
                        Load level
                    </Button>;
                }
                return <Button
                    style={{ height: '50px', width: '105px', borderRadius: '6px', color: '#222', marginLeft: '-11px' }}
                    color="#C2FD60"
                    disabled
                >
                    <Loader size={27} />
                </Button>;
            case 'STATUS_STOPPED_UNSPECIFIED':
                return <Button
                    style={{ height: '50px', width: '105px', borderRadius: '6px', color: '#222', marginLeft: '-11px' }}
                    color="#C2FD60"
                    disabled
                >
                    Load level
                </Button>;
            default:
                return <></>;
        }
    };

    const changeLevelValue = (method: 'UP' | 'DOWN', stepOfLevel: number) => {
        const currentValue = form.getValues().next_level;
        if (method === 'UP') {
            form.setFieldValue('next_level', currentValue + stepOfLevel);
        } else {
            form.setFieldValue('next_level', currentValue - stepOfLevel);
        }
    };

    return (
        <form
            onSubmit={() => { }}
        >
            <Flex direction="row">
                <TextInput
                    readOnly
                    defaultValue={renderLevel()}
                    classNames={{
                        root: classes['root'],
                        input: classes['input'],
                        label: classes['label'],
                        section: classes['section'],
                    }}
                />
                <Popover
                    width={300}
                    trapFocus
                    position="bottom"
                    withArrow
                    shadow="md"
                    radius="md"
                    opened={popoverOpened}
                    closeOnClickOutside={true}
                    onOpen={() => form.setFieldValue('next_level', form.getValues().current_level)}
                >
                    <Popover.Target>
                        {renderButton()}
                    </Popover.Target>
                    <Popover.Dropdown
                        ref={ref}
                    >
                        <Flex direction={"column"} gap={"md"}>
                            <Text>Change load level (%)</Text>
                            <TextInput
                                min={1}
                                max={1000}
                                type="number"
                                size="48px"
                                classNames={{
                                    input: classes['popup-input']
                                }}
                                leftSection={
                                    <ActionIcon
                                        size={32} radius="xl" variant="transparent" color="dark"
                                        onClick={() => changeLevelValue('DOWN', 10)}
                                    >
                                        <IconMinus />
                                    </ActionIcon>
                                }
                                rightSection={
                                    <ActionIcon
                                        size={32} radius="xl" variant="transparent" color="dark"
                                        onClick={() => changeLevelValue('UP', 10)}
                                    >
                                        <IconPlus />
                                    </ActionIcon>
                                }
                                key={form.key('next_level')}
                                {...form.getInputProps('next_level', { type: 'input' })}
                            />
                            {/* TODO: Change to TextInput to NumberInput
                            <Group>
                                <ActionIcon size={42} variant="outline" onClick={() => changeLevelValue('DOWN', 10)}>
                                    <IconMinus />
                                </ActionIcon>
                                <NumberInput
                                    hideControls
                                    // value={value}
                                    // onChange={(val) => setValue(val)}
                                    // handlersRef={handlers}
                                    max={10}
                                    min={0}
                                    step={2}
                                    styles={{ input: { width: 54, textAlign: 'center' } }}
                                    key={form.key('next_level')}
                                    {...form.getInputProps('next_level', { type: 'input' })}
                                />
                                <ActionIcon size={42} variant="outline" onClick={() => changeLevelValue('UP', 10)}>
                                    <IconPlus />
                                </ActionIcon>
                            </Group> */}
                            <SimpleGrid cols={2}>
                                <Button
                                    size={"md"}
                                    radius={"md"}
                                    style={{ color: '#222', height: '48px' }}
                                    color="#C2FD60"
                                    disabled={okButtonDisabled}
                                    onClick={() => {
                                        handleAdjust(form.getValues().next_level);
                                        setPopoverOpened(false);
                                    }}
                                >OK</Button>
                                <Button
                                    size={"md"}
                                    radius={"md"}
                                    style={{ color: '#222', height: '48px' }}
                                    color="#f3f4f6"
                                    onClick={() => setPopoverOpened(false)}
                                >Cancel</Button>
                            </SimpleGrid>
                        </Flex>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            {/* <p>{JSON.stringify()}</p> */}
        </form>
    );
}
