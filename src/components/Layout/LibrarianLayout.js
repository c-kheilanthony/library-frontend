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
import BorrowedBooksTab from "../Tabs/BorrowedBooksTab";
import RequestsTab from "../Tabs/RequestsTab";

function LibrarianLayout({ onLogout, role }) {
  const [activeTab, setActiveTab] = useState("inventory");

  console.log("Role in LibrarianLayout:", role); // Debug log for role

  return (
    <div className="min-h-screen bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b px-28 border-border bg-white/70 backdrop-blur-sm px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-header">Librarian Dashboard</h1>
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
        <Card className="shadow-lg border border-border bg-white/60 backdrop-blur-sm rounded-lg">
          {/* Tabs as part of the card */}
          <CardHeader>
            <CardTitle className="text-header">Manage Library</CardTitle>
            <CardDescription className="text-text-primary">
              Access and manage your library’s inventory, requests, and borrowed
              books.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* Tabs List */}
              <TabsList className="w-full h-full grid grid-cols-3 bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to rounded-lg mb-4">
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="requests"
                  className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
                >
                  Requests
                </TabsTrigger>
                <TabsTrigger
                  value="borrowed"
                  className="data-[state=active]:bg-purple-200 data-[state=active]:text-primary hover:bg-purple-100 text-center py-2 px-4 rounded transition"
                >
                  Borrowed Books
                </TabsTrigger>
              </TabsList>

              {/* Tabs Content */}
              <TabsContent value="inventory">
                <InventoryTab role={role} /> {/* Pass role here */}
              </TabsContent>
              <TabsContent value="requests">
                <RequestsTab role={role} /> {/* Pass role here */}
              </TabsContent>
              <TabsContent value="borrowed">
                <BorrowedBooksTab role={role} /> {/* Pass role here */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default LibrarianLayout;
