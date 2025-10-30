import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  type: "call_score" | "recommended_actions";
  data: CallScoreData | RecommendedActionsData;
}

interface CallScoreData {
  agentName: string;
  callDate: string;
  overallScore: number;
  criteria: Array<{
    name: string;
    score: number;
    feedback: string;
  }>;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

interface RecommendedActionsData {
  agentName: string;
  actions: Array<{
    title: string;
    priority: string;
    category: string;
    description: string;
  }>;
  performanceSummary: string;
}

const generateCallScoreEmail = (data: CallScoreData) => {
  const scoreColor = data.overallScore >= 80 ? "#10b981" : data.overallScore >= 60 ? "#f59e0b" : "#ef4444";
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .score-badge { font-size: 48px; font-weight: bold; margin: 10px 0; color: ${scoreColor}; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .criteria-item { background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #667eea; }
          .criteria-score { float: right; font-weight: bold; color: ${scoreColor}; }
          .section { margin: 25px 0; }
          .section-title { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 8px; }
          .list-item { padding: 8px 0; padding-left: 20px; position: relative; }
          .list-item:before { content: "•"; position: absolute; left: 0; color: #667eea; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Call Performance Score</h1>
            <p>Call Date: ${data.callDate}</p>
            <div class="score-badge">${data.overallScore}/100</div>
          </div>
          
          <div class="content">
            <p>Hi ${data.agentName},</p>
            <p>Here's your detailed performance analysis for your recent call:</p>
            
            <div class="section">
              <div class="section-title">📈 Scoring Breakdown</div>
              ${data.criteria.map(c => `
                <div class="criteria-item">
                  <span class="criteria-score">${c.score}/100</span>
                  <strong>${c.name}</strong>
                  <p style="margin: 8px 0 0 0; color: #6b7280;">${c.feedback}</p>
                </div>
              `).join('')}
            </div>
            
            ${data.strengths.length > 0 ? `
              <div class="section">
                <div class="section-title">✨ Strengths</div>
                ${data.strengths.map(s => `<div class="list-item">${s}</div>`).join('')}
              </div>
            ` : ''}
            
            ${data.improvements.length > 0 ? `
              <div class="section">
                <div class="section-title">💡 Areas for Improvement</div>
                ${data.improvements.map(i => `<div class="list-item">${i}</div>`).join('')}
              </div>
            ` : ''}
            
            ${data.nextSteps.length > 0 ? `
              <div class="section">
                <div class="section-title">🎯 Next Steps</div>
                ${data.nextSteps.map(n => `<div class="list-item">${n}</div>`).join('')}
              </div>
            ` : ''}
            
            <p style="margin-top: 30px;">Keep up the great work! Every call is an opportunity to improve.</p>
          </div>
          
          <div class="footer">
            <p>This is an automated performance report. Keep improving! 🚀</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const generateRecommendedActionsEmail = (data: RecommendedActionsData) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .summary { background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; }
          .action-card { background: #f9fafb; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #10b981; }
          .priority-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; color: white; }
          .category-tag { display: inline-block; background: #e0e7ff; color: #4f46e5; padding: 4px 10px; border-radius: 4px; font-size: 12px; margin-left: 8px; }
          .action-title { font-size: 16px; font-weight: bold; color: #1f2937; margin: 10px 0; }
          .action-description { color: #6b7280; margin-top: 8px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Recommended Actions</h1>
            <p>Your personalized improvement plan</p>
          </div>
          
          <div class="content">
            <p>Hi ${data.agentName},</p>
            <p>Based on your recent performance, here are some personalized recommendations to help you excel:</p>
            
            <div class="summary">
              <strong>📊 Performance Summary:</strong>
              <p style="margin: 8px 0 0 0;">${data.performanceSummary}</p>
            </div>
            
            <h3 style="color: #1f2937; margin-top: 30px;">Recommended Actions:</h3>
            
            ${data.actions.map(action => `
              <div class="action-card">
                <div>
                  <span class="priority-badge" style="background-color: ${getPriorityColor(action.priority)}">
                    ${action.priority.toUpperCase()} PRIORITY
                  </span>
                  <span class="category-tag">${action.category}</span>
                </div>
                <div class="action-title">${action.title}</div>
                <div class="action-description">${action.description}</div>
              </div>
            `).join('')}
            
            <p style="margin-top: 30px; padding: 15px; background: #eff6ff; border-radius: 6px;">
              💡 <strong>Pro Tip:</strong> Focus on high-priority actions first for maximum impact on your performance!
            </p>
          </div>
          
          <div class="footer">
            <p>These recommendations are generated based on your performance data. Keep growing! 🌱</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, data }: EmailRequest = await req.json();

    console.log(`Sending ${type} email to ${to}`);

    let html: string;
    let subject: string;

    if (type === "call_score") {
      html = generateCallScoreEmail(data as CallScoreData);
      subject = `📊 Your Call Score: ${(data as CallScoreData).overallScore}/100`;
    } else if (type === "recommended_actions") {
      html = generateRecommendedActionsEmail(data as RecommendedActionsData);
      subject = "🎯 Your Personalized Action Plan";
    } else {
      throw new Error("Invalid email type");
    }

    const emailResponse = await resend.emails.send({
      from: "Performance Coach <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-agent-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
