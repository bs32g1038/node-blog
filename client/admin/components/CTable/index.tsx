import { Table, TableProps } from 'antd';
import React from 'react';

export default function CTable<RecordType extends object = any>(
    props: React.PropsWithChildren<TableProps<RecordType>>
) {
    return (
        <Table
            {...props}
            pagination={{
                ...(props.pagination ?? {}),
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 条数据`,
            }}
        />
    );
}
