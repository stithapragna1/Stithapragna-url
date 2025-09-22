import React, { useEffect, useState } from 'react'
import Service from '../utils/http';
import { Card, Image, Text, Badge, Button, Group, Avatar, Center } from '@mantine/core';

const Profile = () => {

    const [data, setData] = useState(null);
    const service = new Service();

    const getData = async () => {
        const response = await service.get('user/me');
        console.log(response);
        setData(response.data);

    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <Center>
            <div style={{ height: '40rem', width: '20rem', justifyContent: "center", alignItems: "center" }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '20rem' }}>
                    <Card.Section style={{
                        display: 'flex',
                        justifyContent: 'center', // center avatar horizontally inside card section
                        marginTop: '1rem',
                    }}>
                        <Avatar
                            src={data?.avatar}

                        />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>Name:{data?.name}</Text>
                        <Text fw={500}>Email:{data?.email}</Text>
                        <Text fw={500}>role:{data?.role}</Text>
                    </Group>

                </Card>

            </div>
        </Center>
    )
}

export default Profile;