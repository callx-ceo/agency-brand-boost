
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { 
  Target, 
  DollarSign, 
  TrendingUp, 
  Save, 
  Edit,
  Calendar,
  BarChart3
} from "lucide-react";

interface GoalsManagementProps {
  onBackToDashboard: () => void;
}

interface MonthlyGoal {
  id: string;
  metric: string;
  month: string;
  year: number;
  target: number;
  current: number;
  unit: string;
}

const GoalsManagement = ({ onBackToDashboard }: GoalsManagementProps) => {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const form = useForm();

  // Mock data for goals
  const [goals, setGoals] = useState<MonthlyGoal[]>([
    {
      id: "1",
      metric: "Platform Revenue",
      month: "December",
      year: 2024,
      target: 3200000,
      current: 2400000,
      unit: "$"
    },
    {
      id: "2",
      metric: "Platform Profit",
      month: "December",
      year: 2024,
      target: 960000,
      current: 720000,
      unit: "$"
    },
    {
      id: "3",
      metric: "Gross Margin",
      month: "December",
      year: 2024,
      target: 30,
      current: 28.5,
      unit: "%"
    },
    {
      id: "4",
      metric: "Call Volume",
      month: "December",
      year: 2024,
      target: 50000,
      current: 38750,
      unit: "calls"
    }
  ]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = [2024, 2025, 2026];

  const metricOptions = [
    "Platform Revenue",
    "Platform Profit", 
    "Gross Margin",
    "Net Profit Margin",
    "Call Volume",
    "Active Agencies",
    "Total Publishers",
    "Customer Acquisition Cost"
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === "$") {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (unit === "%") {
      return `${value}%`;
    } else {
      return `${value.toLocaleString()} ${unit}`;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSaveGoal = (goalData: any) => {
    const newGoal: MonthlyGoal = {
      id: Date.now().toString(),
      metric: goalData.metric,
      month: months[goalData.month - 1],
      year: goalData.year,
      target: parseFloat(goalData.target),
      current: 0,
      unit: goalData.unit
    };
    
    setGoals([...goals, newGoal]);
    form.reset();
  };

  const handleUpdateGoal = (goalId: string, newTarget: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, target: newTarget } : goal
    ));
    setEditingGoal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Goals Management</h1>
          <p className="text-gray-600">Set and track monthly targets for key platform metrics</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Goals</TabsTrigger>
          <TabsTrigger value="new">Set New Goal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Monthly Goals Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {goals.map((goal) => {
                  const progress = getProgressPercentage(goal.current, goal.target);
                  return (
                    <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{goal.metric}</h3>
                          <Badge variant="outline">{goal.month} {goal.year}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Target: {formatValue(goal.target, goal.unit)}</span>
                          <span>Current: {formatValue(goal.current, goal.unit)}</span>
                          <span className={getProgressColor(progress)}>
                            {progress}% achieved
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              progress >= 90 ? 'bg-green-600' : 
                              progress >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {editingGoal === goal.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              defaultValue={goal.target}
                              className="w-24"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const target = parseFloat((e.target as HTMLInputElement).value);
                                  handleUpdateGoal(goal.id, target);
                                }
                              }}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => setEditingGoal(null)}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingGoal(goal.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Set New Monthly Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveGoal)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="metric"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Metric</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select metric" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {metricOptions.map((metric) => (
                                <SelectItem key={metric} value={metric}>
                                  {metric}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="target"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Value</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter target value" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="$">$ (Dollars)</SelectItem>
                              <SelectItem value="%">% (Percentage)</SelectItem>
                              <SelectItem value="calls">Calls</SelectItem>
                              <SelectItem value="agencies">Agencies</SelectItem>
                              <SelectItem value="users">Users</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Month</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {months.map((month, index) => (
                                <SelectItem key={month} value={(index + 1).toString()}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Goal
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalsManagement;
