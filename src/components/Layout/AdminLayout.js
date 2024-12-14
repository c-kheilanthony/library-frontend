import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import AccountsManagerTab from "../Tabs/AccountsManagerTab";
import HistoryTab from "../Tabs/HistoryTab";

function AdminLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <div className="min-h-screen bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b px-28 border-border bg-white/70 backdrop-blur-sm px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-header">Admin Dashboard</h1>
        <Button
          variant="destructive"
          onClick={onLogout}
          className="hover:bg-button-primary-hover focus:ring-2 focus:ring-button-focus"
        >
          Logout
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto py-6 px-4 flex-grow">
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-6"
        >
          <TabsList className="w-full h-full grid grid-cols-2 bg-white/60 backdrop-blur-sm shadow-md rounded-lg">
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
            >
              Accounts Manager
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
            >
              Log History
            </TabsTrigger>
          </TabsList>

          {/* Accounts Manager Tab */}
          <TabsContent value="accounts">
            <Card className="overflow-x-auto shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-header">Accounts Manager</CardTitle>
                <CardDescription className="text-text-primary">
                  Manage library accounts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AccountsManagerTab />
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="overflow-x-auto shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-header">Log History</CardTitle>
                <CardDescription className="text-text-primary">
                  Review the activity logs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <HistoryTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default AdminLayout;
