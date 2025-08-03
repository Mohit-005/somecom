import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useReturns } from '../context/ReturnsContext';
import { useToast } from './ui/use-toast';
import { Order } from '../context/OrderContext';
import { CartItem } from '../context/CartContext';

interface ReturnRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const ReturnRequestModal = ({ isOpen, onClose, order }: ReturnRequestModalProps) => {
  const { addReturn } = useReturns();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: { selected: boolean; quantity: number; reason: string } }>({});
  const [generalReason, setGeneralReason] = useState('');

  const handleItemSelection = (itemId: number, field: 'selected' | 'quantity' | 'reason', value: boolean | number | string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemsToReturn = order.items.filter(item => selectedItems[item.id]?.selected).map(item => ({
      ...item,
      returnQuantity: selectedItems[item.id]?.quantity || 1,
      reason: selectedItems[item.id]?.reason || 'Other'
    }));

    if (itemsToReturn.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to return.",
        variant: "destructive"
      });
      return;
    }

    const refundAmount = itemsToReturn.reduce((sum, item) => sum + (item.price * item.returnQuantity), 0);

    addReturn({
      orderId: order.id,
      items: itemsToReturn,
      reason: generalReason,
      refundAmount
    });

    toast({
      title: "Return request submitted",
      description: "Your return request has been submitted successfully. We'll review it within 24 hours.",
    });

    onClose();
    setSelectedItems({});
    setGeneralReason('');
  };

  const returnReasons = [
    'Defective/Damaged',
    'Wrong size',
    'Wrong color',
    'Not as described',
    'Changed mind',
    'Received wrong item',
    'Quality issues',
    'Other'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Return - Order #{order.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-base font-medium">Select items to return:</Label>
            <div className="space-y-4 mt-3">
              {order.items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={selectedItems[item.id]?.selected || false}
                      onCheckedChange={(checked) => 
                        handleItemSelection(item.id, 'selected', checked as boolean)
                      }
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size} • Price: ${item.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ordered quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {selectedItems[item.id]?.selected && (
                    <div className="mt-4 space-y-3 pl-8">
                      <div>
                        <Label htmlFor={`quantity-${item.id}`}>Return quantity</Label>
                        <Input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={selectedItems[item.id]?.quantity || 1}
                          onChange={(e) => 
                            handleItemSelection(item.id, 'quantity', parseInt(e.target.value) || 1)
                          }
                          className="w-24"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`reason-${item.id}`}>Reason for return</Label>
                        <Select
                          value={selectedItems[item.id]?.reason || ''}
                          onValueChange={(value) => handleItemSelection(item.id, 'reason', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {returnReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="general-reason">Additional details (optional)</Label>
            <Textarea
              id="general-reason"
              placeholder="Provide any additional details about your return request..."
              value={generalReason}
              onChange={(e) => setGeneralReason(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Return Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestModal;