"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ShoppingBag, Users, Package, LogOut } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { LineChart, Line } from 'recharts';

export default function DashboardOverview() {
  const { signOut } = useClerk()
  const router = useRouter()
  const [monthlyStats, setMonthlyStats] = useState({
    currentRevenue: 0,
    revenueGrowth: 0,
    currentCustomers: 0,
    customerGrowth: 0,
    currentOrders: 0,
    orderGrowth: 0,
  });

  const [orderData, setOrderData] = useState<{ month: string; orders: number }[]>([]);

  // Fetch orders data
  const orders = useQuery(api.order.getAllOrders);
  const customers = useQuery(api.user.getAllCustomers);

  useEffect(() => {
    if (orders && customers) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const lastMonth = currentMonth - 1;
      
      // Calculate current and last month's data
      const currentMonthOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate.getMonth() === currentMonth;
      });
      const lastMonthOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate.getMonth() === lastMonth;
      });

      // Calculate revenues with safe division
      const currentRevenue = currentMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const lastRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const revenueGrowth = lastRevenue === 0 
        ? currentRevenue > 0 ? 100 : 0  // If last month was 0, show 100% increase if we have revenue now
        : ((currentRevenue - lastRevenue) / lastRevenue) * 100;

      // Calculate new customers with safe division
      const currentMonthCustomers = customers.filter(customer => {
        const joinDate = new Date(customer.createdAt);
        return joinDate.getMonth() === currentMonth;
      }).length;

      const lastMonthCustomers = customers.filter(customer => {
        const joinDate = new Date(customer.createdAt);
        return joinDate.getMonth() === lastMonth;
      }).length;

      const customerGrowth = lastMonthCustomers === 0
        ? currentMonthCustomers > 0 ? 100 : 0  // If last month was 0, show 100% increase if we have customers now
        : ((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100;

      // Calculate orders growth with safe division
      const orderGrowth = lastMonthOrders.length === 0
        ? currentMonthOrders.length > 0 ? 100 : 0  // If last month was 0, show 100% increase if we have orders now
        : ((currentMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100;

      setMonthlyStats({
        currentRevenue,
        revenueGrowth,
        currentCustomers: currentMonthCustomers,
        customerGrowth,
        currentOrders: currentMonthOrders.length,
        orderGrowth,
      });

      // Prepare chart data
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const chartData = monthNames.map(month => {
        const monthIndex = monthNames.indexOf(month);
        const monthOrders = orders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate.getMonth() === monthIndex;
        }).length;

        return {
          month,
          orders: monthOrders,
        };
      });

      setOrderData(chartData);
    }
  }, [orders, customers]);

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  // Process orders data for the chart
  const processOrderData = () => {
    if (!orders) return [];

    // Create a map to store orders by month
    const monthlyData = new Map();

    orders.forEach(order => {
      const date = new Date(order._creationTime);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!monthlyData.has(monthYear)) {
        monthlyData.set(monthYear, {
          month: monthYear,
          orders: 0,
          revenue: 0
        });
      }
      
      const data = monthlyData.get(monthYear);
      data.orders += 1;
      data.revenue += order.totalAmount;
    });

    // Convert map to array and sort by date
    return Array.from(monthlyData.values())
      .sort((a, b) => {
        const [monthA, yearA] = a.month.split('/');
        const [monthB, yearB] = b.month.split('/');
        return new Date(yearA, monthA - 1).getTime() - new Date(yearB, monthB - 1).getTime();
      });
  };

  const chartData = processOrderData();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Dashboard Overview</CardTitle>
            <CardDescription>Key metrics and statistics</CardDescription>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="flex items-center gap-2 hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${monthlyStats.currentRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {monthlyStats.revenueGrowth > 0 ? '+' : ''}{monthlyStats.revenueGrowth.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{monthlyStats.currentCustomers}
              </div>
              <p className="text-xs text-muted-foreground">
                {monthlyStats.customerGrowth > 0 ? '+' : ''}{monthlyStats.customerGrowth.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{monthlyStats.currentOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                {monthlyStats.orderGrowth > 0 ? '+' : ''}{monthlyStats.orderGrowth.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Orders</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
                  name="Orders"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
