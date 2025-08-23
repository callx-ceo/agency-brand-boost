import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Phone, 
  TrendingUp, 
  Target, 
  Users, 
  Calendar,
  Star,
  Trophy,
  Flame,
  ArrowRight,
  Brain,
  Zap,
  Award,
  Clock,
  DollarSign,
  PhoneCall,
  UserCheck,
  Building2,
  Sparkles,
  MessageSquare,
  ChevronRight
} from "lucide-react";

const ModernAgentDashboard = () => {
  const [todayActions, setTodayActions] = useState([
    { id: 1, title: "Call Sarah Johnson - Hot Lead", priority: "high", completed: false, time: "9:00 AM" },
    { id: 2, title: "Follow up on Quote #1234", priority: "medium", completed: false, time: "10:30 AM" },
    { id: 3, title: "Review AI coaching feedback", priority: "low", completed: true, time: "11:00 AM" },
    { id: 4, title: "Send policy documents to Mike", priority: "medium", completed: false, time: "2:00 PM" },
  ]);

  const [streak, setStreak] = useState(12);
  const [callScore, setCallScore] = useState(87);
  
  const kpis = [
    { 
      title: "Calls Today", 
      value: "24", 
      change: "+12%", 
      icon: <Phone className="w-5 h-5" />,
      color: "text-blue-600"
    },
    { 
      title: "Conversion Rate", 
      value: "23.5%", 
      change: "+3.2%", 
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-600"
    },
    { 
      title: "Revenue Today", 
      value: "$12,450", 
      change: "+18%", 
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-purple-600"
    },
    { 
      title: "Active Quotes", 
      value: "18", 
      change: "+5", 
      icon: <Target className="w-5 h-5" />,
      color: "text-orange-600"
    }
  ];

  const leads = [
    { 
      name: "Sarah Johnson", 
      company: "TechCorp", 
      score: 95, 
      lastContact: "2 hours ago",
      status: "hot",
      premium: "$2,400/mo"
    },
    { 
      name: "Mike Davis", 
      company: "StartupInc", 
      score: 82, 
      lastContact: "1 day ago",
      status: "warm",
      premium: "$1,800/mo"
    },
    { 
      name: "Lisa Chen", 
      company: "Enterprise Co", 
      score: 78, 
      lastContact: "3 days ago",
      status: "warm",
      premium: "$3,200/mo"
    }
  ];

  const carriers = [
    { name: "Anthem", match: 95, reason: "Perfect age/health match" },
    { name: "Aetna", match: 88, reason: "Great network coverage" },
    { name: "Blue Cross", match: 82, reason: "Competitive pricing" }
  ];

  const handleCompleteAction = (id: number) => {
    setTodayActions(actions => 
      actions.map(action => 
        action.id === id ? { ...action, completed: true } : action
      )
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "bg-gradient-success";
    if (score >= 70) return "bg-gradient-primary";
    if (score >= 50) return "bg-gradient-warning";
    return "bg-gradient-to-r from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Good morning, Alex
            </h1>
            <p className="text-lg text-muted-foreground">
              You're on track for an amazing day! 
              <span className="inline-flex items-center ml-2 text-primary">
                <Flame className="w-4 h-4 mr-1" />
                {streak} day streak
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">AI Call Score</div>
              <div className={`text-3xl font-bold ${getScoreColor(callScore)}`}>
                {callScore}
              </div>
            </div>
            <div className={`w-16 h-16 rounded-2xl ${getScoreGradient(callScore)} flex items-center justify-center text-white text-xl font-bold shadow-apple-lg`}>
              {callScore}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <Card 
            key={kpi.title} 
            className={`border-0 shadow-apple-md hover:shadow-apple-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in bg-card/80 backdrop-blur-sm`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-secondary ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                  {kpi.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">{kpi.title}</p>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Action Queue */}
          <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-primary text-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  Today's Action Queue
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                  {todayActions.filter(a => !a.completed).length} remaining
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayActions.map((action) => (
                <div 
                  key={action.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-apple-md ${
                    action.completed 
                      ? 'bg-green-50 border-green-200 opacity-60' 
                      : 'bg-background border-border hover:border-primary/20'
                  }`}
                >
                  <Button
                    size="sm"
                    variant={action.completed ? "secondary" : "default"}
                    onClick={() => handleCompleteAction(action.id)}
                    className={`rounded-full w-8 h-8 p-0 ${!action.completed ? 'bg-gradient-primary border-0' : ''}`}
                    disabled={action.completed}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <p className={`font-medium ${action.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {action.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{action.time}</p>
                  </div>
                  <Badge 
                    variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'default' : 'secondary'}
                    className={`${action.priority === 'high' ? 'bg-red-100 text-red-700' : action.priority === 'medium' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} border-0`}
                  >
                    {action.priority}
                  </Badge>
                  {!action.completed && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Follow-Up Hub */}
          <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-warning text-white">
                  <Users className="w-5 h-5" />
                </div>
                Priority Follow-Ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leads.map((lead, index) => (
                <div 
                  key={lead.name}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-apple-md bg-background"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-secondary text-foreground font-bold">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-foreground">{lead.name}</p>
                      <Badge 
                        variant={lead.status === 'hot' ? 'destructive' : 'secondary'}
                        className={`${lead.status === 'hot' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'} border-0 text-xs`}
                      >
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                    <p className="text-sm text-muted-foreground">{lead.lastContact}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </div>
                    <div className="text-sm text-muted-foreground">{lead.premium}</div>
                  </div>
                  <Button size="sm" className="bg-gradient-primary border-0 rounded-full">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* AI Coaching */}
          <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-primary text-white">
                  <Brain className="w-5 h-5" />
                </div>
                AI Coaching
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-secondary border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Today's Focus</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Try asking more open-ended questions to build rapport. Your closing rate increases 15% when you do.
                </p>
                <Button size="sm" variant="outline" className="rounded-full border-primary/20">
                  View Details
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Call Quality</span>
                  <span className="font-bold text-green-600">Excellent</span>
                </div>
                <Progress value={87} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Objection Handling</span>
                  <span className="font-bold text-blue-600">Good</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Gamification */}
          <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-warning text-white">
                  <Trophy className="w-5 h-5" />
                </div>
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-yellow-50 border border-yellow-200">
                <div className="p-2 rounded-full bg-yellow-500 text-white">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Call Master</p>
                  <p className="text-sm text-muted-foreground">20+ calls today</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 border border-green-200">
                <div className="p-2 rounded-full bg-green-500 text-white">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Conversion King</p>
                  <p className="text-sm text-muted-foreground">25%+ today</p>
                </div>
              </div>

              <div className="text-center p-4 rounded-2xl bg-gradient-secondary">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="font-bold text-lg text-foreground">{streak} Day Streak</p>
                <p className="text-sm text-muted-foreground">Keep it going!</p>
              </div>
            </CardContent>
          </Card>

          {/* Carrier Recommendations */}
          <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-success text-white">
                  <Building2 className="w-5 h-5" />
                </div>
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {carriers.map((carrier, index) => (
                <div 
                  key={carrier.name}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-border hover:border-primary/20 transition-colors bg-background"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center font-bold text-primary">
                    {carrier.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{carrier.name}</p>
                    <p className="text-xs text-muted-foreground">{carrier.reason}</p>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(carrier.match)}`}>
                    {carrier.match}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernAgentDashboard;