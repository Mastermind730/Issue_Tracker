import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'OPEN', color: 'red' },
  IN_PROGRESS: { label: 'In_Progress', color: 'violet' },
  CLOSED: { label: 'CLOSED', color: 'green' },
};

const defaultStatus: { label: string; color: 'red' } = { label: 'UNKNOWN', color: 'red' };

const IssueStatusBadge = ({ status }: { status: Status }) => {
  if (!statusMap[status]) {
    console.error(`Invalid status: ${status}`);
  }

  const statusInfo = statusMap[status] || defaultStatus;

  return (
    <Badge color={statusInfo.color}>
      {statusInfo.label}
    </Badge>
  );
};

export default IssueStatusBadge;
