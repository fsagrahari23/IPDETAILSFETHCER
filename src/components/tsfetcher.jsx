"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { MapPin, Globe, Server, Shield, Loader, Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import MapComponent from "./MapConatiner";

export default function IPInfoDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  const handleInputChange = (e) => {
    setIpAddress(e.target.value);
  };

  const handleSearch = async () => {
    if (!ipAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid IP address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.NEXT_PUBLIC_IPIFY_API_KEY}&ipAddress=${ipAddress}`
      ).then((res) => res.json());
      console.log(res);

      if (!res.ip) {
        toast({
          title: "No Data Found",
          description: "No information available for this IP address",
          variant: "destructive",
        });
        setData(null);
      } else {
        setData(res);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch IP details",
        variant: "destructive",
      });
      setData(null);
    }
    setLoading(false);
    setIpAddress("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4"
    >
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 bg-gray-800 p-4 rounded-xl shadow-lg">
        <motion.input
          type="text"
          placeholder="Enter your IP address"
          value={ipAddress}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex items-center gap-2 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Search className="h-5 w-5" /> Search
        </motion.button>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-32">
          <Loader className="animate-spin h-12 w-12 text-blue-500" />
        </div>
      )}

      {!loading && data && (
        <Card className="bg-gray-800 text-gray-100 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Globe className="h-8 w-8 text-blue-400" /> IP Information:{" "}
              {data.ip}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-green-400" /> Location
                </h3>
                <p>Country: {data.location?.country || "N/A"}</p>
                <p>Region: {data.location?.region || "N/A"}</p>
                <p>City: {data.location?.city || "N/A"}</p>
                <p>Postal Code: {data.location?.postalCode || "N/A"}</p>
                <p>Timezone: {data.location?.timezone || "N/A"}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Server className="h-6 w-6 text-purple-400" /> Network
                </h3>
                <p>ISP: {data.isp || "N/A"}</p>
              </motion.div>
            </div>
            <Separator className="my-8" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" /> Proxy Information
              </h3>
              <div className="flex gap-4">
                <Badge>Proxy: {data.proxy?.proxy ? "Yes" : "No"}</Badge>
                <Badge>VPN: {data.proxy?.vpn ? "Yes" : "No"}</Badge>
                <Badge>Tor: {data.proxy?.tor ? "Yes" : "No"}</Badge>
              </div>
            </motion.div>
            <MapComponent lat={data.location?.lat} lng={data.location?.lng} />
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
