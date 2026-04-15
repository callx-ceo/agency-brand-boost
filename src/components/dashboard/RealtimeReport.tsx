
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LiveCallModal from "./LiveCallModal";

interface RealtimeCall {
  id: string;
  dateTime: string;
  ageSelectedOfferName: string;
  offerName: string;
  ivrPrompts: string;
  ivrType: string;
  ivrStatus: string;
  keyPress: string;
  ivrFilter: string;
  overflowVpFilter: string;
  city: string;
  buyers: string;
  noHostCity: string;
  startedLogged: string;
  verifiedZipCode: string;
  crossed: string;
  repeatCallers: string;
  ivrSeconds: string;
  connectDuration: string;
  ivrConnectDuration: string;
  totalDuration: string;
  result: string;
  agentStatus: string;
  agentDisposition: string;
  ivrPogZipSub: string;
  message: string;
  cost: string;
  profit: string;
  billRate: string;
  callRecordId: string;
  callerId: string;
  promoNumber: string;
  callType: string;
  publisherName: string;
  campaignName: string;
  type: string;
  forwarded: string;
  status: string;
  isPaid: boolean;
  isLive: boolean;
}

const mockRealtimeData: RealtimeCall[] = [
  { id: "rt-001", dateTime: "4/14/26 18:58", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "TOTAL BEAUTY", buyers: "1.8", noHostCity: "TOTAL BEAUTY", startedLogged: "12.6", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "56.00", connectDuration: "00:00", ivrConnectDuration: "00:03", totalDuration: "00:03", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "EE21581B-D2EF-4C42-BB8B-104DEF5001F3", callerId: "314-599-0733", promoNumber: "833-824-4807", callType: "Inbound", publisherName: "Upforce Media", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-002", dateTime: "4/14/26 18:43", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "FLORENCE", buyers: "12.5", noHostCity: "SWIFTLIN", startedLogged: "M/3", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "02:28", connectDuration: "01:05", ivrConnectDuration: "02:28", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "D58D2AE1-4DF6-416B-9462-45BC05B0AD39", callerId: "719-960-6351", promoNumber: "877-843-0572", callType: "Inbound", publisherName: "Facebook", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-003", dateTime: "4/14/26 18:41", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "14", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "Cincinnati", buyers: "", noHostCity: "Cincinnati", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:05", connectDuration: "01:05", ivrConnectDuration: "00:52", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "9F17BDC2-F59C-47AF-B5E9-7E9593BD6FA8", callerId: "513-687-0373", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Active", isPaid: false, isLive: true },
  { id: "rt-004", dateTime: "4/14/26 18:22", ageSelectedOfferName: "1361 Home Insurance_225", offerName: "1361 Home Insurance_225", ivrPrompts: "54", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "TRIALNOAK", buyers: "14", noHostCity: "TEGASARM", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:05", connectDuration: "01:05", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "80523014-E05D-42AF-A0A5-3E1147650103", callerId: "870-227-3662", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-005", dateTime: "4/14/26 18:22", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "23", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "FLORENCE", buyers: "", noHostCity: "CHARLO7FB", startedLogged: "N/3", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "D1CA0E73-045F-4350-B68B-56D9CAF49FB6", callerId: "870-227-3662", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Active", isPaid: false, isLive: true },
  { id: "rt-006", dateTime: "4/14/26 18:19", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "33", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "LAURELV1E", buyers: "83.0", noHostCity: "MIN-130736", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "2438BCE7-1D2D-4C8E-A738-64E8691717OD", callerId: "518-588-8433", promoNumber: "877-385-4666", callType: "Inbound", publisherName: "Refer Blue Limited", campaignName: "Credit Repair Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-007", dateTime: "4/14/26 18:09", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "N/A", ivrType: "N/A", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "N/A", buyers: "N/A", noHostCity: "N/A", startedLogged: "N/A", verifiedZipCode: "N/A", crossed: "N/A", repeatCallers: "No", ivrSeconds: "00:00", connectDuration: "00:00", ivrConnectDuration: "00:00", totalDuration: "00:00", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "BE7DF7E9-B84F-481F-B983-852A12FCE1CC", callerId: "919-437-9939", promoNumber: "844-774-4293", callType: "Inbound", publisherName: "Insurex Insurance (Google 1)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-008", dateTime: "4/14/26 17:26", ageSelectedOfferName: "Aetna - Dualfit", offerName: "Society - Search", ivrPrompts: "N/A", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "Haverboard", buyers: "83.1", noHostCity: "Haverboard", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "13:42", connectDuration: "", ivrConnectDuration: "12:07", totalDuration: "", result: "N/A", agentStatus: "N/A", agentDisposition: "Earth Program", ivrPogZipSub: "Custom Service", message: "", cost: "$0.13", profit: "$0.00", billRate: "$0.01", callRecordId: "628ECEFB-672D-4F98-B720-42B68B094E0F", callerId: "302-452-0300", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-009", dateTime: "4/14/26 17:18", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/5", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "Haverboard", buyers: "83.1", noHostCity: "Haverboard", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "10:00", connectDuration: "", ivrConnectDuration: "08:01", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "02BC0062-6B1E-47B4-4C29-8A1B99155832", callerId: "415-360-7203", promoNumber: "877-843-0572", callType: "Inbound", publisherName: "Facebook", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-010", dateTime: "4/14/26 17:10", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/3", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "Discovery", buyers: "14", noHostCity: "Discovery", startedLogged: "10009", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "Yes", ivrSeconds: "00:00", connectDuration: "00:00", ivrConnectDuration: "01:25", totalDuration: "", result: "N/A", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "A986B06A-6186-43FC-B82A-3DA863EA19B0", callerId: "678-201-3169", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Active", isPaid: true, isLive: true },
  { id: "rt-011", dateTime: "4/14/26 17:09", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "Discovery", buyers: "14", noHostCity: "Discovery", startedLogged: "10225", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "00:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "FA6D00D5-CA29-414F-950E-BF69CF2F9D94", callerId: "678-201-3169", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-012", dateTime: "4/14/26 17:08", ageSelectedOfferName: "1361 Home Insurance_225", offerName: "1361 Home Insurance_225", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "PARSONSILLE", buyers: "54.1", noHostCity: "PARSONSILLE", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "01:03", ivrConnectDuration: "17:83", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "A6A6283A-13DB-4CBA-9ED8-C10C94FF4A62", callerId: "818-848-5578", promoNumber: "888-718-9483", callType: "Inbound", publisherName: "Zhan Feng", campaignName: "Auto Bundle - Private 2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-013", dateTime: "4/14/26 16:55", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/3", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "N/A", buyers: "8.4", noHostCity: "Navato", startedLogged: "64444", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "Yes", ivrSeconds: "08:15", connectDuration: "01:25", ivrConnectDuration: "", totalDuration: "View", result: "online delivery", agentStatus: "Custom Service", agentDisposition: "N/A", ivrPogZipSub: "", message: "$1.47", cost: "$2.17", profit: "$1.41", billRate: "$0.01", callRecordId: "D54D24DC-8E3B-4983-ABF5-87AD00C2AEF", callerId: "678-201-3169", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-014", dateTime: "4/14/26 16:44", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "800-1648", buyers: "7.6", noHostCity: "800-1648", startedLogged: "7.6", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "00:00", connectDuration: "25:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "80D7ED3D-4A81-43D3-96AF-106AD5495D22", callerId: "314-359-4102", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-015", dateTime: "4/14/26 16:42", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "N/A", buyers: "N/A", noHostCity: "N/A", startedLogged: "N/A", verifiedZipCode: "N/A", crossed: "N/A", repeatCallers: "No", ivrSeconds: "00:00", connectDuration: "00:00", ivrConnectDuration: "00:00", totalDuration: "00:00", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "06CA46D9-6F4D-4DFC-A4AC-B0D6985418S4", callerId: "314-359-4102", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-016", dateTime: "4/14/26 16:40", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/5", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "ASTOR18", buyers: "", noHostCity: "ASTOR18.6", startedLogged: "1011860.8", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "Yes", ivrSeconds: "16:43", connectDuration: "", ivrConnectDuration: "", totalDuration: "N/A", result: "View", agentStatus: "N/A", agentDisposition: "Custom Service", ivrPogZipSub: "", message: "$1.47", cost: "$2.17", profit: "$1.41", billRate: "$0.01", callRecordId: "C725FF42-66BF-4FF3-848D-2CFD268FC53F", callerId: "314-359-4102", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-017", dateTime: "4/14/26 16:40", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "Phoenicita", buyers: "12.5", noHostCity: "Maracou", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "00:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "C9D210F2-A9F8-4687-A143-F0601f195C12", callerId: "337-247-8022", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-018", dateTime: "4/14/26 16:38", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/3", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "N/A", buyers: "N/A", noHostCity: "N/A", startedLogged: "N/A", verifiedZipCode: "N/A", crossed: "N/A", repeatCallers: "No", ivrSeconds: "10:52", connectDuration: "01:52", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "F4A823B1-92C7-4EDE-A156-CF89BD12E4A7", callerId: "469-812-3344", promoNumber: "877-843-0572", callType: "Inbound", publisherName: "Facebook", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-019", dateTime: "4/14/26 16:35", ageSelectedOfferName: "Aetna - Dualfit", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/4", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "Cincinnati", buyers: "28.1", noHostCity: "Cincinnati", startedLogged: "28.225", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "10:00", connectDuration: "", ivrConnectDuration: "01:52", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "7B3E09A1-D42C-4A88-B512-9E77F3CA81D2", callerId: "513-400-8821", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-020", dateTime: "4/14/26 16:33", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/4", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "N/A", city: "Cincinnati", buyers: "28.1", noHostCity: "Cincinnati", startedLogged: "28.225", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "A9C5F221-33E4-47D1-8BCA-62F0D91E73A8", callerId: "513-400-8821", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-021", dateTime: "4/14/26 16:30", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "N/A", buyers: "N/A", noHostCity: "Cincinnati", startedLogged: "1.8", verifiedZipCode: "N/A", crossed: "N/A", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.13", profit: "$0.00", billRate: "$0.01", callRecordId: "E2B1A476-7D42-4C89-9F81-3A5E08C2D11B", callerId: "614-229-5501", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-022", dateTime: "4/14/26 16:28", ageSelectedOfferName: "Aetna - Dualfit Search", offerName: "Aetna - Dualfit Search", ivrPrompts: "F/4", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Common Service", overflowVpFilter: "EXCAUSAGE", city: "17.1", buyers: "Cincinnati", noHostCity: "", startedLogged: "86.229", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "C3D9F842-A5E1-4712-B3C8-19E7D4FA6B25", callerId: "937-555-1234", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-023", dateTime: "4/14/26 16:25", ageSelectedOfferName: "Aetna - Dualfit", offerName: "Society - Search", ivrPrompts: "N/A", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "6437PARK1106", buyers: "54.1", noHostCity: "NoSITUASSETED", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "10:50", ivrConnectDuration: "", totalDuration: "", result: "N/A", agentStatus: "Wilderness Roadstead", agentDisposition: "Voyaged Misled", ivrPogZipSub: "", message: "$0.47", cost: "$0.01", profit: "$2.10", billRate: "$0.01", callRecordId: "8A14F259-C21E-42B8-9D54-E78F6BA31C09", callerId: "717-332-8890", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-024", dateTime: "4/14/26 16:22", ageSelectedOfferName: "Aetna - Dualfit", offerName: "Ataxic - Search", ivrPrompts: "55", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "6437EXCAMS", buyers: "1.7", noHostCity: "6ASTOR1496", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "Yes", ivrSeconds: "01:48", connectDuration: "10:50", ivrConnectDuration: "", totalDuration: "", result: "N/A", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "FE5C8714-A3B2-4E67-9168-B42DC87F5A93", callerId: "614-888-2345", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-025", dateTime: "4/14/26 16:20", ageSelectedOfferName: "Aetna - Dualfit", offerName: "Society - Search", ivrPrompts: "N/A", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "6437EXCAMS", buyers: "7.3", noHostCity: "6ASTOR1496", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "10:50", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "1BA72E63-D894-4F15-A7C0-56389E1C4DB7", callerId: "614-888-7766", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-026", dateTime: "4/14/26 16:18", ageSelectedOfferName: "Aetna - Dualfit", offerName: "Society - Search", ivrPrompts: "N/A", ivrType: "Sprint1", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "6437EXCAMS", buyers: "7.3", noHostCity: "6ASTOR1496", startedLogged: "", verifiedZipCode: "N/A", crossed: "N/A", repeatCallers: "No", ivrSeconds: "00:09", connectDuration: "00:00", ivrConnectDuration: "00:09", totalDuration: "00:09", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "4DC9E7F2-8A13-4B56-C2D4-7E9F0A3B6518", callerId: "937-442-0099", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-027", dateTime: "4/14/26 16:15", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "24", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "ASHBURY", buyers: "", noHostCity: "ASHBURY", startedLogged: "N/A", verifiedZipCode: "N/A", crossed: "N/A", repeatCallers: "No", ivrSeconds: "00:00", connectDuration: "00:00", ivrConnectDuration: "00:00", totalDuration: "00:00", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "9E2D4F71-B6C8-4A23-D915-C3F7E8A14B62", callerId: "216-555-4432", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-028", dateTime: "4/14/26 16:12", ageSelectedOfferName: "N/A", offerName: "N/A", ivrPrompts: "14", ivrType: "Static", ivrStatus: "N/A", keyPress: "N/A", ivrFilter: "N/A", overflowVpFilter: "N/A", city: "3427PARK511", buyers: "54.1", noHostCity: "6A3UNBRSTE11", startedLogged: "", verifiedZipCode: "N/A", crossed: "1.8", repeatCallers: "No", ivrSeconds: "01:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "Unused", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "B5F3A892-1E47-4C69-8DA2-F16E7B3C5A04", callerId: "937-555-8877", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-029", dateTime: "4/14/26 16:10", ageSelectedOfferName: "Aetna - Dualfit - Total", offerName: "Aetna - Search - Total", ivrPrompts: "225", ivrType: "Static", ivrStatus: "N/A", keyPress: "25", ivrFilter: "Peak Scorer", overflowVpFilter: "N/A", city: "CHANLER", buyers: "V.7", noHostCity: "Homestead", startedLogged: "", verifiedZipCode: "44607", crossed: "N/A", repeatCallers: "Yes", ivrSeconds: "01:00", connectDuration: "01:00", ivrConnectDuration: "", totalDuration: "", result: "N/A", agentStatus: "N/A", agentDisposition: "N/A", ivrPogZipSub: "N/A", message: "", cost: "$0.01", profit: "$0.00", billRate: "$0.01", callRecordId: "C7E84A16-2D93-4F58-B1A7-E4D9F0C26B38", callerId: "330-555-2211", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
];

const ITEMS_PER_PAGE = 20;

// Column definitions for cleaner rendering
const columns = [
  { key: "dateTime", label: "Date/Time", filterable: false, width: "min-w-[120px]" },
  { key: "ageSelectedOfferName", label: "Age Selected Offer Name", filterable: true, filterType: "select", width: "min-w-[180px]" },
  { key: "offerName", label: "Offer Name", filterable: true, filterType: "select", width: "min-w-[160px]" },
  { key: "ivrPrompts", label: "IVR prompts", filterable: true, filterType: "select", width: "min-w-[90px]" },
  { key: "ivrType", label: "IVR Type", filterable: true, filterType: "select", width: "min-w-[90px]" },
  { key: "ivrStatus", label: "IVR Status", filterable: true, filterType: "select", width: "min-w-[90px]" },
  { key: "keyPress", label: "Key Press", filterable: true, filterType: "select", width: "min-w-[80px]" },
  { key: "ivrFilter", label: "IVR Filter", filterable: true, filterType: "select", width: "min-w-[120px]" },
  { key: "overflowVpFilter", label: "Overflow/VP Filter", filterable: true, filterType: "select", width: "min-w-[120px]" },
  { key: "city", label: "City", filterable: true, filterType: "select", width: "min-w-[120px]" },
  { key: "buyers", label: "Buyers", filterable: true, filterType: "select", width: "min-w-[70px]" },
  { key: "noHostCity", label: "No Host City", filterable: true, filterType: "select", width: "min-w-[120px]" },
  { key: "startedLogged", label: "Started/Logged", filterable: false, width: "min-w-[100px]" },
  { key: "verifiedZipCode", label: "Verified Zip Code", filterable: false, width: "min-w-[110px]" },
  { key: "crossed", label: "Crossed", filterable: true, filterType: "select", width: "min-w-[70px]" },
  { key: "repeatCallers", label: "Repeat Callers", filterable: true, filterType: "select", width: "min-w-[100px]" },
  { key: "ivrSeconds", label: "IVR Seconds", filterable: false, filterType: "number", width: "min-w-[90px]" },
  { key: "connectDuration", label: "Connect Duration", filterable: false, filterType: "number", width: "min-w-[110px]" },
  { key: "ivrConnectDuration", label: "IVR Connect Duration", filterable: false, filterType: "number", width: "min-w-[130px]" },
  { key: "totalDuration", label: "Total Duration", filterable: false, filterType: "number", width: "min-w-[100px]" },
  { key: "result", label: "Result", filterable: true, filterType: "select", width: "min-w-[100px]" },
  { key: "agentStatus", label: "Agent/Status", filterable: true, filterType: "select", width: "min-w-[140px]" },
  { key: "agentDisposition", label: "Agent Disposition", filterable: true, filterType: "select", width: "min-w-[140px]" },
  { key: "ivrPogZipSub", label: "IVR Pog Zip (Sub)", filterable: true, filterType: "select", width: "min-w-[120px]" },
  { key: "message", label: "Message", filterable: false, filterType: "number", width: "min-w-[80px]" },
  { key: "cost", label: "Cost", filterable: false, filterType: "number", width: "min-w-[70px]" },
  { key: "profit", label: "Profit", filterable: false, filterType: "number", width: "min-w-[70px]" },
  { key: "billRate", label: "Bill/Rate", filterable: false, filterType: "number", width: "min-w-[70px]" },
  { key: "callRecordId", label: "Call Record ID", filterable: false, width: "min-w-[280px]" },
  { key: "callerId", label: "Caller ID", filterable: false, width: "min-w-[110px]" },
  { key: "promoNumber", label: "Promo Number", filterable: false, width: "min-w-[110px]" },
  { key: "callType", label: "Call Type", filterable: true, filterType: "select", width: "min-w-[90px]" },
  { key: "publisherName", label: "Publisher Name", filterable: true, filterType: "select", width: "min-w-[200px]" },
  { key: "campaignName", label: "Campaign Name", filterable: true, filterType: "select", width: "min-w-[200px]" },
  { key: "type", label: "Type", filterable: true, filterType: "select", width: "min-w-[90px]" },
  { key: "forwarded", label: "Forwarded", filterable: true, filterType: "select", width: "min-w-[90px]" },
] as const;

const RealtimeReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallForLive, setSelectedCallForLive] = useState<any>(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const updateFilter = (key: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Get unique values for select filters
  const uniqueValues = useMemo(() => {
    const result: Record<string, string[]> = {};
    columns.forEach(col => {
      if (col.filterable && col.filterType === "select") {
        result[col.key] = [...new Set(mockRealtimeData.map(d => d[col.key as keyof RealtimeCall] as string))].filter(Boolean).sort();
      }
    });
    return result;
  }, []);

  const filteredData = useMemo(() => {
    return mockRealtimeData.filter(call => {
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        const matchesSearch = call.callerId.includes(searchTerm) ||
          call.publisherName.toLowerCase().includes(s) ||
          call.campaignName.toLowerCase().includes(s) ||
          call.callRecordId.toLowerCase().includes(s);
        if (!matchesSearch) return false;
      }
      for (const [key, val] of Object.entries(columnFilters)) {
        if (!val || val === "all") continue;
        if ((call as any)[key] !== val) return false;
      }
      return true;
    });
  }, [searchTerm, columnFilters]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getRowClassName = (call: RealtimeCall) => {
    if (call.isLive) return "bg-green-50 hover:bg-green-100 border-l-4 border-l-green-500";
    if (call.isPaid) return "text-blue-600 hover:bg-muted/50";
    return "hover:bg-muted/50";
  };

  const handleLiveMonitoring = (call: RealtimeCall) => {
    setSelectedCallForLive({
      id: call.id,
      contact: { name: "", phone: call.callerId },
      agent: "",
      duration: "",
      status: call.status,
      aiScore: 0,
      campaign: call.campaignName
    });
    setIsLiveModalOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Realtime List</h2>
          </div>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            EXPORT
          </Button>
        </div>

        {/* Title + Search */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Realtime Calls (Total: {filteredData.length})</h3>
          <div className="relative w-64">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const page = Math.max(1, Math.min(currentPage - 1, totalPages - 2)) + i;
            if (page > totalPages) return null;
            return (
              <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "bg-blue-500 text-white" : ""}>
                {page}
              </Button>
            );
          })}
          {totalPages > 3 && <span className="px-2 text-muted-foreground">...</span>}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</Button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-600 font-medium text-sm">Aa</span>
            <span className="text-muted-foreground">Paid Calls (blue text)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-200 border border-green-500" />
            <span className="text-muted-foreground">Live Calls</span>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-auto max-h-[75vh]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow className="bg-muted/30">
                {columns.map(col => (
                  <TableHead key={col.key} className={`text-xs font-semibold whitespace-nowrap ${col.width} ${col.key === "dateTime" ? "text-blue-600" : ""}`}>
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
              {/* Filter row */}
              <TableRow className="bg-muted/10">
                {columns.map(col => (
                  <TableHead key={`filter-${col.key}`} className="p-1">
                    {col.filterable && col.filterType === "select" ? (
                      <Select value={columnFilters[col.key] || "all"} onValueChange={v => updateFilter(col.key, v)}>
                        <SelectTrigger className="h-6 text-[10px] min-w-[60px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {(uniqueValues[col.key] || []).map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : col.filterable ? (
                      <Input className="h-6 text-[10px]" value={columnFilters[col.key] || ""} onChange={e => updateFilter(col.key, e.target.value)} />
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((call) => (
                <TableRow
                  key={call.id}
                  className={`cursor-pointer text-xs ${getRowClassName(call)}`}
                  onClick={() => call.isLive && handleLiveMonitoring(call)}
                >
                  {columns.map(col => (
                    <TableCell key={col.key} className="text-xs py-2 whitespace-nowrap">
                      {(call as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedCallForLive && (
        <LiveCallModal
          isOpen={isLiveModalOpen}
          onClose={() => { setIsLiveModalOpen(false); setSelectedCallForLive(null); }}
          callData={selectedCallForLive}
        />
      )}
    </>
  );
};

export default RealtimeReport;
