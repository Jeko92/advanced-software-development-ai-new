type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

const describeStatus = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'Order received, awaiting shipment.';
    case 'shipped':
      return 'Order is on its way.';
    case 'delivered':
      return 'Order has been delivered.';
    case 'cancelled':
      return 'Order was cancelled.';
  }
};

const logStatusChange = (
  status: OrderStatus,
  _context: { requestId: string },
): void => {
  console.log(describeStatus(status));
};

function main(): void {
  const currentStatus: OrderStatus = 'shipped';
  logStatusChange(currentStatus, { requestId: 'req_123' });
}

main();
