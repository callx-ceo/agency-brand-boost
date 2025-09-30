import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Phone, TrendingUp, Clock, CheckCircle2, Calendar, Wallet, Edit, MoreVertical, ChevronDown, Info, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AgentBillingView = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  // Mock agent billing data
  const balance = {
    currentCharges: 17941.03,
    paymentThreshold: 25000.00
  };

  const nextPayment = {
    date: "Oct 1",
    condition: "or when your balance reaches $25,000.00",
    paymentMethod: "Amex •••• 3003"
  };

  const lastPayment = {
    date: "Sep 30",
    amount: 18046.12,
    type: "Manual payment",
    paymentMethod: "Amex •••• 3003"
  };

  const currentMonth = {
    name: "September",
    netCost: 87941.03,
    payments: 78723.01
  };

  const monthlyHistory = [
    { month: "August", netCost: 83723.01, payments: 100715.98 },
    { month: "July", netCost: 73180.10, payments: 51609.88 },
    { month: "June", netCost: 79145.76, payments: 78216.95 },
    { month: "May", netCost: 78216.95, payments: 93210.65 },
    { month: "April", netCost: 93210.65, payments: 99437.41 },
    { month: "March", netCost: 124437.41, payments: 116397.01 },
    { month: "February", netCost: 91397.01, payments: 92172.56 },
    { month: "January", netCost: 68542.30, payments: 71205.15 },
  ];

  const callCharges = {
    totalCalls: 156,
    totalPaidCalls: 124,
    avgCallDuration: 4.2,
    costPerRawCall: 5.59,
    costPerPaidCall: 7.03
  };

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const handleUpdatePayment = () => {
    toast.success("Payment method updated successfully");
    setShowPaymentModal(false);
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* NEW BILLING VIEW - If you see this, the component loaded correctly */}
      <div className="p-4 bg-green-100 border border-green-400 rounded text-green-800 font-semibold">
        ✓ New Billing Dashboard Loaded Successfully
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current charges</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Download statement</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">${balance.currentCharges.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <Button variant="link" className="p-0 h-auto text-primary">
              See how this is calculated
            </Button>
            <Button className="w-full">
              Make an optional payment
            </Button>
          </CardContent>
        </Card>

        {/* Next Automatic Payment Card */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next automatic payment</CardTitle>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit schedule</DropdownMenuItem>
                <DropdownMenuItem>Pause automatic payments</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-4xl font-bold mb-1">{nextPayment.date}</div>
              <div className="text-sm text-muted-foreground">{nextPayment.condition}</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>{nextPayment.paymentMethod}</span>
            </div>
            <Button variant="link" className="p-0 h-auto text-primary">
              Edit payment threshold
            </Button>
          </CardContent>
        </Card>

        {/* Last Payment Card */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last payment</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View receipt</DropdownMenuItem>
                <DropdownMenuItem>Download invoice</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-4xl font-bold">{lastPayment.date}</div>
              <div className="text-lg font-semibold mt-1">${lastPayment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-muted-foreground">{lastPayment.type}</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>{lastPayment.paymentMethod}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Charges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call Charges
          </CardTitle>
          <CardDescription>Current billing period statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Calls</div>
              <div className="text-2xl font-bold">{callCharges.totalCalls}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Paid Calls</div>
              <div className="text-2xl font-bold">{callCharges.totalPaidCalls}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Average Duration</div>
              <div className="text-2xl font-bold">{callCharges.avgCallDuration}<span className="text-sm font-normal text-muted-foreground ml-1">min</span></div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Cost Per Raw Call</div>
              <div className="text-2xl font-bold">${callCharges.costPerRawCall.toFixed(2)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Cost Per Paid Call</div>
              <div className="text-2xl font-bold">${callCharges.costPerPaidCall.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Month Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">{currentMonth.name} (current month)</div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  Net cost
                  <Info className="h-3 w-3" />
                </div>
                <div className="text-xl font-bold">${currentMonth.netCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Payments</div>
                <div className="text-xl font-bold">${currentMonth.payments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Year Selector and View Documents */}
      <div className="flex items-center justify-between">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          View documents
        </Button>
      </div>

      {/* Monthly History Ledger */}
      <Card>
        <CardContent className="p-0">
          {monthlyHistory.map((month, index) => (
            <Collapsible
              key={month.month}
              open={expandedMonths.includes(month.month)}
              onOpenChange={() => toggleMonth(month.month)}
            >
              <div className={index !== 0 ? "border-t" : ""}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors">
                    <div className="text-lg font-medium">{month.month}</div>
                    <div className="flex items-center gap-16">
                      <div className="text-right min-w-[140px]">
                        <div className="text-xs text-muted-foreground mb-1">Net cost</div>
                        <div className="text-lg font-semibold">${month.netCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </div>
                      <div className="text-right min-w-[140px]">
                        <div className="text-xs text-muted-foreground mb-1">Payments</div>
                        <div className="text-lg font-semibold">${month.payments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expandedMonths.includes(month.month) ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 pt-2 border-t bg-muted/30">
                    <div className="grid grid-cols-2 gap-6 py-4">
                      <div>
                        <h4 className="font-semibold mb-3">Cost Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Call charges</span>
                            <span className="font-medium">$45,230.50</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">AI tool usage</span>
                            <span className="font-medium">$8,450.25</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Telephony</span>
                            <span className="font-medium">$3,215.80</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Payment Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total payments</span>
                            <span className="font-medium">${month.payments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment method</span>
                            <span className="font-medium">Amex •••• 3003</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      {/* Payment Method Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>
              Update your credit or debit card information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePayment}>
              Save Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentBillingView;
