"use client";

import IPInfoDisplay from "@/components/tsfetcher";
import { motion } from "framer-motion";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">IP Information Tracker</h1>
          <p className="text-xl text-gray-400">
            Discover detailed information about any IP address
          </p>
        </motion.header>

        <main className="mb-16">
          <IPInfoDisplay />
        </main>

        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <FooterLink
            href="https://www.linkedin.com/in/monu-agrhari-255889323/"
            icon="/file.svg"
            text="Linkedin →"
          />
          <FooterLink
            href="https://realtime-location-tracker-qmq4.onrender.com/"
            icon="/window.svg"
            text="Projects →"
          />
          <FooterLink
            href="https://github.com/fsagrahari23"
            icon="/globe.svg"
            text="Github →"
          />
        </motion.footer>
      </motion.div>
    </div>
  );
}

function FooterLink({ href, icon, text }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={icon || "/placeholder.svg"} alt="" width={16} height={16} />
      <span className="hover:underline hover:underline-offset-4">{text}</span>
    </motion.a>
  );
}
