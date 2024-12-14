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
import InventoryTab from "../Tabs/InventoryTab";
import RequestsTab from "../Tabs/RequestsTab";
import BorrowedBooksTab from "../Tabs/BorrowedBooksTab";
import HistoryTab from "../Tabs/HistoryTab";

function StudentLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState("collections");

  return (
    <div className="min-h-screen bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white/70 backdrop-blur-sm px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-header">Student Dashboard</h1>
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
          <TabsList className="w-full grid grid-cols-4 bg-white/60 backdrop-blur-sm shadow-md rounded-lg">
            <TabsTrigger
              value="collections"
              className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
            >
              Collections
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
            >
              Your Requests
            </TabsTrigger>
            <TabsTrigger
              value="borrowed"
              className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
            >
              Borrowed Books
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* Collections Tab */}
          <TabsContent value="collections">
            <Card className="overflow-x-auto shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-header">Collections</CardTitle>
                <CardDescription className="text-text-primary">
                  View the library's collections.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InventoryTab />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <Card className="overflow-x-auto shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-header">Your Requests</CardTitle>
                <CardDescription className="text-text-primary">
                  Manage and track your requests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RequestsTab />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Borrowed Books Tab */}
          <TabsContent value="borrowed">
            <Card className="overflow-x-auto shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-header">Borrowed Books</CardTitle>
                <CardDescription className="text-text-primary">
                  View the books you’ve borrowed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <BorrowedBooksTab />
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="overflow-x-auto shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-header">History</CardTitle>
                <CardDescription className="text-text-primary">
                  Review your activity history.
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

export default StudentLayout;
