import React, { useState, useEffect } from 'react';
import Service from '../utils/http';
import { Anchor, Table, Text, Group, Tooltip  } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash  } from '@tabler/icons-react';

const Myurls = () => {
    const service = new Service();
    const [data,setData]=useState(null);
    const getData = async () =>{
        try {  
            const response = await service.get("user/my/urls");
            console.log(response);
            setData(response.data);
        }catch(err){
            console.log(err);
        } 
    }
    useEffect(() => {
        getData() ;
    },[]) 
  return (
    <div>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Original URL</Table.Th>
                    <Table.Th>Short Code</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data && data.map((d) => (  
                    <Table.Tr key={d._id}>
                        <Table.Td>
                            <Text>{d?.title || "NA" } </Text>
                        </Table.Td>
                        <Table.Td>
                            <Anchor href={d?.originalUrl} target="_blank">
                                {d?.originalUrl}
                            </Anchor>  
                        </Table.Td>
                        <Table.Td>
                            <Anchor href={`${service.getBaseURL()}/api/s/${d?.shortCode}`} target="_blank">  
                                {d?.shortCode}
                            </Anchor>
                             
                        </Table.Td>
                        <Table.Td>{d.clickCount}</Table.Td>
                        <Table.Td>{ new Date(d.createdAt).toLocaleDateString()}</Table.Td>
                        <Table.Td>
                                    <span >
                                        {d?.isActive ? "Active" : "Inactive"}
                                    </span>
                                </Table.Td>
                          <Table.Td >
                                    <Text>{d?.clickCount  || 0}</Text>
                                </Table.Td>
 <Table.Td>
                                    <Text>{(d?.createdAt)}</Text>
                                </Table.Td>
                                <Table.Td >
                                    <Text>{(d?.expiresAt)}</Text>
                                </Table.Td>

                                                            <Table.Td >
                                    <Group gap="xs">
                                        <Tooltip label="Edit" withArrow>
                                            <ActionIcon variant="light" color="blue">
                                                <IconEdit size={18} />
                                            </ActionIcon>
                                        </Tooltip>
                                        <Tooltip label="Delete" withArrow>
                                            <ActionIcon variant="light" color="red">
                                                <IconTrash size={18} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>
                                </Table.Td>
                            

                    </Table.Tr>
                ))}
            </Table.Tbody>
            
        </Table> 


    </div>
  )
}

export default Myurls