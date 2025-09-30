import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, MoreVertical, ChevronDown, Info, FileText } from "lucide-react";
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

const BillingDashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  // Mock agency billing data
  const balance = {
    current: 42850.75,
    threshold: 50000.00
  };

  const nextPayment = {
    date: "Oct 1",
    condition: "or when your balance reaches $50,000.00",
    paymentMethod: "Amex •••• 3003"
  };

  const lastPayment = {
    date: "Sep 30",
    amount: 45280.50,
    type: "Manual payment",
    paymentMethod: "Amex •••• 3003"
  };

  const currentMonth = {
    name: "September",
    netCost: 142580.45,
    payments: 125430.20
  };

  const monthlyHistory = [
    { month: "August", netCost: 138920.30, payments: 155840.75 },
    { month: "July", netCost: 125670.85, payments: 98450.60 },
    { month: "June", netCost: 134280.95, payments: 142650.40 },
    { month: "May", netCost: 118540.20, payments: 110320.80 },
    { month: "April", netCost: 145820.60, payments: 152440.30 },
    { month: "March", netCost: 162350.40, payments: 168720.15 },
    { month: "February", netCost: 135670.90, payments: 142580.65 },
    { month: "January", netCost: 128940.50, payments: 135220.40 },
  ];

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Three Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
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
            <div className="text-4xl font-bold">${balance.current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
                            <span className="text-muted-foreground">Agent costs</span>
                            <span className="font-medium">$85,420.30</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Platform fees</span>
                            <span className="font-medium">$28,650.50</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">AI & telephony</span>
                            <span className="font-medium">$12,840.75</span>
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
    </div>
  );
};

export default BillingDashboard;
